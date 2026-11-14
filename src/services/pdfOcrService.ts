import * as pdfjsLib from 'pdfjs-dist';
import Tesseract from 'tesseract.js';

// Configure pdfjs worker to standard CDN matching version
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;

export interface ExtractedDocumentResult {
  text: string;
  pageCount: number;
  method: 'digital_text' | 'ocr_image';
}

/**
 * Extracts raw selectable text directly from digital PDF pages using pdfjs-dist
 */
async function extractTextFromDigitalPdf(arrayBuffer: ArrayBuffer): Promise<{ text: string; pageCount: number }> {
  const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
  const pdf = await loadingTask.promise;
  let fullText = '';

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const pageText = content.items
      .map((item: any) => item.str || '')
      .join(' ');
    fullText += `\n--- Page ${i} ---\n${pageText}`;
  }

  return { text: fullText.trim(), pageCount: pdf.numPages };
}

/**
 * Renders PDF pages to off-screen canvas and runs real Tesseract OCR on them
 * Used when a PDF contains scanned photos or flattened images with no embedded text
 */
async function extractTextFromScannedPdf(
  arrayBuffer: ArrayBuffer,
  onProgress?: (progress: number, status: string) => void
): Promise<string> {
  const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
  const pdf = await loadingTask.promise;
  let ocrText = '';

  // Process first 3 pages max for quick responsiveness in MVP
  const pagesToScan = Math.min(pdf.numPages, 3);

  for (let i = 1; i <= pagesToScan; i++) {
    if (onProgress) {
      onProgress(Math.round(((i - 1) / pagesToScan) * 100), `OCR scanning page ${i} of ${pagesToScan}...`);
    }

    const page = await pdf.getPage(i);
    const viewport = page.getViewport({ scale: 1.5 });
    const canvas = document.createElement('canvas');
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      await page.render({ canvasContext: ctx, viewport } as any).promise;
      const { data } = await Tesseract.recognize(canvas, 'eng');
      ocrText += `\n--- Page ${i} (OCR) ---\n${data.text}`;
    }
  }

  return ocrText.trim();
}

/**
 * Runs OCR directly on an image file (PNG / JPG / WEBP)
 */
export async function extractTextFromImage(
  file: File,
  onProgress?: (progress: number, status: string) => void
): Promise<string> {
  const { data } = await Tesseract.recognize(file, 'eng', {
    logger: (m) => {
      if (m.status === 'recognizing text' && onProgress) {
        onProgress(Math.round((m.progress || 0) * 100), 'Recognizing medical text...');
      }
    }
  });
  return data.text.trim();
}

/**
 * Master function: Intelligently chooses Digital Extraction -> OCR Fallback -> Returns raw text
 */
export async function extractDocumentText(
  file: File,
  onProgress?: (progress: number, status: string) => void
): Promise<ExtractedDocumentResult> {
  // 1. If it's a direct image file, run OCR
  if (file.type.startsWith('image/')) {
    if (onProgress) onProgress(10, 'Running Tesseract OCR on medical image...');
    const text = await extractTextFromImage(file, onProgress);
    return { text, pageCount: 1, method: 'ocr_image' };
  }

  // 2. If it's a PDF
  const arrayBuffer = await file.arrayBuffer();

  try {
    if (onProgress) onProgress(20, 'Reading digital PDF text stream...');
    const digitalResult = await extractTextFromDigitalPdf(arrayBuffer);

    // If PDF contained real digital text (more than 50 characters), return immediately
    if (digitalResult.text.length > 50) {
      if (onProgress) onProgress(100, 'Digital text extracted successfully!');
      return { text: digitalResult.text, pageCount: digitalResult.pageCount, method: 'digital_text' };
    }

    // Otherwise, this PDF is a flat scan/photo. Run OCR on it!
    if (onProgress) onProgress(30, 'Scanned PDF detected. Initializing OCR engine...');
    const ocrText = await extractTextFromScannedPdf(arrayBuffer, onProgress);
    return { text: ocrText, pageCount: digitalResult.pageCount, method: 'ocr_image' };
  } catch (err) {
    console.warn('[PDF Extract] Digital read failed, falling back to OCR:', err);
    const ocrText = await extractTextFromScannedPdf(arrayBuffer, onProgress);
    return { text: ocrText, pageCount: 1, method: 'ocr_image' };
  }
}

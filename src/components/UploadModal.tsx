import React, { useState } from 'react';
import { 
  Upload, 
  X, 
  Sparkles, 
  ShieldCheck
} from 'lucide-react';
import { MedicalReport } from '../types';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReportProcessed: (report: MedicalReport) => void;
}

export const UploadModal: React.FC<UploadModalProps> = ({
  isOpen,
  onClose,
  onReportProcessed
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);

  if (!isOpen) return null;

  const handleUpload = () => {
    setAnalyzing(true);

    setTimeout(() => {
      const generatedReport: MedicalReport = {
        id: `rep-${Date.now()}`,
        title: 'Uploaded blood test report',
        type: 'Lab report',
        date: '10 Nov 2026',
        facility: 'City Medical Center',
        doctor: 'Dr. Sarah Chen',
        summary: 'Metabolic panel results.',
        plainEnglishVerdict: '2 results are in range. Your vitamin D is below this lab’s reference range.',
        isRecent: true,
        fileSize: 'Sample report',
        keyFindings: [
          'Hemoglobin is in healthy range.',
          'Fasting glucose is in healthy range.',
          'Vitamin D is slightly below recommended baseline.'
        ],
        actionPoints: [
          'Consult with your doctor regarding vitamin D support.'
        ],
        questionsForDoctor: [
          'Should I take a daily vitamin D supplement?'
        ],
        testItems: [
          {
            name: 'Hemoglobin',
            result: 13.8,
            unit: 'g/dL',
            reference: '12.0–17.5 g/dL',
            status: 'In range',
            explanation: 'Oxygen transport protein.'
          },
          {
            name: 'Fasting glucose',
            result: 92,
            unit: 'mg/dL',
            reference: '70–99 mg/dL',
            status: 'In range',
            explanation: 'Normal fasting blood sugar.'
          },
          {
            name: 'Vitamin D',
            result: 24,
            unit: 'ng/mL',
            reference: '30–100 ng/mL',
            status: 'Below range',
            explanation: 'Mildly low vitamin D.'
          }
        ]
      };

      onReportProcessed(generatedReport);
      setAnalyzing(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#dce6dd] relative animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          disabled={analyzing}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1.5 rounded-lg hover:bg-gray-100 transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-4">
          <h2 className="text-xl font-bold text-[#1a2c20]">Upload a report</h2>
          <p className="text-xs text-[#5d6f61] mt-0.5">
            Upload your report and get a clear, easy-to-understand explanation.
          </p>
        </div>

        {analyzing ? (
          <div className="py-10 text-center space-y-3">
            <Sparkles className="w-8 h-8 animate-spin mx-auto text-[#2c4a34]" />
            <h3 className="text-sm font-semibold text-[#1a2c20]">
              Analyzing report...
            </h3>
            <p className="text-xs text-[#607464]">
              Translating medical terms into plain language
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div
              onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
              onDragLeave={() => setDragActive(false)}
              onDrop={(e) => { e.preventDefault(); handleUpload(); }}
              onClick={handleUpload}
              className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition ${
                dragActive
                  ? 'border-[#2c4a34] bg-[#edf4ee]'
                  : 'border-[#c6d7c9] hover:border-[#355b3d] bg-[#f8faf8]'
              }`}
            >
              <div className="w-12 h-12 rounded-xl bg-[#e6ede7] text-[#2c4a34] flex items-center justify-center mx-auto mb-3">
                <Upload className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-semibold text-[#1c2e21]">
                Upload your report
              </h4>
              <p className="text-xs text-[#607464] mt-1">
                PDF, JPG or PNG • Up to 20 MB
              </p>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-[#556958] bg-[#f0f5f1] p-3 rounded-xl border border-[#dce6dd]">
              <ShieldCheck className="w-4 h-4 text-[#2c4a34] shrink-0" />
              <span>
                Your medical information is private and securely stored.
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

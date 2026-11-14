# Qwen 3:8B Fine-Tuning & Integration Guide for HEALTHMATE

This guide provides the exact recipe to fine-tune **Qwen 8B** (using Unsloth / Hugging Face LoRA) and hook it directly into HEALTHMATE.

---

## 1. Why Qwen 8B is an Excellent Choice for HEALTHMATE
- **High Medical Comprehension**: Qwen series has state-of-the-art multilingual and technical reasoning in the ~8B tier.
- **Fast Local & Self-Hosted Serving**: Runs comfortably on a single consumer GPU (RTX 3090, 4080, or 4090) with 16GB–24GB VRAM using 4-bit (AWQ/GPTQ) or 8-bit quantization.
- **Strict JSON Adherence**: When prompted or tuned with a system schema, it reliably outputs structured test tables and verdicts.

---

## 2. Fine-Tuning Dataset Schema (JSONL)

Prepare 300–1,500 clinical examples formatted like this:

```jsonl
{"messages": [{"role": "system", "content": "You are HEALTH MATE, a medical report simplification engine. Output valid JSON."}, {"role": "user", "content": "HEMOGLOBIN: 13.8 g/dL (Ref 12-17.5). FASTING GLUCOSE: 92 mg/dL (Ref 70-99). VITAMIN D (25-OH): 24 ng/mL (Ref 30-100)."}, {"role": "assistant", "content": "{\"plainEnglishVerdict\": \"2 results are in range. Your vitamin D is below this lab's reference range.\", \"testItems\": [{\"name\": \"Hemoglobin\", \"result\": 13.8, \"unit\": \"g/dL\", \"reference\": \"12.0-17.5 g/dL\", \"status\": \"In range\", \"explanation\": \"Oxygen-carrying protein in red blood cells.\"}, {\"name\": \"Fasting glucose\", \"result\": 92, \"unit\": \"mg/dL\", \"reference\": \"70-99 mg/dL\", \"status\": \"In range\", \"explanation\": \"Blood sugar after fasting.\"}, {\"name\": \"Vitamin D\", \"result\": 24, \"unit\": \"ng/mL\", \"reference\": \"30-100 ng/mL\", \"status\": \"Below range\", \"explanation\": \"Important for bone strength and immunity.\"}], \"questionsForDoctor\": [\"Should I take a daily vitamin D supplement?\", \"When should we re-test?\"]}"}]}
```

---

## 3. Training Script (QLoRA with Unsloth)

Install prerequisites:
```bash
pip install "unsloth[colab-new] @ git+https://github.com/unslothai/unsloth.git"
pip install --no-deps trl peft accelerate bitsandbytes
```

Run training:
```python
from unsloth import FastLanguageModel
from trl import SFTTrainer
from transformers import TrainingArguments
from datasets import load_dataset

# 1. Load Qwen 8B Base
max_seq_length = 2048
model, tokenizer = FastLanguageModel.from_pretrained(
    model_name = "Qwen/Qwen2.5-8B-Instruct", # or future qwen3:8b
    max_seq_length = max_seq_length,
    load_in_4bit = True,
)

# 2. Add LoRA Adapters
model = FastLanguageModel.get_peft_model(
    model,
    r = 16,
    target_modules = ["q_proj", "k_proj", "v_proj", "o_proj", "gate_proj", "up_proj", "down_proj"],
    lora_alpha = 16,
    lora_dropout = 0,
    bias = "none",
)

# 3. Train on your dataset
trainer = SFTTrainer(
    model = model,
    tokenizer = tokenizer,
    train_dataset = load_dataset("json", data_files="healthmate_train.jsonl", split="train"),
    dataset_text_field = "text",
    max_seq_length = max_seq_length,
    args = TrainingArguments(
        per_device_train_batch_size = 2,
        gradient_accumulation_steps = 4,
        warmup_steps = 10,
        max_steps = 250,
        learning_rate = 2e-4,
        fp16 = True,
        logging_steps = 10,
        output_dir = "healthmate-qwen8b-lora",
    ),
)
trainer.train()

# 4. Save merged GGUF or HuggingFace weights
model.save_pretrained_merged("healthmate-qwen8b-final", tokenizer, save_method="merged_16bit")
```

---

## 4. Serving the Model (Two Options)

### Option A: Via Ollama (Easiest Local Setup)
1. Import your fine-tuned model into Ollama:
```dockerfile
FROM ./healthmate-qwen8b-final
PARAMETER temperature 0.2
SYSTEM "You are HEALTH MATE, a compassionate medical AI."
```
2. Run:
```bash
ollama create qwen3:8b -f Modelfile
ollama run qwen3:8b
```
It will automatically expose an OpenAI-compatible endpoint at `http://localhost:11434/v1`.

### Option B: Via vLLM (Production & Cloud GPUs)
Run on a cloud GPU instance (RunPod, Lambda, AWS):
```bash
vllm serve healthmate-qwen8b-final --host 0.0.0.0 --port 8000 --max-model-len 4096
```

---

## 5. Connecting to the HEALTHMATE Web App

In the project root, create a `.env` file (or set environment variables):

```env
VITE_AI_BASE_URL=http://localhost:11434/v1
VITE_AI_MODEL=qwen3:8b
VITE_AI_API_KEY=ollama
```

HEALTHMATE already includes the client bridge at `src/services/qwenAIService.ts` configured for this setup.

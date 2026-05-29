"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "How accurate is TruthGuard AI detection?",
    a: "Our models achieve 95-98% accuracy across fake news, AI images, deepfakes, and AI text detection, validated against industry-standard datasets including FaceForensics++ and LIAR.",
  },
  {
    q: "What AI models power the platform?",
    a: "We use BERT, RoBERTa, DistilBERT for NLP; CNN, Vision Transformer, and EfficientNet for images; XceptionNet and MesoNet for deepfakes; and GPT detectors with perplexity scoring for text.",
  },
  {
    q: "Is my uploaded content secure?",
    a: "Yes. All uploads are encrypted in transit and at rest. Content is processed in isolated environments and automatically deleted after analysis unless you choose to save reports.",
  },
  {
    q: "Can I integrate TruthGuard via API?",
    a: "Absolutely. Our REST API supports all detection modules with webhook notifications, batch processing, and enterprise SLA options.",
  },
  {
    q: "Does it support real-time video analysis?",
    a: "Yes, including live webcam deepfake detection, timeline analysis, frame-by-frame scanning, and audio waveform analysis.",
  },
];

export function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold">
            Frequently Asked <span className="text-gradient">Questions</span>
          </h2>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="glass rounded-xl overflow-hidden">
              <button
                className="w-full flex items-center justify-between p-5 text-left hover:bg-white/5 transition-colors"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="font-medium text-sm pr-4">{faq.q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-muted shrink-0 transition-transform ${open === i ? "rotate-180" : ""}`}
                />
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <p className="px-5 pb-5 text-sm text-muted">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

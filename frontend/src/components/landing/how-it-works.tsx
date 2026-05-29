"use client";

import { motion } from "framer-motion";
import { Upload, Cpu, FileCheck } from "lucide-react";

const steps = [
  {
    icon: Upload,
    step: "01",
    title: "Upload or Paste Content",
    description: "Submit URLs, text, images, videos, or PDFs through our secure analysis pipeline.",
  },
  {
    icon: Cpu,
    step: "02",
    title: "AI Multi-Model Analysis",
    description: "BERT, ViT, XceptionNet, and GPT detectors analyze content across 50+ signal dimensions.",
  },
  {
    icon: FileCheck,
    step: "03",
    title: "Get Detailed Report",
    description: "Receive confidence scores, heatmaps, explanations, and downloadable PDF reports.",
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-24 relative bg-black/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold">
            How <span className="text-gradient">TruthGuard</span> Works
          </h2>
          <p className="mt-4 text-muted">Three steps to digital truth verification</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          <div className="hidden md:block absolute top-16 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-primary/0 via-primary/50 to-primary/0" />
          {steps.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="text-center relative"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent mb-6 relative z-10">
                <step.icon className="w-7 h-7 text-white" />
              </div>
              <span className="text-xs font-mono text-primary">{step.step}</span>
              <h3 className="text-xl font-semibold mt-2 mb-3">{step.title}</h3>
              <p className="text-sm text-muted">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

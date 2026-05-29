"use client";

import { motion } from "framer-motion";
import {
  Newspaper,
  ImageIcon,
  Video,
  FileText,
  Bot,
  Shield,
  Globe,
  Bell,
  Blocks,
  Languages,
} from "lucide-react";
import { Card } from "@/components/ui/card";

const features = [
  {
    icon: Newspaper,
    title: "Fake News Detection",
    description: "BERT & RoBERTa powered NLP analysis for credibility scoring, bias detection, and fact verification.",
    color: "from-blue-500 to-indigo-600",
  },
  {
    icon: ImageIcon,
    title: "AI Image Detection",
    description: "CNN & Vision Transformer models detect GAN artifacts, Photoshop edits, and metadata inconsistencies.",
    color: "from-purple-500 to-pink-600",
  },
  {
    icon: Video,
    title: "Deepfake Video Analysis",
    description: "FaceForensics++ & XceptionNet detect lip-sync issues, face swaps, and temporal inconsistencies.",
    color: "from-cyan-500 to-blue-600",
  },
  {
    icon: FileText,
    title: "AI Text Detection",
    description: "GPT detector with perplexity scoring, burstiness analysis, and sentence-level highlighting.",
    color: "from-emerald-500 to-teal-600",
  },
  {
    icon: Bot,
    title: "AI Assistant",
    description: "Built-in cyber intelligence chatbot for guided analysis and threat explanation.",
    color: "from-violet-500 to-purple-600",
  },
  {
    icon: Shield,
    title: "Real-time Monitoring",
    description: "Live news monitoring, threat alerts, and blockchain verification concepts.",
    color: "from-orange-500 to-red-600",
  },
];

const bonusFeatures = [
  { icon: Globe, label: "Multi-language Support" },
  { icon: Bell, label: "Notification System" },
  { icon: Blocks, label: "API Integration" },
  { icon: Languages, label: "50+ Languages" },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold">
            Enterprise-Grade <span className="text-gradient">Detection Suite</span>
          </h2>
          <p className="mt-4 text-muted max-w-2xl mx-auto">
            Four specialized AI engines working together to protect against misinformation and synthetic media.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="h-full hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 group">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted">{feature.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-4">
          {bonusFeatures.map((f) => (
            <div key={f.label} className="flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-muted">
              <f.icon className="w-4 h-4 text-primary" />
              {f.label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

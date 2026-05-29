"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { Card } from "@/components/ui/card";

const testimonials = [
  {
    name: "Dr. Sarah Chen",
    role: "Cybersecurity Director, TechCorp",
    content: "TruthGuard AI reduced our misinformation response time by 85%. The deepfake detection is remarkably accurate.",
    rating: 5,
  },
  {
    name: "Marcus Williams",
    role: "Head of News Verification, GlobalMedia",
    content: "The fake news NLP analysis with BERT models gives us confidence scores we can trust for editorial decisions.",
    rating: 5,
  },
  {
    name: "Elena Rodriguez",
    role: "CTO, SecureNet Labs",
    content: "Best-in-class UI combined with enterprise-grade detection. Our security team relies on it daily.",
    rating: 5,
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-24 bg-black/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold">
            Trusted by <span className="text-gradient">Industry Leaders</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="h-full">
                <Quote className="w-8 h-8 text-primary/30 mb-4" />
                <p className="text-sm text-muted mb-6">&ldquo;{t.content}&rdquo;</p>
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-warning text-warning" />
                  ))}
                </div>
                <div>
                  <p className="font-semibold text-sm">{t.name}</p>
                  <p className="text-xs text-muted">{t.role}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

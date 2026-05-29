"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Upload, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ParticleBackground, GradientOrb } from "@/components/ui/animations";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden cyber-grid">
      <GradientOrb className="w-[600px] h-[600px] -top-48 -left-48" />
      <GradientOrb className="w-[500px] h-[500px] -bottom-32 -right-32" />
      <ParticleBackground />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-muted mb-8"
        >
          <Sparkles className="w-4 h-4 text-accent" />
          Powered by BERT, ViT & Deep Learning Models
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight max-w-5xl mx-auto leading-tight"
        >
          Detect Fake News, Deepfakes &{" "}
          <span className="text-gradient">AI Manipulation</span> Instantly
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-lg sm:text-xl text-muted max-w-2xl mx-auto"
        >
          Advanced AI-powered verification platform for digital truth detection.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button variant="glow" size="lg" asChild>
            <Link href="/dashboard">
              Try Detection
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
          <Button variant="secondary" size="lg" asChild>
            <Link href="/dashboard/detect/image">
              <Upload className="w-5 h-5" />
              Upload Media
            </Link>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
        >
          {[
            { value: "98.7%", label: "Detection Accuracy" },
            { value: "2.4M+", label: "Scans Processed" },
            { value: "<2s", label: "Avg Response Time" },
            { value: "150+", label: "Countries Protected" },
          ].map((stat) => (
            <div key={stat.label} className="glass rounded-xl p-4 hover:border-primary/30 transition-colors">
              <div className="text-2xl font-bold text-gradient">{stat.value}</div>
              <div className="text-xs text-muted mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

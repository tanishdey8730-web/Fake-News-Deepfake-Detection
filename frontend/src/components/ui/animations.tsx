"use client";

import { motion } from "framer-motion";

const PARTICLES = Array.from({ length: 40 }, (_, i) => ({
  id: i,
  x: ((i * 17 + 7) % 100),
  y: ((i * 23 + 13) % 100),
  size: (i % 4) + 1,
  duration: 10 + (i % 10),
  delay: (i % 5),
}));

export function ParticleBackground() {
  const particles = PARTICLES;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-primary/30"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

export function GradientOrb({ className }: { className?: string }) {
  return (
    <div className={`absolute rounded-full blur-3xl opacity-30 ${className}`}>
      <div className="w-full h-full bg-gradient-to-br from-primary via-accent to-cyan-400 rounded-full animate-pulse-glow" />
    </div>
  );
}

export function ScanAnimation({ active }: { active: boolean }) {
  if (!active) return null;
  return (
    <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
      <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent scan-line" />
      <div className="absolute inset-0 bg-primary/5 animate-pulse" />
    </div>
  );
}

export function TypingIndicator() {
  return (
    <div className="flex gap-1 items-center">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-2 h-2 rounded-full bg-primary"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1, delay: i * 0.2, repeat: Infinity }}
        />
      ))}
    </div>
  );
}

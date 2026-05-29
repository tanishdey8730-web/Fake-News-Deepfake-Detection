"use client";

import { cn } from "@/lib/utils";

interface RiskMeterProps {
  value: number;
  label?: string;
  size?: "sm" | "md" | "lg";
}

export function RiskMeter({ value, label = "Risk Level", size = "md" }: RiskMeterProps) {
  const clamped = Math.min(100, Math.max(0, value));
  const rotation = (clamped / 100) * 180 - 90;
  const color = clamped > 70 ? "text-danger" : clamped > 40 ? "text-warning" : "text-success";

  const sizes = { sm: "w-32 h-16", md: "w-48 h-24", lg: "w-64 h-32" };

  return (
    <div className="flex flex-col items-center">
      <div className={cn("relative overflow-hidden", sizes[size])}>
        <div className="absolute inset-0 rounded-t-full border-[12px] border-white/5 border-b-0" />
        <div
          className="absolute bottom-0 left-1/2 w-1 h-1/2 origin-bottom transition-transform duration-700"
          style={{ transform: `translateX(-50%) rotate(${rotation}deg)` }}
        >
          <div className={cn("w-1 h-full rounded-full bg-gradient-to-t from-primary to-accent mx-auto", color)} />
        </div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-white/20" />
      </div>
      <p className={cn("text-2xl font-bold mt-2", color)}>{clamped}%</p>
      <p className="text-xs text-muted">{label}</p>
    </div>
  );
}

interface ConfidenceMeterProps {
  value: number;
  label: string;
}

export function ConfidenceMeter({ value, label }: ConfidenceMeterProps) {
  const color = value > 70 ? "from-danger to-red-400" : value > 40 ? "from-warning to-orange-400" : "from-success to-emerald-400";

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-muted">{label}</span>
        <span className="font-mono font-semibold">{value}%</span>
      </div>
      <div className="h-3 rounded-full bg-white/5 overflow-hidden">
        <div
          className={cn("h-full rounded-full bg-gradient-to-r transition-all duration-700", color)}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

interface VerdictBadgeProps {
  verdict: string;
  size?: "sm" | "lg";
}

export function VerdictBadge({ verdict, size = "sm" }: VerdictBadgeProps) {
  const isFake = /fake|ai|deepfake|manipulated|suspicious/i.test(verdict);
  const isReal = /real|authentic|human/i.test(verdict);

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full font-semibold",
        size === "lg" ? "px-6 py-2 text-lg" : "px-3 py-1 text-xs",
        isFake ? "bg-danger/20 text-danger border border-danger/30" :
        isReal ? "bg-success/20 text-success border border-success/30" :
        "bg-warning/20 text-warning border border-warning/30"
      )}
    >
      {verdict}
    </span>
  );
}

interface ScanningOverlayProps {
  active: boolean;
  message?: string;
}

export function ScanningOverlay({ active, message = "AI Analysis in Progress..." }: ScanningOverlayProps) {
  if (!active) return null;

  return (
    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm rounded-2xl">
      <div className="relative w-24 h-24 mb-4">
        <div className="absolute inset-0 rounded-full border-2 border-primary/30 animate-ping" />
        <div className="absolute inset-2 rounded-full border-2 border-t-primary border-r-transparent border-b-transparent border-l-transparent animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
        </div>
      </div>
      <p className="text-sm font-medium animate-pulse">{message}</p>
      <p className="text-xs text-muted mt-1">Running multi-model inference...</p>
    </div>
  );
}

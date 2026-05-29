"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2, FileText } from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { DashboardHeader } from "@/components/dashboard/sidebar";
import { ConfidenceMeter, VerdictBadge, ScanningOverlay } from "@/components/detection/shared";
import { mockTextAnalysis } from "@/lib/mock-analysis";
import type { TextAnalysis } from "@/lib/types";
import { generateScanId, cn } from "@/lib/utils";

export default function TextDetectorPage() {
  const [content, setContent] = useState("");
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<TextAnalysis | null>(null);
  const [scanId, setScanId] = useState("");

  const analyze = async () => {
    if (!content.trim()) {
      toast.error("Please paste text content");
      return;
    }
    setScanning(true);
    await new Promise((r) => setTimeout(r, 2000));
    setResult(mockTextAnalysis(content));
    setScanId(generateScanId());
    setScanning(false);
    toast.success("Text analysis complete");
  };

  return (
    <div>
      <DashboardHeader
        title="AI Text Detector"
        subtitle="GPT detection with perplexity scoring and burstiness analysis"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle className="text-base">Paste Text Content</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="Paste text to analyze for AI generation patterns..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[300px] font-mono text-sm"
            />
            <Button variant="glow" onClick={analyze} disabled={scanning} className="w-full">
              {scanning ? <Loader2 className="w-4 h-4 animate-spin" /> : <FileText className="w-4 h-4" />}
              Detect AI Content
            </Button>
          </CardContent>
        </Card>

        <Card className="relative min-h-[400px]">
          <ScanningOverlay active={scanning} message="Analyzing perplexity & burstiness..." />
          {result ? (
            <CardContent className="pt-6 space-y-6">
              <div className="flex items-center justify-between">
                <VerdictBadge verdict={result.verdict} size="lg" />
                <span className="text-xs text-muted font-mono">{scanId}</span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 rounded-xl bg-danger/10 border border-danger/20">
                  <p className="text-3xl font-bold text-danger">{result.aiScore}%</p>
                  <p className="text-xs text-muted mt-1">AI Score</p>
                </div>
                <div className="text-center p-4 rounded-xl bg-success/10 border border-success/20">
                  <p className="text-3xl font-bold text-success">{result.humanScore}%</p>
                  <p className="text-xs text-muted mt-1">Human Score</p>
                </div>
              </div>

              <ConfidenceMeter value={result.gptProbability} label="GPT Generation Probability" />

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="p-3 rounded-xl bg-white/5">
                  <p className="text-muted text-xs">Burstiness</p>
                  <p className="font-mono font-semibold">{result.burstiness.toFixed(2)}</p>
                </div>
                <div className="p-3 rounded-xl bg-white/5">
                  <p className="text-muted text-xs">Perplexity</p>
                  <p className="font-mono font-semibold">{result.perplexity.toFixed(1)}</p>
                </div>
              </div>

              <p className="text-sm text-muted">{result.explanation}</p>
            </CardContent>
          ) : (
            <CardContent className="flex items-center justify-center h-full min-h-[400px] text-muted text-sm">
              Paste text to begin AI detection analysis
            </CardContent>
          )}
        </Card>
      </div>

      {result && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-6">
          <Card>
            <CardHeader><CardTitle className="text-base">Sentence-Level Analysis</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              {result.sentenceHighlights.map((s, i) => (
                <div
                  key={i}
                  className={cn(
                    "p-3 rounded-xl text-sm border",
                    s.aiProbability > 60 ? "bg-danger/5 border-danger/20" :
                    s.aiProbability > 40 ? "bg-warning/5 border-warning/20" :
                    "bg-success/5 border-success/20"
                  )}
                >
                  <p>{s.text}</p>
                  <p className="text-xs text-muted mt-1">AI probability: {Math.round(s.aiProbability)}%</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar } from "recharts";
import { Search, Link2, FileUp, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DashboardHeader } from "@/components/dashboard/sidebar";
import { RiskMeter, ConfidenceMeter, VerdictBadge, ScanningOverlay } from "@/components/detection/shared";
import { mockFakeNewsAnalysis } from "@/lib/mock-analysis";
import type { FakeNewsAnalysis } from "@/lib/types";
import { generateScanId } from "@/lib/utils";

export default function FakeNewsDetectorPage() {
  const [url, setUrl] = useState("");
  const [content, setContent] = useState("");
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<FakeNewsAnalysis | null>(null);
  const [scanId, setScanId] = useState("");

  const analyze = async () => {
    if (!url && !content) {
      toast.error("Please provide a URL or paste article content");
      return;
    }
    setScanning(true);
    setResult(null);
    await new Promise((r) => setTimeout(r, 2500));
    const analysis = mockFakeNewsAnalysis(content || url);
    setResult(analysis);
    setScanId(generateScanId());
    setScanning(false);
    toast.success("Analysis complete");
  };

  const pieData = result
    ? [
        { name: "Credible", value: result.credibilityScore, color: "#10b981" },
        { name: "Suspicious", value: 100 - result.credibilityScore, color: "#ef4444" },
      ]
    : [];

  const radarData = result
    ? [
        { metric: "Source", value: result.sourceReliability },
        { metric: "Facts", value: result.factConsistency },
        { metric: "Bias", value: 100 - result.biasScore },
        { metric: "Emotion", value: 100 - result.emotionalExaggeration },
        { metric: "Credibility", value: result.credibilityScore },
      ]
    : [];

  return (
    <div>
      <DashboardHeader
        title="Fake News Detector"
        subtitle="BERT & RoBERTa powered NLP analysis for credibility and bias detection"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Input Source</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <Link2 className="absolute left-3 top-3 w-4 h-4 text-muted" />
              <Input
                placeholder="Paste article URL..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="pl-10"
              />
            </div>
            <Textarea
              placeholder="Or paste news article content here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[200px]"
            />
            <div className="flex gap-3">
              <Button variant="glow" onClick={analyze} disabled={scanning} className="flex-1">
                {scanning ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                Analyze Article
              </Button>
              <Button variant="secondary">
                <FileUp className="w-4 h-4" />
                Upload PDF
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="relative min-h-[300px]">
          <ScanningOverlay active={scanning} message="Running BERT NLP Analysis..." />
          {result ? (
            <CardContent className="pt-6 space-y-6">
              <div className="flex items-center justify-between">
                <VerdictBadge verdict={result.verdict} size="lg" />
                <span className="text-xs text-muted font-mono">{scanId}</span>
              </div>
              <RiskMeter value={result.confidence} label="Fake Probability" />
              <ConfidenceMeter value={result.confidence} label="Detection Confidence" />
              <p className="text-sm text-muted">{result.explanation}</p>
            </CardContent>
          ) : (
            <CardContent className="flex items-center justify-center h-full min-h-[300px] text-muted text-sm">
              Submit content to begin NLP analysis
            </CardContent>
          )}
        </Card>
      </div>

      {result && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6"
        >
          <Card>
            <CardHeader><CardTitle className="text-base">Credibility Breakdown</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={55} outerRadius={80} dataKey="value" paddingAngle={4}>
                    {pieData.map((d) => <Cell key={d.name} fill={d.color} />)}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-base">NLP Analysis Radar</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <RadarChart data={radarData}>
                  <PolarGrid stroke="#334155" />
                  <PolarAngleAxis dataKey="metric" tick={{ fill: "#94a3b8", fontSize: 11 }} />
                  <Radar dataKey="value" stroke="#6366f1" fill="#6366f1" fillOpacity={0.3} />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-base">Analysis Metrics</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <ConfidenceMeter value={result.sourceReliability} label="Source Reliability" />
              <ConfidenceMeter value={result.biasScore} label="Bias Score" />
              <ConfidenceMeter value={result.emotionalExaggeration} label="Emotional Exaggeration" />
              <ConfidenceMeter value={result.factConsistency} label="Fact Consistency" />
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader><CardTitle className="text-base">Suspicious Sentences</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {result.suspiciousSentences.map((s, i) => (
                <div key={i} className="p-3 rounded-xl bg-danger/5 border border-danger/20">
                  <p className="text-sm">&ldquo;{s.text}&rdquo;</p>
                  <p className="text-xs text-danger mt-1">{s.reason}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-base">Trusted Sources</CardTitle></CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {result.trustedSources.map((s) => (
                  <li key={s} className="text-sm text-primary flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    {s}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}

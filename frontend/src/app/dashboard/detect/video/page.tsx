"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Upload, Link2, Loader2, Play, Download } from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DashboardHeader } from "@/components/dashboard/sidebar";
import { ConfidenceMeter, VerdictBadge, ScanningOverlay } from "@/components/detection/shared";
import { mockVideoAnalysis } from "@/lib/mock-analysis";
import type { VideoAnalysis } from "@/lib/types";
import { generateScanId } from "@/lib/utils";

const waveformData = Array.from({ length: 50 }, (_, i) => ({
  t: i,
  amp: Math.sin(i * 0.3) * 30 + Math.random() * 20 + 30,
}));

export default function VideoDetectorPage() {
  const [url, setUrl] = useState("");
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<VideoAnalysis | null>(null);
  const [scanId, setScanId] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setVideoSrc(URL.createObjectURL(file));
      setResult(null);
    }
  };

  const analyze = async () => {
    if (!videoSrc && !url) {
      toast.error("Upload a video or provide a URL");
      return;
    }
    setScanning(true);
    await new Promise((r) => setTimeout(r, 4000));
    setResult(mockVideoAnalysis());
    setScanId(generateScanId());
    setScanning(false);
    toast.success("Deepfake analysis complete");
  };

  const timelineData = result?.suspiciousFrames.map((f) => ({
    time: `${f.timestamp}s`,
    confidence: f.confidence * 100,
  })) || [];

  return (
    <div>
      <DashboardHeader
        title="Deepfake Video Detector"
        subtitle="FaceForensics++ & XceptionNet temporal analysis"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle className="text-base">Video Input</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="relative rounded-2xl overflow-hidden bg-black/40 aspect-video">
              {videoSrc ? (
                <video src={videoSrc} controls className="w-full h-full object-contain" />
              ) : (
                <div className="flex items-center justify-center h-full min-h-[200px] text-muted text-sm">
                  No video loaded
                </div>
              )}
              {scanning && <ScanningOverlay active message="Frame-by-frame deepfake scan..." />}
            </div>

            <div className="flex gap-3">
              <input ref={fileRef} type="file" accept="video/*" className="hidden" onChange={handleFile} />
              <Button variant="secondary" onClick={() => fileRef.current?.click()} className="flex-1">
                <Upload className="w-4 h-4" /> Upload Video
              </Button>
              <Button variant="glow" onClick={analyze} disabled={scanning} className="flex-1">
                {scanning ? <Loader2 className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
                Analyze
              </Button>
            </div>

            <div className="relative">
              <Link2 className="absolute left-3 top-3 w-4 h-4 text-muted" />
              <Input placeholder="Or paste video URL..." value={url} onChange={(e) => setUrl(e.target.value)} className="pl-10" />
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          {result ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <Card>
                <CardContent className="pt-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <VerdictBadge verdict={result.verdict} size="lg" />
                    <span className="text-xs text-muted font-mono">{scanId}</span>
                  </div>
                  <ConfidenceMeter value={result.deepfakeProbability} label="Deepfake Probability" />
                  <p className="text-sm text-muted">{result.explanation}</p>
                  <Button variant="secondary" size="sm">
                    <Download className="w-4 h-4" /> Export Report
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle className="text-base">Detection Signals</CardTitle></CardHeader>
                <CardContent className="grid grid-cols-2 gap-3">
                  {[
                    { label: "Face Swap", val: result.faceSwapDetected },
                    { label: "AI Voice", val: result.aiVoiceDetected },
                    { label: "Lip-sync Issues", val: result.lipSyncIssues > 0 },
                    { label: "Blink Anomalies", val: result.eyeBlinkAnomalies > 0 },
                  ].map((s) => (
                    <div key={s.label} className={`p-3 rounded-xl text-sm ${s.val ? "bg-danger/10 border border-danger/20" : "bg-success/10"}`}>
                      <p>{s.label}</p>
                      <p className={`text-xs mt-1 ${s.val ? "text-danger" : "text-success"}`}>{s.val ? "Detected" : "Normal"}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle className="text-base">Suspicious Frames Timeline</CardTitle></CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    {result.suspiciousFrames.map((f, i) => (
                      <div key={i} className="flex items-center gap-3 p-2 rounded-lg bg-white/5">
                        <span className="text-xs font-mono text-primary w-12">{f.timestamp}s</span>
                        <div className="flex-1 h-1.5 rounded-full bg-white/5">
                          <div className="h-full rounded-full bg-danger" style={{ width: `${f.confidence * 100}%` }} />
                        </div>
                        <span className="text-xs text-muted">{f.reason}</span>
                      </div>
                    ))}
                  </div>
                  <ResponsiveContainer width="100%" height={120}>
                    <AreaChart data={timelineData}>
                      <XAxis dataKey="time" stroke="#64748b" fontSize={10} />
                      <YAxis stroke="#64748b" fontSize={10} />
                      <Tooltip contentStyle={{ background: "#1e293b", border: "none", borderRadius: 8 }} />
                      <Area type="monotone" dataKey="confidence" stroke="#ef4444" fill="#ef444420" />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle className="text-base">Audio Waveform Analysis</CardTitle></CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={80}>
                    <AreaChart data={waveformData}>
                      <Area type="monotone" dataKey="amp" stroke="#a855f7" fill="#a855f720" strokeWidth={1} />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <Card className="flex items-center justify-center min-h-[400px]">
              <p className="text-muted text-sm">Upload a video to begin deepfake detection</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

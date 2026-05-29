"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { useDropzone } from "react-dropzone";
import { Upload, Loader2, ImageIcon } from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DashboardHeader } from "@/components/dashboard/sidebar";
import { ConfidenceMeter, VerdictBadge, ScanningOverlay } from "@/components/detection/shared";
import { mockImageAnalysis } from "@/lib/mock-analysis";
import type { ImageAnalysis } from "@/lib/types";
import { generateScanId } from "@/lib/utils";

export default function ImageDetectorPage() {
  const [preview, setPreview] = useState<string | null>(null);
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<ImageAnalysis | null>(null);
  const [scanId, setScanId] = useState("");
  const [showHeatmap, setShowHeatmap] = useState(true);

  const onDrop = useCallback((files: File[]) => {
    const file = files[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
    setResult(null);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".png", ".jpg", ".jpeg", ".webp"] },
    maxFiles: 1,
  });

  const analyze = async () => {
    if (!preview) {
      toast.error("Please upload an image first");
      return;
    }
    setScanning(true);
    await new Promise((r) => setTimeout(r, 3000));
    setResult(mockImageAnalysis());
    setScanId(generateScanId());
    setScanning(false);
    toast.success("Image analysis complete");
  };

  return (
    <div>
      <DashboardHeader
        title="AI Image Detector"
        subtitle="CNN & Vision Transformer analysis for GAN artifacts and manipulation"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Upload Image</CardTitle>
          </CardHeader>
          <CardContent>
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${
                isDragActive ? "border-primary bg-primary/5" : "border-white/10 hover:border-primary/30"
              }`}
            >
              <input {...getInputProps()} />
              <Upload className="w-10 h-10 text-muted mx-auto mb-4" />
              <p className="text-sm text-muted">
                {isDragActive ? "Drop image here..." : "Drag & drop an image, or click to browse"}
              </p>
              <p className="text-xs text-muted mt-2">PNG, JPG, WEBP up to 10MB</p>
            </div>

            {preview && (
              <div className="mt-4 relative rounded-2xl overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={preview} alt="Preview" className="w-full h-64 object-cover rounded-2xl" />
                {result && showHeatmap && (
                  <div className="absolute inset-0">
                    {result.heatmapRegions.map((r, i) => (
                      <div
                        key={i}
                        className="absolute border-2 border-danger/70 bg-danger/20 rounded animate-pulse"
                        style={{
                          left: `${r.x}%`,
                          top: `${r.y}%`,
                          width: `${r.width}%`,
                          height: `${r.height}%`,
                        }}
                      />
                    ))}
                  </div>
                )}
                {scanning && <ScanningOverlay active message="Scanning with ViT & CNN..." />}
              </div>
            )}

            <div className="flex gap-3 mt-4">
              <Button variant="glow" onClick={analyze} disabled={!preview || scanning} className="flex-1">
                {scanning ? <Loader2 className="w-4 h-4 animate-spin" /> : <ImageIcon className="w-4 h-4" />}
                Analyze Image
              </Button>
              {result && (
                <Button variant="secondary" onClick={() => setShowHeatmap(!showHeatmap)}>
                  {showHeatmap ? "Hide" : "Show"} Heatmap
                </Button>
              )}
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
                  <ConfidenceMeter value={result.aiProbability} label="AI Generation Probability" />
                  <p className="text-sm text-muted">{result.explanation}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle className="text-base">Detection Signals</CardTitle></CardHeader>
                <CardContent className="grid grid-cols-2 gap-3">
                  {[
                    { label: "GAN Patterns", detected: result.ganPatterns },
                    { label: "Face Anomalies", detected: result.faceAnomalies },
                    { label: "Manipulation", detected: result.manipulationDetected },
                    { label: "Metadata Issues", detected: true },
                  ].map((signal) => (
                    <div key={signal.label} className={`p-3 rounded-xl text-sm ${signal.detected ? "bg-danger/10 border border-danger/20" : "bg-success/10 border border-success/20"}`}>
                      <p className="font-medium">{signal.label}</p>
                      <p className={`text-xs mt-1 ${signal.detected ? "text-danger" : "text-success"}`}>
                        {signal.detected ? "Detected" : "Not detected"}
                      </p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle className="text-base">Metadata Analysis</CardTitle></CardHeader>
                <CardContent>
                  <dl className="space-y-2">
                    {Object.entries(result.metadata).map(([key, val]) => (
                      <div key={key} className="flex justify-between text-sm py-2 border-b border-white/5">
                        <dt className="text-muted">{key}</dt>
                        <dd className="font-mono text-xs">{val}</dd>
                      </div>
                    ))}
                  </dl>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <Card className="flex items-center justify-center min-h-[400px]">
              <p className="text-muted text-sm">Upload an image to begin AI detection analysis</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

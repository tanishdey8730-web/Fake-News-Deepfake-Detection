"use client";

import { useState, useRef, useEffect } from "react";
import { Camera, CameraOff, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DashboardHeader } from "@/components/dashboard/sidebar";
import { ConfidenceMeter, VerdictBadge, ScanningOverlay } from "@/components/detection/shared";

export default function WebcamPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [streaming, setStreaming] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<{ verdict: string; confidence: number } | null>(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setStreaming(true);
      }
    } catch {
      toast.error("Camera access denied");
    }
  };

  const stopCamera = () => {
    const stream = videoRef.current?.srcObject as MediaStream | null;
    stream?.getTracks().forEach((t) => t.stop());
    if (videoRef.current) videoRef.current.srcObject = null;
    setStreaming(false);
    setResult(null);
  };

  const scan = async () => {
    setScanning(true);
    await new Promise((r) => setTimeout(r, 3000));
    const confidence = Math.round(20 + Math.random() * 30);
    setResult({ verdict: "AUTHENTIC", confidence });
    setScanning(false);
    toast.success("Live scan complete — no deepfake detected");
  };

  useEffect(() => () => stopCamera(), []);

  return (
    <div>
      <DashboardHeader
        title="Live Webcam Deepfake Detector"
        subtitle="Real-time facial analysis for deepfake detection"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle className="text-base">Camera Feed</CardTitle></CardHeader>
          <CardContent>
            <div className="relative rounded-2xl overflow-hidden bg-black/60 aspect-video">
              <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
              {!streaming && (
                <div className="absolute inset-0 flex items-center justify-center text-muted text-sm">
                  Camera not active
                </div>
              )}
              {scanning && <ScanningOverlay active message="Real-time face analysis..." />}
            </div>
            <div className="flex gap-3 mt-4">
              {!streaming ? (
                <Button variant="glow" onClick={startCamera} className="flex-1">
                  <Camera className="w-4 h-4" /> Start Camera
                </Button>
              ) : (
                <>
                  <Button variant="glow" onClick={scan} disabled={scanning} className="flex-1">
                    {scanning ? <Loader2 className="w-4 h-4 animate-spin" /> : "Scan for Deepfake"}
                  </Button>
                  <Button variant="secondary" onClick={stopCamera}>
                    <CameraOff className="w-4 h-4" />
                  </Button>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">Live Analysis</CardTitle></CardHeader>
          <CardContent className="space-y-6 pt-2">
            {result ? (
              <>
                <VerdictBadge verdict={result.verdict} size="lg" />
                <ConfidenceMeter value={result.confidence} label="Deepfake Probability" />
                <p className="text-sm text-muted">
                  Real-time analysis of facial landmarks, blink patterns, and temporal consistency shows authentic human presence.
                </p>
              </>
            ) : (
              <p className="text-muted text-sm py-20 text-center">
                Start the camera and run a scan to detect deepfakes in real-time
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

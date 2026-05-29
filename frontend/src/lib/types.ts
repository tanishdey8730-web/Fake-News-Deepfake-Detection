export type DetectionType = "fake_news" | "ai_image" | "deepfake_video" | "ai_text";

export type ScanStatus = "pending" | "processing" | "completed" | "failed";

export interface ScanResult {
  id: string;
  type: DetectionType;
  status: ScanStatus;
  verdict: "real" | "fake" | "suspicious" | "ai_generated" | "human";
  confidence: number;
  createdAt: string;
  inputPreview?: string;
  details?: Record<string, unknown>;
}

export interface FakeNewsAnalysis {
  verdict: "REAL" | "FAKE" | "SUSPICIOUS";
  confidence: number;
  credibilityScore: number;
  sourceReliability: number;
  biasScore: number;
  emotionalExaggeration: number;
  factConsistency: number;
  suspiciousSentences: { text: string; reason: string }[];
  explanation: string;
  trustedSources: string[];
  manipulativeLanguage: string[];
}

export interface ImageAnalysis {
  aiProbability: number;
  manipulationDetected: boolean;
  verdict: "AUTHENTIC" | "AI_GENERATED" | "MANIPULATED";
  heatmapRegions: { x: number; y: number; width: number; height: number; score: number }[];
  metadata: Record<string, string>;
  explanation: string;
  ganPatterns: boolean;
  faceAnomalies: boolean;
}

export interface VideoAnalysis {
  deepfakeProbability: number;
  verdict: "AUTHENTIC" | "DEEPFAKE" | "SUSPICIOUS";
  suspiciousFrames: { timestamp: number; reason: string; confidence: number }[];
  lipSyncIssues: number;
  faceSwapDetected: boolean;
  aiVoiceDetected: boolean;
  eyeBlinkAnomalies: number;
  temporalInconsistencies: number;
  explanation: string;
}

export interface TextAnalysis {
  aiScore: number;
  humanScore: number;
  verdict: "HUMAN" | "AI_GENERATED" | "MIXED";
  gptProbability: number;
  burstiness: number;
  perplexity: number;
  sentenceHighlights: { text: string; aiProbability: number }[];
  explanation: string;
}

export interface DashboardStats {
  totalScans: number;
  threatsDetected: number;
  avgConfidence: number;
  scansToday: number;
  byType: Record<DetectionType, number>;
}

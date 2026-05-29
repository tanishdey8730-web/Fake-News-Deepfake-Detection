import type { FakeNewsAnalysis, ImageAnalysis, TextAnalysis, VideoAnalysis } from "./types";

export function mockFakeNewsAnalysis(content: string): FakeNewsAnalysis {
  const words = content.split(/\s+/).length;
  const hasSensational = /shocking|breaking|exclusive|secret|they don't want you to know/i.test(content);
  const hasCaps = (content.match(/[A-Z]{4,}/g) || []).length > 2;
  const fakeScore = Math.min(95, 35 + (hasSensational ? 25 : 0) + (hasCaps ? 15 : 0) + (words < 50 ? 10 : 0));

  const sentences = content.split(/[.!?]+/).filter(Boolean).slice(0, 5);
  const suspiciousSentences = sentences.slice(0, 2).map((s, i) => ({
    text: s.trim(),
    reason: i === 0 ? "Emotional exaggeration detected" : "Unverified claim pattern",
  }));

  return {
    verdict: fakeScore > 65 ? "FAKE" : fakeScore > 45 ? "SUSPICIOUS" : "REAL",
    confidence: fakeScore,
    credibilityScore: 100 - fakeScore,
    sourceReliability: Math.max(20, 100 - fakeScore - 10),
    biasScore: Math.min(90, fakeScore + 5),
    emotionalExaggeration: hasSensational ? 78 : 32,
    factConsistency: Math.max(15, 100 - fakeScore),
    suspiciousSentences,
    explanation:
      fakeScore > 65
        ? "Multiple indicators suggest this content may be fabricated or heavily manipulated. Sensational language, unverified claims, and low source reliability were detected."
        : "Content shows moderate credibility with some areas requiring verification.",
    trustedSources: ["Reuters Fact Check", "Snopes", "AP News Verification"],
    manipulativeLanguage: hasSensational ? ["shocking claims", "unverified sources", "emotional triggers"] : [],
  };
}

export function mockImageAnalysis(): ImageAnalysis {
  const aiProb = 45 + Math.random() * 40;
  return {
    aiProbability: Math.round(aiProb),
    manipulationDetected: aiProb > 60,
    verdict: aiProb > 70 ? "AI_GENERATED" : aiProb > 50 ? "MANIPULATED" : "AUTHENTIC",
    heatmapRegions: [
      { x: 20, y: 15, width: 30, height: 25, score: 0.82 },
      { x: 55, y: 40, width: 25, height: 20, score: 0.67 },
    ],
    metadata: {
      "EXIF:Software": "Unknown / Stripped",
      "Color Profile": "sRGB",
      "Compression": "High (possible re-encoding)",
      "Creation Date": "Not available",
    },
    explanation:
      "Analysis detected potential GAN artifact patterns in facial regions and metadata inconsistencies suggesting possible AI generation or post-processing.",
    ganPatterns: aiProb > 55,
    faceAnomalies: aiProb > 50,
  };
}

export function mockVideoAnalysis(): VideoAnalysis {
  const prob = 40 + Math.random() * 45;
  return {
    deepfakeProbability: Math.round(prob),
    verdict: prob > 70 ? "DEEPFAKE" : prob > 50 ? "SUSPICIOUS" : "AUTHENTIC",
    suspiciousFrames: [
      { timestamp: 2.4, reason: "Lip-sync mismatch", confidence: 0.84 },
      { timestamp: 5.1, reason: "Face boundary artifact", confidence: 0.71 },
      { timestamp: 8.7, reason: "Eye blink anomaly", confidence: 0.63 },
    ],
    lipSyncIssues: prob > 50 ? 3 : 0,
    faceSwapDetected: prob > 65,
    aiVoiceDetected: prob > 60,
    eyeBlinkAnomalies: prob > 45 ? 2 : 0,
    temporalInconsistencies: prob > 55 ? 4 : 1,
    explanation:
      "Temporal analysis revealed frame-level inconsistencies typical of deepfake generation, including lip-sync desynchronization and facial boundary artifacts.",
  };
}

export function mockTextAnalysis(content: string): TextAnalysis {
  const sentences = content.split(/[.!?]+/).filter(Boolean);
  const avgLen = sentences.reduce((a, s) => a + s.length, 0) / Math.max(sentences.length, 1);
  const repetitive = /(\b\w+\b)(?:.*\1)/i.test(content);
  const aiScore = Math.min(95, 30 + (avgLen > 80 ? 20 : 0) + (repetitive ? 15 : 0) + (content.length > 500 ? 10 : 0));

  return {
    aiScore,
    humanScore: 100 - aiScore,
    verdict: aiScore > 70 ? "AI_GENERATED" : aiScore > 45 ? "MIXED" : "HUMAN",
    gptProbability: aiScore,
    burstiness: Math.max(0.2, 1 - aiScore / 100),
    perplexity: 20 + aiScore * 0.5,
    sentenceHighlights: sentences.slice(0, 4).map((s) => ({
      text: s.trim(),
      aiProbability: Math.min(95, aiScore + Math.random() * 20 - 10),
    })),
    explanation:
      aiScore > 70
        ? "Text exhibits low burstiness and uniform sentence structure consistent with LLM generation patterns."
        : "Writing patterns suggest primarily human authorship with some AI-like uniformity.",
  };
}

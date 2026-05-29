import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { Card } from "@/components/ui/card";

const research = [
  { title: "Multi-Modal Misinformation Detection", desc: "Combining NLP, computer vision, and temporal analysis for comprehensive content verification.", models: ["BERT", "ViT", "XceptionNet"] },
  { title: "FaceForensics++ Integration", desc: "State-of-the-art deepfake detection using compressed video analysis and face manipulation detection.", models: ["XceptionNet", "MesoNet", "EfficientNet"] },
  { title: "GPT Perplexity Scoring", desc: "Statistical analysis of text burstiness and token probability distributions for AI authorship detection.", models: ["GPT-2 Detector", "RoBERTa"] },
  { title: "Blockchain Verification Concept", desc: "Immutable content fingerprinting for provenance tracking and crowd fact-checking consensus.", models: ["SHA-256 Hashing", "IPFS"] },
];

export default function ResearchPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <section className="pt-32 pb-20 px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">
          Research & <span className="text-gradient">Publications</span>
        </h1>
        <p className="text-muted mb-12">
          Our AI research team publishes findings on misinformation detection, deepfake analysis, and content verification.
        </p>

        <div className="space-y-6">
          {research.map((r) => (
            <Card key={r.title}>
              <h2 className="text-lg font-semibold mb-2">{r.title}</h2>
              <p className="text-sm text-muted mb-4">{r.desc}</p>
              <div className="flex flex-wrap gap-2">
                {r.models.map((m) => (
                  <span key={m} className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">{m}</span>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}

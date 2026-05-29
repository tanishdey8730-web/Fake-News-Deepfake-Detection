import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { Card } from "@/components/ui/card";

const endpoints = [
  { method: "POST", path: "/api/detect/fake-news", desc: "Analyze article URL or text content for fake news indicators" },
  { method: "POST", path: "/api/detect/image", desc: "Upload image for AI generation and manipulation detection" },
  { method: "POST", path: "/api/detect/video", desc: "Upload video or provide URL for deepfake analysis" },
  { method: "POST", path: "/api/detect/text", desc: "Detect AI-generated text with perplexity scoring" },
  { method: "GET", path: "/api/scans", desc: "Retrieve scan history for authenticated user" },
  { method: "GET", path: "/api/reports/:scanId", desc: "Download PDF report for a specific scan" },
];

export default function APIDocsPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <section className="pt-32 pb-20 px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">
          API <span className="text-gradient">Documentation</span>
        </h1>
        <p className="text-muted mb-8">Integrate TruthGuard AI detection into your applications</p>

        <Card className="mb-8">
          <h2 className="font-semibold mb-2">Authentication</h2>
          <p className="text-sm text-muted mb-3">Include your API key in the Authorization header:</p>
          <code className="block p-4 rounded-xl bg-black/40 text-sm font-mono">
            Authorization: Bearer tg_live_sk_your_api_key
          </code>
        </Card>

        <Card className="mb-8">
          <h2 className="font-semibold mb-2">Base URL</h2>
          <code className="block p-4 rounded-xl bg-black/40 text-sm font-mono">
            https://api.truthguard.ai/v1
          </code>
        </Card>

        <h2 className="text-xl font-semibold mb-4">Endpoints</h2>
        <div className="space-y-4">
          {endpoints.map((ep) => (
            <Card key={ep.path}>
              <div className="flex items-center gap-3 mb-2">
                <span className={`text-xs font-bold px-2 py-1 rounded ${ep.method === "GET" ? "bg-success/20 text-success" : "bg-primary/20 text-primary"}`}>
                  {ep.method}
                </span>
                <code className="text-sm font-mono">{ep.path}</code>
              </div>
              <p className="text-sm text-muted">{ep.desc}</p>
            </Card>
          ))}
        </div>

        <Card className="mt-8">
          <h2 className="font-semibold mb-2">Example Request</h2>
          <pre className="p-4 rounded-xl bg-black/40 text-sm font-mono overflow-x-auto">{`curl -X POST https://api.truthguard.ai/v1/api/detect/text \\
  -H "Authorization: Bearer tg_live_sk_xxx" \\
  -H "Content-Type: application/json" \\
  -d '{"content": "Your text to analyze..."}'`}</pre>
        </Card>
      </section>
      <Footer />
    </main>
  );
}

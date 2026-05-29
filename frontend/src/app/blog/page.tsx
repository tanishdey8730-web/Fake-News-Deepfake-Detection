import Link from "next/link";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { Card } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";

const posts = [
  { slug: "deepfake-threat-2026", title: "The Deepfake Threat Landscape in 2026", excerpt: "How AI-generated video is reshaping cybersecurity and what organizations can do.", date: "2026-05-15", tag: "Deepfakes" },
  { slug: "bert-fake-news", title: "How BERT Models Detect Fake News", excerpt: "A technical deep-dive into our NLP pipeline for credibility scoring.", date: "2026-05-01", tag: "NLP" },
  { slug: "ai-image-detection", title: "Detecting GAN-Generated Images with Vision Transformers", excerpt: "Understanding artifact patterns in AI-generated visual content.", date: "2026-04-20", tag: "Computer Vision" },
  { slug: "gpt-text-detection", title: "GPT Text Detection: Perplexity vs Burstiness", excerpt: "Comparing statistical methods for identifying AI-written content.", date: "2026-04-05", tag: "AI Text" },
];

export default function BlogPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <section className="pt-32 pb-20 px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">
          TruthGuard <span className="text-gradient">Blog</span>
        </h1>
        <p className="text-muted mb-12">Insights on misinformation, deepfakes, and AI detection research</p>

        <div className="space-y-6">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <Card className="hover:border-primary/30 transition-colors cursor-pointer">
                <span className="text-xs text-primary font-medium">{post.tag}</span>
                <h2 className="text-xl font-semibold mt-2 mb-2">{post.title}</h2>
                <p className="text-sm text-muted mb-3">{post.excerpt}</p>
                <p className="text-xs text-muted">{formatDate(post.date)}</p>
              </Card>
            </Link>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}

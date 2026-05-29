import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { Shield, Target, Users, Award } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <section className="pt-32 pb-20 px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">
          About <span className="text-gradient">TruthGuard AI</span>
        </h1>
        <p className="text-muted text-lg leading-relaxed mb-8">
          TruthGuard AI is a next-generation cyber intelligence platform built to combat the rising tide of
          misinformation, deepfakes, and AI-generated content. Our mission is to restore trust in digital media
          through advanced machine learning and transparent verification.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
          {[
            { icon: Shield, title: "Our Mission", desc: "Protect digital truth through AI-powered verification accessible to everyone." },
            { icon: Target, title: "Our Vision", desc: "A world where every piece of digital content can be verified instantly." },
            { icon: Users, title: "Our Team", desc: "50+ AI researchers, cybersecurity experts, and engineers worldwide." },
            { icon: Award, title: "Recognition", desc: "Featured in top cybersecurity conferences and trusted by 500+ organizations." },
          ].map((item) => (
            <Card key={item.title}>
              <item.icon className="w-8 h-8 text-primary mb-3" />
              <h3 className="font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-muted">{item.desc}</p>
            </Card>
          ))}
        </div>

        <div id="careers" className="mb-16">
          <h2 className="text-2xl font-bold mb-4">Careers</h2>
          <p className="text-muted">We&apos;re hiring AI engineers, security researchers, and full-stack developers. Email careers@truthguard.ai</p>
        </div>

        <div id="privacy" className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Privacy Policy</h2>
          <p className="text-sm text-muted">We encrypt all uploaded content, process data in isolated environments, and never sell user data.</p>
        </div>

        <div id="terms" className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Terms of Service</h2>
          <p className="text-sm text-muted">By using TruthGuard AI, you agree to our acceptable use policy and detection service terms.</p>
        </div>

        <div id="cookies">
          <h2 className="text-2xl font-bold mb-4">Cookie Policy</h2>
          <p className="text-sm text-muted">We use essential cookies for authentication and analytics cookies to improve our service.</p>
        </div>
      </section>
      <Footer />
    </main>
  );
}

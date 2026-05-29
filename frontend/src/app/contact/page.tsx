"use client";

import { useState } from "react";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Mail, MapPin, Phone } from "lucide-react";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    toast.success("Message sent! We'll respond within 24 hours.");
    setLoading(false);
  };

  return (
    <main className="min-h-screen">
      <Navbar />
      <section className="pt-32 pb-20 px-4 max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-center">
          Contact <span className="text-gradient">Us</span>
        </h1>
        <p className="text-muted text-center mb-12">Get in touch with our team</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="space-y-4">
            {[
              { icon: Mail, label: "Email", value: "support@truthguard.ai" },
              { icon: Phone, label: "Phone", value: "+1 (555) 123-4567" },
              { icon: MapPin, label: "Office", value: "San Francisco, CA" },
            ].map((item) => (
              <Card key={item.label} className="flex items-center gap-4">
                <item.icon className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-xs text-muted">{item.label}</p>
                  <p className="text-sm">{item.value}</p>
                </div>
              </Card>
            ))}
          </div>

          <Card className="lg:col-span-2">
            <form onSubmit={submit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input placeholder="Your name" required />
                <Input type="email" placeholder="Email address" required />
              </div>
              <Input placeholder="Subject" required />
              <Textarea placeholder="Your message..." className="min-h-[150px]" required />
              <Button variant="glow" type="submit" disabled={loading} className="w-full">
                {loading ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </Card>
        </div>
      </section>
      <Footer />
    </main>
  );
}

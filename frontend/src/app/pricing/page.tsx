"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Free",
    price: "$0",
    desc: "For individuals exploring AI detection",
    features: ["10 scans/month", "Fake news & text detection", "Basic reports", "Community support"],
    cta: "Get Started",
    highlight: false,
  },
  {
    name: "Pro",
    price: "$29",
    desc: "For professionals and small teams",
    features: ["Unlimited scans", "All 4 detection modules", "PDF reports", "API access", "Priority support", "Live webcam detection"],
    cta: "Start Pro Trial",
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    desc: "For organizations at scale",
    features: ["Everything in Pro", "Custom model training", "SLA guarantee", "Dedicated support", "On-premise deployment", "Blockchain verification"],
    cta: "Contact Sales",
    highlight: false,
  },
];

export default function PricingPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <section className="pt-32 pb-20 px-4 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">
            Simple, Transparent <span className="text-gradient">Pricing</span>
          </h1>
          <p className="text-muted">Choose the plan that fits your verification needs</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`relative ${plan.highlight ? "border-primary/40 glow-primary" : ""}`}
            >
              {plan.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 text-xs font-semibold bg-gradient-to-r from-primary to-accent rounded-full text-white">
                  Most Popular
                </span>
              )}
              <h3 className="text-xl font-bold">{plan.name}</h3>
              <div className="mt-2 mb-1">
                <span className="text-4xl font-bold">{plan.price}</span>
                {plan.price !== "Custom" && <span className="text-muted text-sm">/month</span>}
              </div>
              <p className="text-sm text-muted mb-6">{plan.desc}</p>
              <ul className="space-y-3 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-success shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Button variant={plan.highlight ? "glow" : "secondary"} className="w-full" asChild>
                <Link href="/sign-up">{plan.cta}</Link>
              </Button>
            </Card>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}

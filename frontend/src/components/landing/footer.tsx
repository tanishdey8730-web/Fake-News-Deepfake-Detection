import Link from "next/link";
import { Shield, Share2, Code2, Globe } from "lucide-react";

const footerLinks = {
  Product: [
    { label: "Features", href: "/#features" },
    { label: "Pricing", href: "/pricing" },
    { label: "API Docs", href: "/api-docs" },
    { label: "Research", href: "/research" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
    { label: "Careers", href: "/about#careers" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/about#privacy" },
    { label: "Terms of Service", href: "/about#terms" },
    { label: "Cookie Policy", href: "/about#cookies" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-black/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-gradient-to-br from-primary to-accent">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-lg">TruthGuard AI</span>
            </Link>
            <p className="text-sm text-muted max-w-xs">
              Advanced AI-powered verification platform for digital truth detection and cyber intelligence.
            </p>
            <div className="flex gap-3">
              {[Share2, Code2, Globe].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="p-2 rounded-lg glass hover:border-primary/30 transition-colors"
                >
                  <Icon className="w-4 h-4 text-muted" />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-semibold mb-4">{title}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-muted hover:text-primary transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted">© 2026 TruthGuard AI. All rights reserved.</p>
          <p className="text-xs text-muted">Securing digital truth with advanced AI</p>
        </div>
      </div>
    </footer>
  );
}

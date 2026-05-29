"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { isClerkConfigured } from "@/lib/clerk-config";

const navLinks = [
  { href: "/#features", label: "Features" },
  { href: "/#how-it-works", label: "How it Works" },
  { href: "/pricing", label: "Pricing" },
  { href: "/research", label: "Research" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const clerkEnabled = isClerkConfigured();
  const signInHref = clerkEnabled ? "/sign-in" : "/dashboard";
  const dashboardHref = clerkEnabled ? "/sign-up" : "/dashboard";

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mt-4 glass rounded-2xl px-6 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="p-2 rounded-xl bg-gradient-to-br from-primary to-accent group-hover:scale-105 transition-transform">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg">
              TruthGuard <span className="text-gradient">AI</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm text-muted hover:text-foreground transition-colors",
                  pathname === link.href && "text-primary"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" asChild>
              <Link href={signInHref}>{clerkEnabled ? "Sign In" : "Dashboard"}</Link>
            </Button>
            <Button variant="glow" asChild>
              <Link href={dashboardHref}>Get Started</Link>
            </Button>
          </div>

          <button className="md:hidden p-2" onClick={() => setOpen(!open)}>
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="md:hidden mt-2 glass rounded-2xl p-4 space-y-3"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block py-2 text-sm text-muted hover:text-foreground"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex gap-2 pt-2">
                <Button variant="secondary" className="flex-1" asChild>
                  <Link href={signInHref}>{clerkEnabled ? "Sign In" : "Dashboard"}</Link>
                </Button>
                <Button variant="glow" className="flex-1" asChild>
                  <Link href={dashboardHref}>Get Started</Link>
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}

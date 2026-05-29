import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function DevAuthPanel({ mode }: { mode: "sign-in" | "sign-up" }) {
  return (
    <Card className="glass border-white/10 max-w-md mx-auto">
      <CardContent className="pt-6 space-y-4 text-center">
        <p className="text-sm text-muted">
          Clerk is not configured. Running in <strong className="text-foreground">local dev mode</strong> — no
          sign-in required.
        </p>
        <p className="text-xs text-muted">
          Add real keys from{" "}
          <a href="https://dashboard.clerk.com" className="text-primary hover:underline" target="_blank" rel="noreferrer">
            dashboard.clerk.com
          </a>{" "}
          to <code className="text-foreground">frontend/.env.local</code> to enable authentication.
        </p>
        <Button variant="glow" asChild className="w-full">
          <Link href="/dashboard">{mode === "sign-in" ? "Continue to Dashboard" : "Get Started (Dev)"}</Link>
        </Button>
      </CardContent>
    </Card>
  );
}

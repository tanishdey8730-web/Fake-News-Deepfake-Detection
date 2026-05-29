import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center cyber-grid">
      <div className="glass rounded-2xl p-8 max-w-md text-center space-y-4">
        <h1 className="text-xl font-bold">Reset Password</h1>
        <p className="text-sm text-muted">
          Password reset is handled through Clerk authentication. Use the &ldquo;Forgot password?&rdquo; link on the sign-in page.
        </p>
        <Button variant="glow" asChild>
          <Link href="/sign-in">Go to Sign In</Link>
        </Button>
      </div>
    </div>
  );
}

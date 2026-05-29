import { SignIn } from "@clerk/nextjs";
import { DevAuthPanel } from "@/components/auth/dev-auth-panel";
import { isClerkConfigured } from "@/lib/clerk-config";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center cyber-grid relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
      <div className="relative z-10 w-full max-w-lg px-4">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold">
            Welcome to <span className="text-gradient">TruthGuard AI</span>
          </h1>
          <p className="text-muted text-sm mt-2">Sign in to access your cyber intelligence dashboard</p>
        </div>
        {isClerkConfigured() ? (
          <SignIn
            appearance={{
              elements: {
                rootBox: "mx-auto",
                card: "glass border-white/10 shadow-2xl",
              },
            }}
            routing="path"
            path="/sign-in"
            signUpUrl="/sign-up"
          />
        ) : (
          <DevAuthPanel mode="sign-in" />
        )}
      </div>
    </div>
  );
}

import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center cyber-grid relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
      <div className="relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold">
            Join <span className="text-gradient">TruthGuard AI</span>
          </h1>
          <p className="text-muted text-sm mt-2">Create your account and start detecting AI manipulation</p>
        </div>
        <SignUp
          appearance={{
            elements: {
              rootBox: "mx-auto",
              card: "glass border-white/10 shadow-2xl",
            },
          }}
          routing="path"
          path="/sign-up"
          signInUrl="/sign-in"
        />
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { User } from "lucide-react";
import { isClerkConfigured } from "@/lib/clerk-config";

export function UserMenu() {
  if (!isClerkConfigured()) {
    return (
      <Link
        href="/dashboard"
        className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-primary hover:bg-primary/30 transition-colors"
        title="Dev mode — open dashboard"
      >
        <User className="h-4 w-4" />
      </Link>
    );
  }

  return <UserButton />;
}

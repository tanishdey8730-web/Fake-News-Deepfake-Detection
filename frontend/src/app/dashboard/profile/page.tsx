"use client";

import { UserProfile } from "@clerk/nextjs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardHeader } from "@/components/dashboard/sidebar";
import { isClerkConfigured } from "@/lib/clerk-config";
import { Scan, Shield, Calendar, User } from "lucide-react";

export default function ProfilePage() {
  const clerkEnabled = isClerkConfigured();

  return (
    <div>
      <DashboardHeader title="Profile" subtitle="Manage your account and view usage statistics" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="pt-6">
              {clerkEnabled ? (
                <UserProfile
                  appearance={{
                    elements: {
                      rootBox: "w-full",
                      card: "glass border-white/10 shadow-none w-full",
                    },
                  }}
                />
              ) : (
                <div className="flex flex-col items-center gap-4 py-8 text-center">
                  <div className="p-4 rounded-full bg-primary/10">
                    <User className="w-10 h-10 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-lg">Dev User</p>
                    <p className="text-sm text-muted mt-1">Local development mode — configure Clerk for real accounts.</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          {[
            { icon: Scan, label: "Total Scans", value: "847" },
            { icon: Shield, label: "Threats Blocked", value: "156" },
            { icon: Calendar, label: "Member Since", value: "Jan 2026" },
          ].map((stat) => (
            <Card key={stat.label}>
              <CardContent className="pt-6 flex items-center gap-4">
                <div className="p-3 rounded-xl bg-primary/10">
                  <stat.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted">{stat.label}</p>
                  <p className="text-xl font-bold">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          ))}

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Plan</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-semibold text-gradient">Pro Plan</p>
              <p className="text-sm text-muted mt-1">Unlimited scans · API access · Priority support</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

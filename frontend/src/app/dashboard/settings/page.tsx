"use client";

import { useState } from "react";
import { useTheme } from "next-themes";
import { Bell, Globe, Shield, Key } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DashboardHeader } from "@/components/dashboard/sidebar";
import { toast } from "sonner";

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState("en");

  return (
    <div>
      <DashboardHeader title="Settings" subtitle="Configure your TruthGuard AI preferences" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-4xl">
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Shield className="w-4 h-4 text-primary" /> Appearance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Theme</span>
              <div className="flex gap-2">
                <Button variant={theme === "dark" ? "default" : "secondary"} size="sm" onClick={() => setTheme("dark")}>Dark</Button>
                <Button variant={theme === "light" ? "default" : "secondary"} size="sm" onClick={() => setTheme("light")}>Light</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Bell className="w-4 h-4 text-primary" /> Notifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm">Threat Alerts</p>
                <p className="text-xs text-muted">Get notified when threats are detected</p>
              </div>
              <Button
                variant={notifications ? "default" : "secondary"}
                size="sm"
                onClick={() => { setNotifications(!notifications); toast.success("Settings saved"); }}
              >
                {notifications ? "Enabled" : "Disabled"}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Globe className="w-4 h-4 text-primary" /> Language
            </CardTitle>
          </CardHeader>
          <CardContent>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full h-11 rounded-xl border border-white/10 bg-white/5 px-4 text-sm"
            >
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
              <option value="hi">हिन्दी</option>
              <option value="zh">中文</option>
            </select>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Key className="w-4 h-4 text-primary" /> API Integration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted">Connect TruthGuard AI to your applications via REST API.</p>
            <div className="p-3 rounded-xl bg-white/5 font-mono text-xs break-all">
              tg_live_sk_••••••••••••••••••••
            </div>
            <Button variant="secondary" size="sm" onClick={() => toast.success("API key regenerated")}>
              Regenerate Key
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

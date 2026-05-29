"use client";

import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Scan,
  AlertTriangle,
  TrendingUp,
  Clock,
  Newspaper,
  ImageIcon,
  Video,
  FileText,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardHeader } from "@/components/dashboard/sidebar";
import { formatDate } from "@/lib/utils";

const stats = [
  { label: "Total Scans", value: "12,847", change: "+12.5%", icon: Scan, color: "text-primary" },
  { label: "Threats Detected", value: "2,341", change: "+8.2%", icon: AlertTriangle, color: "text-danger" },
  { label: "Avg Confidence", value: "94.2%", change: "+2.1%", icon: TrendingUp, color: "text-success" },
  { label: "Scans Today", value: "156", change: "+23", icon: Clock, color: "text-accent" },
];

const activityData = [
  { time: "00:00", scans: 12 },
  { time: "04:00", scans: 8 },
  { time: "08:00", scans: 45 },
  { time: "12:00", scans: 78 },
  { time: "16:00", scans: 92 },
  { time: "20:00", scans: 56 },
];

const typeDistribution = [
  { name: "Fake News", value: 35, color: "#6366f1" },
  { name: "AI Images", value: 28, color: "#a855f7" },
  { name: "Deepfakes", value: 22, color: "#06b6d4" },
  { name: "AI Text", value: 15, color: "#10b981" },
];

const recentScans = [
  { id: "TG-A1B2C3", type: "Fake News", verdict: "FAKE", confidence: 87, time: new Date().toISOString() },
  { id: "TG-D4E5F6", type: "AI Image", verdict: "AI Generated", confidence: 92, time: new Date(Date.now() - 3600000).toISOString() },
  { id: "TG-G7H8I9", type: "Deepfake", verdict: "Suspicious", confidence: 74, time: new Date(Date.now() - 7200000).toISOString() },
  { id: "TG-J0K1L2", type: "AI Text", verdict: "Human", confidence: 91, time: new Date(Date.now() - 10800000).toISOString() },
];

const threatAlerts = [
  { title: "Viral misinformation campaign detected", severity: "high", time: "5 min ago" },
  { title: "Deepfake video circulating on social media", severity: "critical", time: "12 min ago" },
  { title: "AI-generated image cluster identified", severity: "medium", time: "28 min ago" },
];

const typeIcons: Record<string, typeof Newspaper> = {
  "Fake News": Newspaper,
  "AI Image": ImageIcon,
  Deepfake: Video,
  "AI Text": FileText,
};

export default function DashboardPage() {
  return (
    <div>
      <DashboardHeader
        title="Cyber Intelligence Dashboard"
        subtitle="Real-time overview of detection activity and threat alerts"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="hover:border-primary/20">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted">{stat.label}</p>
                    <p className="text-2xl font-bold mt-1">{stat.value}</p>
                    <p className="text-xs text-success mt-1">{stat.change}</p>
                  </div>
                  <div className={`p-3 rounded-xl bg-white/5 ${stat.color}`}>
                    <stat.icon className="w-5 h-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Real-time Scan Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={activityData}>
                <defs>
                  <linearGradient id="scanGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6366f1" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="time" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip contentStyle={{ background: "#1e293b", border: "none", borderRadius: 8 }} />
                <Area type="monotone" dataKey="scans" stroke="#6366f1" fill="url(#scanGradient)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Detection by Type</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie data={typeDistribution} cx="50%" cy="50%" innerRadius={50} outerRadius={75} dataKey="value" paddingAngle={3}>
                  {typeDistribution.map((d) => (
                    <Cell key={d.name} fill={d.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {typeDistribution.map((d) => (
                <div key={d.name} className="flex items-center gap-2 text-xs text-muted">
                  <div className="w-2 h-2 rounded-full" style={{ background: d.color }} />
                  {d.name}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Recent Scans</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentScans.map((scan) => {
              const Icon = typeIcons[scan.type] || Scan;
              return (
                <div key={scan.id} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{scan.id}</p>
                    <p className="text-xs text-muted">{scan.type} · {formatDate(scan.time)}</p>
                  </div>
                  <div className="text-right">
                    <p className={`text-xs font-semibold ${scan.verdict === "FAKE" || scan.verdict === "AI Generated" ? "text-danger" : scan.verdict === "Suspicious" ? "text-warning" : "text-success"}`}>
                      {scan.verdict}
                    </p>
                    <p className="text-xs text-muted">{scan.confidence}%</p>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Threat Alerts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {threatAlerts.map((alert, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border-l-2 border-l-danger">
                <AlertTriangle className={`w-4 h-4 mt-0.5 shrink-0 ${alert.severity === "critical" ? "text-danger" : alert.severity === "high" ? "text-warning" : "text-primary"}`} />
                <div>
                  <p className="text-sm">{alert.title}</p>
                  <p className="text-xs text-muted mt-1">{alert.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

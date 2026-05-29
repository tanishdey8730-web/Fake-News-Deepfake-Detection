"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { Users, Ban, Activity, Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DashboardHeader } from "@/components/dashboard/sidebar";

const adminStats = [
  { label: "Total Users", value: "12,456", icon: Users },
  { label: "Active Scans", value: "1,234", icon: Activity },
  { label: "Blocked Users", value: "23", icon: Ban },
  { label: "Detection Accuracy", value: "97.8%", icon: Target },
];

const userActivity = [
  { day: "Mon", scans: 420, users: 180 },
  { day: "Tue", scans: 380, users: 165 },
  { day: "Wed", scans: 510, users: 210 },
  { day: "Thu", scans: 470, users: 195 },
  { day: "Fri", scans: 590, users: 240 },
  { day: "Sat", scans: 320, users: 140 },
  { day: "Sun", scans: 280, users: 120 },
];

const recentUsers = [
  { email: "user@example.com", scans: 45, status: "active", role: "user" },
  { email: "analyst@corp.com", scans: 128, status: "active", role: "pro" },
  { email: "spam@badactor.net", scans: 2, status: "blocked", role: "user" },
  { email: "admin@truthguard.ai", scans: 0, status: "active", role: "admin" },
];

export default function AdminPage() {
  return (
    <div>
      <DashboardHeader title="Admin Panel" subtitle="Manage users, monitor analytics, and system health" />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        {adminStats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="pt-6 flex items-center gap-4">
              <div className="p-3 rounded-xl bg-primary/10">
                <stat.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader><CardTitle className="text-base">Daily Scan Volume</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={userActivity}>
                <XAxis dataKey="day" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip contentStyle={{ background: "#1e293b", border: "none", borderRadius: 8 }} />
                <Bar dataKey="scans" fill="#6366f1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">Active Users Trend</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={userActivity}>
                <XAxis dataKey="day" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip contentStyle={{ background: "#1e293b", border: "none", borderRadius: 8 }} />
                <Line type="monotone" dataKey="users" stroke="#a855f7" strokeWidth={2} dot={{ fill: "#a855f7" }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-base">User Management</CardTitle></CardHeader>
        <CardContent>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5 text-muted text-left">
                <th className="pb-3 pr-4">Email</th>
                <th className="pb-3 pr-4">Scans</th>
                <th className="pb-3 pr-4">Role</th>
                <th className="pb-3 pr-4">Status</th>
                <th className="pb-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentUsers.map((u) => (
                <tr key={u.email} className="border-b border-white/5">
                  <td className="py-3 pr-4">{u.email}</td>
                  <td className="py-3 pr-4 font-mono">{u.scans}</td>
                  <td className="py-3 pr-4 capitalize">{u.role}</td>
                  <td className="py-3 pr-4">
                    <span className={`text-xs px-2 py-1 rounded-full ${u.status === "active" ? "bg-success/20 text-success" : "bg-danger/20 text-danger"}`}>
                      {u.status}
                    </span>
                  </td>
                  <td className="py-3">
                    {u.status === "active" ? (
                      <Button variant="ghost" size="sm" className="text-danger">Block</Button>
                    ) : (
                      <Button variant="ghost" size="sm" className="text-success">Unblock</Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}

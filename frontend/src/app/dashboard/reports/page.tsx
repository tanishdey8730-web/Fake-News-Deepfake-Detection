"use client";

import { Download, FileText, Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DashboardHeader } from "@/components/dashboard/sidebar";
import { VerdictBadge } from "@/components/detection/shared";
import { formatDate } from "@/lib/utils";

const reports = [
  { id: "TG-A1B2C3", type: "Fake News", verdict: "FAKE", confidence: 87, date: new Date().toISOString(), risk: "High" },
  { id: "TG-D4E5F6", type: "AI Image", verdict: "AI_GENERATED", confidence: 92, date: new Date(Date.now() - 86400000).toISOString(), risk: "Critical" },
  { id: "TG-G7H8I9", type: "Deepfake Video", verdict: "SUSPICIOUS", confidence: 74, date: new Date(Date.now() - 172800000).toISOString(), risk: "Medium" },
  { id: "TG-J0K1L2", type: "AI Text", verdict: "HUMAN", confidence: 91, date: new Date(Date.now() - 259200000).toISOString(), risk: "Low" },
  { id: "TG-M3N4O5", type: "Fake News", verdict: "REAL", confidence: 88, date: new Date(Date.now() - 345600000).toISOString(), risk: "Low" },
];

export default function ReportsPage() {
  return (
    <div>
      <DashboardHeader title="Reports" subtitle="Scan history and downloadable PDF reports" />

      <div className="flex gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-3 w-4 h-4 text-muted" />
          <Input placeholder="Search by scan ID..." className="pl-10" />
        </div>
        <Button variant="secondary">
          <Download className="w-4 h-4" /> Export All
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Scan History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/5 text-muted text-left">
                  <th className="pb-3 pr-4 font-medium">Scan ID</th>
                  <th className="pb-3 pr-4 font-medium">Type</th>
                  <th className="pb-3 pr-4 font-medium">Verdict</th>
                  <th className="pb-3 pr-4 font-medium">Confidence</th>
                  <th className="pb-3 pr-4 font-medium">Risk</th>
                  <th className="pb-3 pr-4 font-medium">Date</th>
                  <th className="pb-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {reports.map((r) => (
                  <tr key={r.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="py-4 pr-4 font-mono text-primary">{r.id}</td>
                    <td className="py-4 pr-4">{r.type}</td>
                    <td className="py-4 pr-4"><VerdictBadge verdict={r.verdict} /></td>
                    <td className="py-4 pr-4 font-mono">{r.confidence}%</td>
                    <td className="py-4 pr-4">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        r.risk === "Critical" ? "bg-danger/20 text-danger" :
                        r.risk === "High" ? "bg-warning/20 text-warning" :
                        r.risk === "Medium" ? "bg-primary/20 text-primary" :
                        "bg-success/20 text-success"
                      }`}>{r.risk}</span>
                    </td>
                    <td className="py-4 pr-4 text-muted text-xs">{formatDate(r.date)}</td>
                    <td className="py-4">
                      <Button variant="ghost" size="sm">
                        <FileText className="w-4 h-4" /> PDF
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

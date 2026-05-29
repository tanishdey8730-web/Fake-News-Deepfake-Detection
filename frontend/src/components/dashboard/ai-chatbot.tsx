"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TypingIndicator } from "@/components/ui/animations";

const responses: Record<string, string> = {
  default:
    "I'm TruthGuard AI Assistant. I can help explain detection results, guide you through analysis modules, and answer questions about misinformation threats.",
  fake: "Fake news often uses sensational language, unverified claims, and emotional triggers. Our BERT models analyze credibility, bias, and fact consistency to flag suspicious content.",
  deepfake:
    "Deepfakes are detected through lip-sync analysis, face boundary artifacts, eye blink patterns, and temporal frame inconsistencies using XceptionNet and FaceForensics++ models.",
  image:
    "AI-generated images often show GAN artifacts, inconsistent metadata, and facial anomalies. Our ViT and CNN models generate heatmaps highlighting manipulated regions.",
  text: "AI-generated text typically has low burstiness, uniform sentence structure, and predictable perplexity scores. We highlight suspicious sentences for review.",
};

export function AIChatbot() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([{ role: "assistant", content: responses.default }]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  if (!pathname.startsWith("/dashboard")) return null;

  const send = () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setMessages((m) => [...m, { role: "user", content: userMsg }]);
    setInput("");
    setTyping(true);

    setTimeout(() => {
      const lower = userMsg.toLowerCase();
      let reply = responses.default;
      if (lower.includes("fake") || lower.includes("news")) reply = responses.fake;
      else if (lower.includes("deepfake") || lower.includes("video")) reply = responses.deepfake;
      else if (lower.includes("image")) reply = responses.image;
      else if (lower.includes("text") || lower.includes("gpt")) reply = responses.text;

      setMessages((m) => [...m, { role: "assistant", content: reply }]);
      setTyping(false);
    }, 1200);
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 w-80 sm:w-96 h-[420px] glass rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden border border-primary/20"
          >
            <div className="flex items-center justify-between p-4 border-b border-white/5 bg-primary/10">
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-primary" />
                <span className="font-semibold text-sm">TruthGuard Assistant</span>
              </div>
              <button onClick={() => setOpen(false)}>
                <X className="w-4 h-4 text-muted" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-xl px-3 py-2 text-sm ${
                      msg.role === "user"
                        ? "bg-primary text-white"
                        : "bg-white/5 text-foreground"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {typing && (
                <div className="flex justify-start">
                  <div className="bg-white/5 rounded-xl px-3 py-2">
                    <TypingIndicator />
                  </div>
                </div>
              )}
            </div>

            <div className="p-3 border-t border-white/5 flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder="Ask about detection..."
                className="flex-1 bg-white/5 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50"
              />
              <Button size="icon" onClick={send}>
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-gradient-to-r from-primary to-accent text-white shadow-lg shadow-primary/30"
      >
        <MessageCircle className="w-6 h-6" />
      </motion.button>
    </>
  );
}

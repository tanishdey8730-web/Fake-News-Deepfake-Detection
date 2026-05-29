const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

async function fetchAPI<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: "Request failed" }));
    throw new Error(error.message || "Request failed");
  }
  return res.json();
}

export const api = {
  detectFakeNews: (data: { url?: string; content?: string }) =>
    fetchAPI("/api/detect/fake-news", { method: "POST", body: JSON.stringify(data) }),

  detectImage: async (file: File) => {
    const formData = new FormData();
    formData.append("image", file);
    const res = await fetch(`${API_URL}/api/detect/image`, {
      method: "POST",
      body: formData,
    });
    if (!res.ok) throw new Error("Image detection failed");
    return res.json();
  },

  detectVideo: async (file?: File, url?: string) => {
    const formData = new FormData();
    if (file) formData.append("video", file);
    if (url) formData.append("url", url);
    const res = await fetch(`${API_URL}/api/detect/video`, {
      method: "POST",
      body: formData,
    });
    if (!res.ok) throw new Error("Video detection failed");
    return res.json();
  },

  detectText: (content: string) =>
    fetchAPI("/api/detect/text", { method: "POST", body: JSON.stringify({ content }) }),

  getScans: (token?: string) =>
    fetchAPI("/api/scans", {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    }),

  getStats: (token?: string) =>
    fetchAPI("/api/stats", {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    }),

  generateReport: (scanId: string, token?: string) =>
    fetch(`${API_URL}/api/reports/${scanId}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    }),
};

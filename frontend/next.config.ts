import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Parent repo has its own package.json; pin Turbopack/tracing to the Next app.
  outputFileTracingRoot: path.join(__dirname),
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;

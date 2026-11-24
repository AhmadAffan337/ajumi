import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The chatbot's local embedding model uses native ONNX bindings; load it from node_modules instead of bundling.
  serverExternalPackages: ["@huggingface/transformers", "onnxruntime-node"],
};

export default nextConfig;

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      // Forwards /api requests to the Express server during development
      // so the client can call fetch("/api/...") without hard-coding a host.
      "/api": {
        target: "http://localhost:4000",
        changeOrigin: true,
      },
    },
  },
});

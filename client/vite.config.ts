import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "build",
    manifest: true,
  },
  server: {
    open: true,
    proxy: {
      "^/(.*tweets|auth)": {
        target: "http://localhost:8001/",
      },
    },
  },
});

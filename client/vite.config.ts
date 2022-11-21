import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "build",
    manifest: true,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom"],
          mui: ["@mui/material", "@mui/icons-material", "@mui/x-date-pickers"],
          chart_js: ["react-chartjs-2", "chartjs-plugin-zoom"],
        },
      },
    },
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

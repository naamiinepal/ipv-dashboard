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
          react_router: ["react-router", "react-router-dom"],
          mui_material: ["@mui/material"],
          mui_extras: ["@mui/icons-material", "@mui/x-date-pickers", "moment"],
          chart_js: ["react-chartjs-2"],
          chart_js_extras: ["chartjs-plugin-zoom"],
          client: ["./src/client"],
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

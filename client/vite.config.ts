import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { ViteMinifyPlugin } from "vite-plugin-minify";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), ViteMinifyPlugin()],
  build: {
    outDir: "build",
    manifest: true,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom"],
          react_router: ["react-router", "react-router-dom"],
          mui_material: ["@mui/material"],
          mui_extras: ["@mui/icons-material", "@mui/x-date-pickers"],
          moment: ["moment"],
          word_cloud: ["react-wordcloud"],
          chart_js: ["react-chartjs-2"],
          chart_js_extras: ["chartjs-plugin-zoom"],
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

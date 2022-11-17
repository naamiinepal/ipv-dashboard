import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import svgrPlugin from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths(), svgrPlugin()],
  build: {
    outDir: "build",
    manifest: true,
  },
  server: {
    open: true,
    proxy: {
      "^/.*tweets": {
        target: "http://localhost:8001/",
      },
    },
  },
});

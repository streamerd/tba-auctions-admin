import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    target: "es2020",
    // rollupOptions: {
    //   // Add the external property and specify the problematic import
    //   external: ["@safe-global/safe-apps-provider"],
    // },
  },
  optimizeDeps: {
    esbuildOptions: {
      target: "es2020",
    },
  },
  define: {
    // global: "globalThis",
    myGlobalThis: "globalThis",
  },
  resolve: {
    alias: {
      process: "process/browser",
      util: "util",
    },
  },
  plugins: [react()],
});

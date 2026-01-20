import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0", // Important for Docker!
    port: 5173,
    watch: {
      usePolling: true, // Important for hot reload!
    },
  },
});

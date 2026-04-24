import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0", // Important for Docker!
    port: 5173,
    allowedHosts: [
      "localhost",
      "127.0.0.1",
      "52.62.237.44",
      "jobtracker.miagamestudio.com",
    ],
    watch: {
      usePolling: true, // Important for hot reload!
    },
  },
});

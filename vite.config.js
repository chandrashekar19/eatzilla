import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom", // Needed for React Testing Library
    setupFiles: "setupTests.js", // Optional: Custom setup file
  },
});

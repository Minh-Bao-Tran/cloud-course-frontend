import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path, { resolve } from 'path';


// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve:
  {
    alias: {
      "@src": path.resolve(__dirname, "./src"),
      "@shared": path.resolve(__dirname, "./src/shared"),
      "@public": path.resolve(__dirname, "./public"),
    }
  }
});

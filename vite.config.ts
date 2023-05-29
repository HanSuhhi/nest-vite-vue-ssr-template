import { resolve } from "node:path";
import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig(({ mode }) => {

  return {
    plugins: [
      vue(),
    ],
    server: {
      port: 20018
    },
    ssr: {
      format: "cjs"
    }
  };
});

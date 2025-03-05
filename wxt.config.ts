import { defineConfig } from "wxt";

export default defineConfig({
  manifest: {
    permissions: ["storage", "alarms"], // Add required permissions
    background: {
      type: "module",
      serviceWorker: "./entrypoints/background.ts",
    },
  },
  extensionApi: "chrome",
  modules: ["@wxt-dev/module-react"],
});

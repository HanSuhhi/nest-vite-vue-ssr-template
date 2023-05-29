import { createApp } from "./main";

const { app, router } = createApp();

void router.isReady().then(() => {
  app.mount("#app");
});

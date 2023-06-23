import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        game: resolve(__dirname, "html/game.html"),
        loginRegister: resolve(__dirname, "html/loginRegister.html"),
        profile: resolve(__dirname, "html/profile.html"),
      },
    },
  },
});

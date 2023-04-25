import { defineConfig } from 'astro/config';
import solidJs from "@astrojs/solid-js";
import tailwind from "@astrojs/tailwind";
import image from "@astrojs/image";
import partytown from "@astrojs/partytown";
import node from "@astrojs/node";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  integrations: [solidJs(), tailwind(), image(), partytown(), react()],
  output: "server",
  adapter: node({
    mode: "standalone"
  })
});
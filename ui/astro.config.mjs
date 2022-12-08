import { defineConfig } from 'astro/config';

// https://astro.build/config
import vue from "@astrojs/vue";
import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  integrations: [vue()],
  output: 'server',
  adapter: node({
    mode: 'standalone'
  }),
  server: { port: 7778, host: "0.0.0.0" }, output: "server"
});
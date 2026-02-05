// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://YOUR_GITHUB_USERNAME.github.io',
  base: '/endurance-protection-group',
  build: {
    assets: 'assets'
  }
});

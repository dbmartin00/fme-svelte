import adapter from '@sveltejs/adapter-auto';

// @type {import('@sveltejs/kit').Config} 
const config = {
  kit: {
    adapter: adapter()
  },
  compilerOptions: {
    experimental: {
      async: true
    }
  }
};

export default config;


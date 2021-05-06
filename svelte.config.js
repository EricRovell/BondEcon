import preprocess from "svelte-preprocess";
import adapter from "@sveltejs/adapter-node";
import path from "path";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: preprocess(),
	kit: {
    adapter: adapter(),
		target: '#svelte',
    vite: {
      resolve: {
        alias: {
          "$ui": path.resolve("./src/lib/ui"),
          "$components": path.resolve("./src/lib/components"),
          "$core": path.resolve("./src/lib/core"),
          "$services": path.resolve("./src/services"),
          "$stores": path.resolve("./src/lib/stores"),
          "$util": path.resolve("./src/lib/util"),
          "$views": path.resolve("./src/lib/views"),
          "$styles": path.resolve("./src/styles"),
        }
      }
    }
	}
};

export default config;
import sveltePreprocess from "svelte-preprocess";
import { mdsvex } from "mdsvex";
import adapter from "@sveltejs/adapter-static";
import path from "path";

const aliasList = [
  { name: "@components", path: "./src/lib/components" },
  { name: "@stores", path: "./src/lib/stores" },
  { name: "@util", path: "./src/lib/util" },
  { name: "@core", path: "./src/lib/core" },
  { name: "@types", path: "./src/types" },
  { name: "@styles", path: "./src/styles" },
  { name: "@assets", path: "./static" }
];

/** @type {import('@sveltejs/kit').Config} */
export default {
	preprocess: [
    mdsvex(),
		sveltePreprocess(),
	],
  extensions: [ ".svelte", ".svx" ],
	kit: {
    adapter: adapter(),
		target: '#svelte',
    vite: {
      resolve: {
        alias: Object.fromEntries(aliasList.map(alias => (
          [ alias.name, path.resolve(alias.path) ]
        )))
      }
    },
    /* prerender: {
      pages: [
        "/ru/about",
        "/en/about",
        "/ru/cv",
        "/en/cv"
      ]
    } */
	}
};
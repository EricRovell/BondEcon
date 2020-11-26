const sveltePreprocess = require("svelte-preprocess");
const cssModules = require("svelte-preprocess-cssmodules");

const createPreprocessors = ({ sourceMap }) => [
	sveltePreprocess({
		sourceMap,
		defaults: {
      script: "typescript",
    }
  }),
  cssModules({
    includePaths: [ "src" ]
  })
	// You could have more preprocessors, like mdsvex
];

module.exports = {
	createPreprocessors,
	// Options for `svelte-check` and the VS Code extension
	preprocess: createPreprocessors({ sourceMap: true }),
};
import alias from "@rollup/plugin-alias";
import resolve from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import typescript from "@rollup/plugin-typescript";
import svelte from "rollup-plugin-svelte";
import babel from "@rollup/plugin-babel";
import { terser } from "rollup-plugin-terser";
import config from "sapper/config/rollup";
import pkg from "./package.json";

const { createPreprocessors } = require("./svelte.config.js");

const mode = process.env.NODE_ENV;
const dev = mode === "development";
const sourcemap = dev ? "inline" : false;
const legacy = !!process.env.SAPPER_LEGACY_BUILD;

const preprocess = createPreprocessors({ sourceMap: !!sourcemap });

import path from "path";

const projectRootDir = path.resolve(__dirname);

const customResolver = resolve({
  extensions: [ "js", "ts" ]
});

/* Aliases */
const aliases = [
  [ "@src", "src" ],
  [ "@config", "src/config" ],
  [ "@i18n", "src/i18n" ],
  [ "@layout", "src/layout" ],
  [ "#views", "src/views/index.ts" ],
  [ "@static", "src/static" ],
  [ "#db", "src/services/db.ts" ],
  [ "@components", "src/components/index.ts" ],
  [ "@util", "src/util/index.ts" ]
];

const warningIsIgnored = (warning) => warning.message.includes(
	"Use of eval is strongly discouraged, as it poses security risks and may cause issues with minification",
) || warning.message.includes("Circular dependency: node_modules");

const onwarn = (warning, _onwarn) => {
  // https://github.com/rollup/rollup/issues/1518#issuecomment-321875784
  if (warning.code === "THIS_IS_UNDEFINED") return;

  // Workaround for https://github.com/sveltejs/sapper/issues/1266
  return (
    warning.code === "CIRCULAR_DEPENDENCY" &&
    /[/\\]@sapper[/\\]/.test(warning.message)) ||
    warningIsIgnored(warning) ||
    console.warn(warning.toString()
  );
};

export default {
	client: {
		input: config.client.input().replace(/\.js$/, ".ts"),
		output: { ...config.client.output(), sourcemap },
		plugins: [
			replace({
				"process.browser": true,
				"process.env.NODE_ENV": JSON.stringify(mode),
			}),
			svelte({
				dev,
				hydratable: true,
				emitCss: true,
				preprocess,
      }),
      alias({
        extensions: [ "js", "ts", "json" ],
        entries: aliases.map(([ find, replacement ]) => ({
          find,
          replacement: path.resolve(projectRootDir, replacement)
        })),
        customResolver
      }),
			resolve({
				browser: true,
				dedupe: ["svelte"],
			}),
			commonjs({
				sourceMap: !!sourcemap,
			}),
			typescript({
				noEmitOnError: !dev,
				sourceMap: !!sourcemap,
			}),
			json(),

			legacy && babel({
				extensions: [".js", ".mjs", ".html", ".svelte"],
				babelHelpers: "runtime",
				exclude: ["node_modules/@babel/**"],
				presets: [
					["@babel/preset-env", {
						targets: "> 0.25%, not dead",
					}],
				],
				plugins: [
					"@babel/plugin-syntax-dynamic-import",
					["@babel/plugin-transform-runtime", {
						useESModules: true,
					}],
				],
			}),

			!dev && terser({
				module: true,
			}),
		],

		preserveEntrySignatures: false,
		onwarn,
	},

	server: {
		input: { server: config.server.input().server.replace(/\.js$/, ".ts") },
		output: { ...config.server.output(), sourcemap },
		plugins: [
			replace({
				"process.browser": false,
				"process.env.NODE_ENV": JSON.stringify(mode),
				"module.require": "require",
			}),
			svelte({
				generate: "ssr",
				dev,
				preprocess,
      }),
      alias({
        extensions: [ "js", "ts", "json" ],
        entries: aliases.map(([ find, replacement ]) => ({
          find,
          replacement: path.resolve(projectRootDir, replacement)
        })),
        customResolver
      }),
			resolve({
				dedupe: ["svelte"],
			}),
			commonjs({
				sourceMap: !!sourcemap,
			}),
			typescript({
				noEmitOnError: !dev,
				sourceMap: !!sourcemap,
			}),
			json(),
		],
		external: Object.keys(pkg.dependencies).concat(
			require("module").builtinModules || Object.keys(process.binding("natives")), // eslint-disable-line global-require
		),

		preserveEntrySignatures: "strict",
		onwarn,
	},

	serviceworker: {
		input: config.serviceworker.input().replace(/\.js$/, ".ts"),
		output: { ...config.serviceworker.output(), sourcemap },
		plugins: [
			resolve(),
			replace({
				"process.browser": true,
				"process.env.NODE_ENV": JSON.stringify(mode),
			}),
			commonjs({
				sourceMap: !!sourcemap,
			}),
			typescript({
				noEmitOnError: !dev,
				sourceMap: !!sourcemap,
			}),
			!dev && terser(),
		],

		preserveEntrySignatures: false,
		onwarn,
	},
};

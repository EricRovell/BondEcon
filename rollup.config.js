import path from "path";
import pkg from "./package.json";

import config from "sapper/config/rollup";

import alias from "@rollup/plugin-alias";
import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import cssbundle from "rollup-plugin-css-bundle";
import json from "@rollup/plugin-json";
import resolve from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import typescript from "@rollup/plugin-typescript";
import { terser } from "rollup-plugin-terser";
import svelte from "rollup-plugin-svelte";
import sveltePreprocess from "svelte-preprocess";

const mode = process.env.MODE;
const dev = mode === "dev";
const sourcemap = dev ? "inline" : false;
const legacy = !!process.env.SAPPER_LEGACY_BUILD;

const projectRootDir = path.resolve(__dirname);

const customResolver = resolve({
  extensions: [ ".js", ".ts", ".css" ]
});

/* Aliases */
const aliases = [
  [ "@src", "src" ],
  [ "@core", "src/core" ],
  [ "@components", "src/components" ],
  [ "@svg", "src/components/svg" ],
  [ "@views", "src/views" ],
  [ "@stores", "src/stores" ],
  [ "@services", "src/services" ],
  [ "@static", "src/static" ],
  [ "#db", "src/services/db.ts" ], 
  [ "@util", "src/util" ],
  [ "@styles", "src/styles" ]
];

const createPreprocessors = ({ sourceMap }) => [
	sveltePreprocess({
		sourceMap,
		defaults: {
      script: "typescript",
    }
  })
];

const preprocess = createPreprocessors({ sourceMap: !!sourcemap });

/* const warningIsIgnored = (warning) => warning.message.includes(
	"Use of eval is strongly discouraged, as it poses security risks and may cause issues with minification",
) || warning.message.includes("Circular dependency: node_modules"); */

const onwarn = (warning, onwarn) =>
	(warning.code === 'MISSING_EXPORT' && /'preload'/.test(warning.message)) ||
	(warning.code === 'CIRCULAR_DEPENDENCY' && /[/\\]@sapper[/\\]/.test(warning.message)) ||
	onwarn(warning);

/* const onwarn = (warning, _onwarn) => {
  // https://github.com/rollup/rollup/issues/1518#issuecomment-321875784
  if (warning.code === "THIS_IS_UNDEFINED") return;

  // Workaround for https://github.com/sveltejs/sapper/issues/1266
  return (
    warning.code === "CIRCULAR_DEPENDENCY" &&
    /[/\\]@sapper[/\\]/.test(warning.message)) ||
    warningIsIgnored(warning) ||
    console.warn(warning.toString()
  );
}; */

export default {
	client: {
		input: config.client.input().replace(/\.js$/, ".ts"),
		output: { ...config.client.output(), sourcemap },
		plugins: [
			replace({
        preventAssignment: true,
				"process.browser": true,
				"process.env.NODE_ENV": JSON.stringify(mode),
			}),
			svelte({
        preprocess,
        /* emitCss: true, */
        compilerOptions: {
          dev,
          hydratable: true
        }
      }),
      cssbundle({
        include: "src/styles/*.css",
        output: "static/styles/bundle.css"
      }),
      alias({
        extensions: [ "js", "ts", "json", "css" ],
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
				extensions: [".js", ".mjs", ".html", ".svelte" ],
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
        preventAssignment: true,
				"process.browser": false,
				"process.env.NODE_ENV": JSON.stringify(mode),
				"module.require": "require",
			}),
			svelte({
        preprocess,
        compilerOptions: {
          generate: "ssr",
          hydratable: true,
          dev
        }
      }),
      cssbundle({
        include: "src/styles/*.css",
        output: "static/styles/bundle.css"
      }),
      alias({
        extensions: [ "js", "ts", "json", "css" ],
        entries: aliases.map(([ find, replacement ]) => ({
          find,
          replacement: path.resolve(projectRootDir, replacement)
        })),
        customResolver
      }),
			resolve({
				dedupe: [ "svelte" ],
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
        preventAssignment: true,
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
import * as sapper from "@sapper/app";
import { startClient } from "@stores/locale";

import "@styles/normalize.css";
import "@styles/main.css";
import "@styles/typography.css";
import "@styles/theme-light.css";
import "@styles/theme-dark.css";

startClient();

sapper.start({
	target: <Element>document.querySelector<HTMLDivElement>("#sapper"),
});
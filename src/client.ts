import * as sapper from "@sapper/app";
import { startClient } from "@stores/locale";

startClient();

sapper.start({
	target: document.querySelector("#sapper"),
});
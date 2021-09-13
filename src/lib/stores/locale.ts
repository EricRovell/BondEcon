import { locale as loc } from "svelte-i18n";
import { derived } from "svelte/store";

export const locale = derived(loc, $loc => $loc.slice(0, 2));
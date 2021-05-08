import type { CookieOptions } from "express";

export function getCookie(name: string, cookies?: string) {
  // cookies as string -> running on server
  if (!cookies && typeof window === "undefined") return;

  cookies = cookies ?? document.cookie;

  const kv = cookies
    .split(";")
    .find((part) => part.trim().startsWith(name));

	if (!kv) return;

  const value = kv.split("=")[1];
  
	if (!value) return;

	return decodeURIComponent(value.trim());
}

export function setCookie(name: string, value: string, options: CookieOptions = {}) {
  if (typeof window === "undefined") return;

  let expires = (options.expires instanceof Date)
    ? options.expires.toUTCString()
    : null;

	let updatedCookie = {
    [encodeURIComponent(name)]: encodeURIComponent(value),
    path: "/",
    sameSite: "strict",
    ...(expires && { expires }),
		...options,
	};

	document.cookie = Object.entries(updatedCookie)
		.map((kv) => kv.join("="))
		.join(";");
}

export function deleteCookie(name: string) {
  if (typeof window === "undefined") return;

  const date = new Date();

  // Set it expire in -1 days
  date.setTime(date.getTime() + (-1 * 24 * 60 * 60 * 1000));
  document.cookie = `${name}=;expires=${date.toUTCString()};path=/`;
}
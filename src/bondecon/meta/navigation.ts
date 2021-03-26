import type { NavigationItem } from "../types";

export const navigation: NavigationItem[] = [
  {
    label: "home",
    href: "/"
  },
  {
    label: "blog",
    href: "/blog",
    pattern: /blog\/*/
  },
  {
    label: "cv",
    href: "/cv",
    pattern: /cv\/*/
  },
  {
    label: "about",
    href: "/about",
    pattern: /about\/*/
  }
];
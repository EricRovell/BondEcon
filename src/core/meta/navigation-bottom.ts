import { iconQuill, iconMagicWand, iconHeels, iconMagic } from "@svg";
import type { NavigationItem } from "../types";

export const navigation: NavigationItem[] = [
  {
    label: "blog",
    href: "/blog",
    icon: iconQuill,
    pattern: /blog\/*/
  },
  {
    label: "cv",
    href: "/cv",
    icon: iconHeels,
    pattern: /cv\/*/
  },
  {
    label: "home",
    href: "/home",
    icon: iconMagicWand,
  }
];

export const menuButton = {
  label: "menu",
  icon: iconMagic
};
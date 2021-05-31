import { homePagePath, blogPagePath, cvPagePath } from "./index";
import { iconQuill, iconMagicWand, iconHeels, iconMagic } from "$ui/svg";

export const navigationBottom = [
  {
    label: "blog",
    href: blogPagePath,
    icon: iconQuill,
    pattern: /blog\/*/
  },
  {
    label: "cv",
    href: cvPagePath,
    icon: iconHeels,
    pattern: /cv\/*/
  },
  {
    label: "home",
    href: homePagePath,
    icon: iconMagicWand,
  }
];

export const menuButton = {
  label: "menu",
  icon: iconMagic
};
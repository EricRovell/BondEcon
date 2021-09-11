import {
  iconSocialHSE,
  iconSocialLinkedIn,
  iconSocialTelegram,
  iconSocialInstagram,
  iconSocialFacebook
} from "@components/svg";

import type { SocialItem } from "./types";

export const socials: SocialItem[] = [
  {
    label: "HSE",
    href: "https://www.hse.ru/staff/bondarenko",
    icon: iconSocialHSE
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/ksenia-bondarenko-034649104/",
    icon: iconSocialLinkedIn
  },
  {
    label: "Telegram",
    href: "https://t.me/BondEcon",
    icon: iconSocialTelegram
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/xena_bond",
    icon: iconSocialInstagram
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/Xenabondarenko/",
    icon: iconSocialFacebook
  }
];
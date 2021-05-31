export interface SocialItem {
  label: string;
  href: string;
  icon: string;
}

export interface NavigationItem {
  label: string;
  href: string;
  pattern?: RegExp;
  icon?: string;
  id?: string;
}
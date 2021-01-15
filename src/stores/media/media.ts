import { mediaStore } from "./mediaStore";

// aliases for media queries
type Alias = "small" | "medium" | "dark";

// User defined media queries
const mediaQueries: Record<Alias, string> = {
  small: "(max-width: 640px)",
  medium: "(max-width: 935px)",
  dark: "(prefers-color-scheme: dark)"
};

export const media = mediaStore<Alias>(mediaQueries);
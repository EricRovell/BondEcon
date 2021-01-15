export type Media<T extends string> = Record<T, boolean>;
export type MediaQueries<T extends string> = Record<T, string>;
export type MediaQueryMap<T extends string> = Map<T, MediaQueryList>; 
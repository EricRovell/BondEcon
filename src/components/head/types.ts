export type HeadMetaKeys =
    "author" | "description" | "keywords" | "subject" | "language" |  "revised" |  "abstract" |
    "topic" | "summary" | "classification" | "designer" | "owner" | "identifier-URL" | "pagename" |
    "category" | "robots";

export type HeadMetaKeysOG =
  "title" | "description" | "type" | "image" | "url" | "locale" | "site_name";
  
export type HeadMetaKeysArticle =
  "author" | "published_time" | "modified_time" | "section" | "tag";
  
export type HeadMetaKeysTwitter =
  "card" | "site" | "creator" | "title" | "description" | "image" | "image:alt";
  
export type HeadMeta = {
  title?: string;
  meta?: Partial<Record<HeadMetaKeys, string>>;
  og?: Partial<Record<HeadMetaKeysOG, string>>;
  article?: Partial<Record<HeadMetaKeysArticle, string>>
  twitter?: Partial<Record<HeadMetaKeysTwitter, string>>;
};
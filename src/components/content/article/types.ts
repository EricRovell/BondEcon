export interface ArticleRecord {
  _id: string;
  lang: "en" | "ru" | "fr";
  title: string;
  date: string;
  summary: string;
  author: string;
  category: string;
  translations: string[];
  html: string;
  md: string;
  cover: any;
  tags: string[];
}

export type ArticleRecordCard = Pick<ArticleRecord, "_id" | "title" | "summary" | "cover" | "category" | "date">;
export type ArticleRecordView = Omit<ArticleRecord, "md">;
export interface EcontwittRecord {
  _id: string;
  lang: "en" | "ru" | "fr";
  date: string;
  summary: string;
  html: string;
  md: string;
  tags: string[];
}

export type EcontwittRecordCard = Omit<EcontwittRecord, "md">;
export type EcontwittRecordPreview = Pick<EcontwittRecord, "_id" | "date" | "summary">;

export type EcontwittSearchRecord =
  Pick<EcontwittRecord, "_id" | "summary"> &
  Record<"type", "econtwitt">;
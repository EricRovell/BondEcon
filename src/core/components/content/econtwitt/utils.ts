import { copyToClipboard, webShare } from "@util";
import type { EcontwittRecord } from "./types";

type CopyArguments = Pick<EcontwittRecord, "_id" | "summary" | "tags">;
type ShareArguments = Pick<EcontwittRecord, "_id" | "summary">;

export async function copy({ _id, summary, tags = [] }: CopyArguments) {
  const tagString = tags
    .map(tag => `#${tag.replace(/\s/g, "_")}`)
    .join(" ");

  const data = `${summary}\n\n${tagString}\n\nRead at: BondEcon.com/blogpost/econtwitt-${_id}`;
  
  await copyToClipboard(data);
}

export async function share({ _id, summary }: ShareArguments) {
  await webShare({
    title: "BondEcon Blog: Econtwitts",
    url: `https://www.bondecon.com/blogpost/econtwitt-${_id}`,
    text: summary
  });
}
import { database } from "#db";
import type { SapperRequest, SapperResponse,  } from "@sapper/server";
import type { Document } from "#types";

/**
 * CV document data endpoint. 
 */
export async function get(request: SapperRequest, response: SapperResponse, next: () => void) {
  const { db } = await database();
  const { lang = "ru" } = request.query;

  const data: Document | null = await db?.collection("personal")
    .findOne({ document: "cv", lang }) || null;

  if (data) {
    response.setHeader("Content-Type", "application/json");
    response.end(JSON.stringify(data));
  } else {
    next();
  }
}
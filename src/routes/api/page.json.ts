import { database } from "#db";
import type { SapperRequest, SapperResponse } from "@sapper/server";

/**
 * API route for specific fetching page content.
 */
export async function get(request: SapperRequest, response: SapperResponse, next: () => void) {
  const { db } = await database();
  const { id = null, lang = "en" } = request.query;
  
  if (!id) {
    response.writeHead(404, "Not Found");
    next();
  }

  try {
    const data: string | null = await db?.collection("pages")
      .findOne(
        { id, lang },
        { projection: { _id: 0, date: 0, md: 0 }}
      ) ?? null;

    if (data) {
      response.setHeader("Content-Type", "application/json");
      response.end(JSON.stringify(data));
    } else {
      next();
    }
  } catch (error) {
    console.error(error.message);
    next();
  }
}
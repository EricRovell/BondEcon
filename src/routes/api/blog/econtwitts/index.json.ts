import { database } from "#db";
import { EcontwittQueryBuilder } from "@services/query-builder";
import type { SapperRequest, SapperResponse } from "@sapper/server";
import type { EcontwittRecord } from "@core/components/content";

/**
 * Econtwitts publications API endpoint.
 */
export async function get(request: SapperRequest, response: SapperResponse, next: () => void) {
  const { db } = await database();
  const queryBuilder = new EcontwittQueryBuilder(request.query);
  
  const [ query, options ] = queryBuilder.buildQuery();
  
  try {
    const data: EcontwittRecord[] | null = await db?.collection("blog.econtwitts")
      .find(query, options)
      .toArray() ?? null;

    if (data) {
      response.setHeader("Content-Type", "application/json");
      response.end(JSON.stringify(data));
    } else {
      next();
    }
  } catch (error) {
    console.error(error)
    next();
  } 
}
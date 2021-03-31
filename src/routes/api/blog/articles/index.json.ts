import { database } from "#db";
import { ArticleQueryBuilder } from "@services/query-builder";
import type { SapperRequest, SapperResponse } from "@sapper/server";
import type { ArticleRecordCard } from "@core/components/content";

/**
 * Articles API endpoint.
 */
export async function get(request: SapperRequest, response: SapperResponse, next: () => void) {
  const { db } = await database();
  
  const queryBuilder = new ArticleQueryBuilder({ ...request.query, projection: "card" });
  const [ query, options ] = queryBuilder.buildQuery();
  
  try {
    const data: ArticleRecordCard[] | null = await db?.collection("blog.articles")
      .find(query, options)
      .toArray() ?? null;

    if (data) {
      response.setHeader("Content-Type", "application/json");
      response.end(JSON.stringify(data));
    } else {
      next();
    }
  } catch (error) {
    console.error(error);
    next();
  } 
}
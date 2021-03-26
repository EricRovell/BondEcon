import { database } from "#db";
import { ArticleQueryBuilder } from "@services/query-builder";
import type { SapperRequest, SapperResponse } from "@sapper/server";
import type { ArticleRecord } from "@components/content/article";

/**
 * Article document data endpoint. 
 */
export async function get(request: SapperRequest, response: SapperResponse, next: () => void) {
  const { db, ObjectID } = await database();
  const _id = request.params.id;
  
  if (!ObjectID.isValid(_id)) {
    response.end(JSON.stringify(null));
  }
  
  const queryBuilder = new ArticleQueryBuilder({
    _id: request.params.id,
    projection: "read"
  });  
  
  const [ query, options ] = queryBuilder.buildQuery();

  try {
    const data: ArticleRecord | null = await db?.collection("blog.articles")
      .findOne(query, options);

    if (data) {
      response.setHeader("Content-Type", "application/json");
      response.end(JSON.stringify(data));
    } else {
      response.writeHead(404, "Not Found");
      next();
    } 

  } catch (error) {
    console.error(error.message);
    next();
  }
}
import { connectDB } from "$services/db";
import { buildArticleQuery } from "$services/new-query-builder/article/query";
import type { ArticleRecordCard } from "$components/content";

/**
 * Articles API endpoint.
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function get({ query }) {
  const { db } = await connectDB();
  const [ dbQuery, queryOptions ] = buildArticleQuery(query, { projection: "card" });
  
  try {
    const data: ArticleRecordCard[] | null = await db?.collection("blog.articles")
      .find(dbQuery, queryOptions)
      .toArray() ?? null;

    if (data) {
      return {
        body: JSON.stringify(data)
      };
    }
  } catch (error) {
    console.error(error);
  } 
}
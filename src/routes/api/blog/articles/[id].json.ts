import { connectDB } from "$services/db";
import { buildArticleQuery } from "$services/new-query-builder/article/query";
import type { ArticleRecord } from "$components/content";

/**
 * Article document data endpoint.
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function get({ params }) {
  const { db } = await connectDB();
  
  const [ dbQuery, queryOptions ] = buildArticleQuery(
    { _id: params.id },
    { projection: "read" }
  );

  try {
    const data: ArticleRecord | null = await db?.collection("blog.articles")
      .findOne(dbQuery, queryOptions);

    if (data) {
      return {
        body: JSON.stringify(data)
      };
    }
  } catch (error) {
    console.error(error.message);
  }
}
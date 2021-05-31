import { connectDB } from "$services/db";
import { buildEcontwittQuery } from "$services/new-query-builder/econtwitt/query";
import type { EcontwittRecord } from "$components/content";

/**
 * Econtwitts publications API endpoint.
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function get({ query }) {
  const { db } = await connectDB();
  const [ dbQuery, queryOptions ] = buildEcontwittQuery(query, { limit: 10 });
  
  try {
    const data: EcontwittRecord[] | null = await db?.collection("blog.econtwitts")
      .find(dbQuery, queryOptions)
      .toArray() ?? null;

    if (data) {
      return {
        body: JSON.stringify(data)
      };
    }
  } catch (error) {
    console.error(error)
  }
}
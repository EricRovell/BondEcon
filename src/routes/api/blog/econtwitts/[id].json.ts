import { connectDB } from "$services/db";
import { buildEcontwittQuery } from "$services/new-query-builder/econtwitt/query";
import type { EcontwittRecordCard } from "$components/content";

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function get({ params }) {
  const { db } = await connectDB();
  
  const [ dbQuery, queryOptions ] = buildEcontwittQuery(
    { _id: params.id },
    { projection: "card" }
  );

  try {
    let data: EcontwittRecordCard | null = await db?.collection("blog.econtwitts")
      .findOne(dbQuery, queryOptions) ?? null;

    if (data) {
      return {
        body: JSON.stringify(data)
      };
    }
  } catch (error) {
    console.error(error.message);
  }
}
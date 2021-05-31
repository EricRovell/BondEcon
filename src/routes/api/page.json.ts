import { connectDB } from "$services/db";

/**
 * API route for specific fetching page content.
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function get({ query }) {
  const { db } = await connectDB();
  const id = query.get("id");
  const lang = query.get("lang") ?? "en";

  try {
    const data: string | null = await db?.collection("pages")
      .findOne(
        { id, lang },
        { projection: { _id: 0, date: 0, md: 0 }}
      ) ?? null;

    if (data) {
      return {
        body: JSON.stringify(data)
      };
    }
  } catch (error) {
    console.error(error.message);
  }
}
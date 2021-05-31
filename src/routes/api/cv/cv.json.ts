import { connectDB } from "$services/db";
import type { Document } from "$types";

/**
 * CV document data endpoint.
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function get({ query }) {
  const { db } = await connectDB();
  const lang = query.get("lang") ?? "en";

  try {
    const data: Document | null = await db?.collection("personal")
      .findOne({ document: "cv", lang }) ?? null;

    if (data) {
      return {
        body: JSON.stringify(data)
      };
    }
  } catch (error) {
    console.error(error);
  }
}
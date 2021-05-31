import { connectDB } from "$services/db";
import type { TagCount } from "$types";

/**
 * Frequent Article Tags api endpoint.
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function get({ params }) {
  const { db } = await connectDB();
  const { lang = "en", limit = 10 } = params.query;

  try {
    let data: TagCount[] | null = await db?.collection("blog.articles")
      .aggregate([
        { $match: { lang }},
        { $project: { tags: 1, _id: 0 }},
        { $unwind: "$tags" },
        { $group: { _id: "$tags", count: { $sum: 1 }}},
        { $project: { _id: 0, tag: "$_id", count: 1 }},
        { $sort: { count: -1 }},
        { $limit: Math.min(+limit, 25) }
      ]).toArray() ?? null;

    if (data) {
      return {
        body: {
          data: JSON.stringify(data)
        }
      };
    }
  } catch (error) {
    console.error(error);
  }
}
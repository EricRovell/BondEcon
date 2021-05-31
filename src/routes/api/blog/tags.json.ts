import { connectDB } from "$services/db";
import type { BlogTagsCount } from "$types";

/**
 * Blog publications frequent tags API endpoint.
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function get({ params }) {
  const { db } = await connectDB();
  const { lang = "en", limit = 10 } = params.query;
  
  const tagCountStages = [
    { $match: { lang }},
    { $unwind: "$tags" },
    { $sortByCount: "$tags" },
    { $limit: +limit },
    { $project: { _id: 0, tag: "$_id", count: 1 }}
  ];

  try {
    let data: BlogTagsCount[] | null = await db?.collection("blog.econtwitts")
      .aggregate([
        // econtwitts
        { $facet: {
          "econtwitts": tagCountStages
        }},
        // articles
        { $lookup: {
          from: "blog.articles",
          pipeline: tagCountStages,
          as: "articles"
        }}
      ]).toArray() ?? null;
      
    if (data) {
      return {
        body: {
          data: JSON.stringify(data[0])
        }
      };
    } 
  } catch (error) {
    console.error(error);
  }
}
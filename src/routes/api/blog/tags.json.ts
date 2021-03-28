import { database } from "#db";
import type { SapperRequest, SapperResponse } from "@sapper/server";
import type { BlogTagsCount } from "#types";

/**
 * Blog publications frequent tags API endpoint.
 */
export async function get(request: SapperRequest, response: SapperResponse, next: () => void) {
  const { db } = await database();
  const { lang = "en", limit = 10 } = request.query;
  
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
      response.setHeader("Content-Type", "application/json");  
      response.end(JSON.stringify(data[0]));
    } else {
      next();
    }  
  } catch (error) {
    console.error(error);
    next();
  }
}
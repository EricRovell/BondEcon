import { database } from "#db";
import type { SapperRequest, SapperResponse } from "@sapper/server";
import type { TagCount } from "#types";

export async function get(request: SapperRequest, response: SapperResponse, next: () => void) {
  const { db } = await database();

  const {
    lang = "en",
    limit = 10
  } = request.query;

  try {
    const data: TagCount[] | null = await db?.collection("blog.econtwitts")
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
      response.setHeader("Content-Type", "application/json");
      response.end(JSON.stringify(data));
    } else {
      next();
    }
  } catch (error) {
    console.error(error);
    next();
  }    
}
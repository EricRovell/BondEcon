import { database } from "#db";
import type { SapperRequest, SapperResponse } from "@sapper/server";
import type { SearchResults } from "#types";

/**
 * Blog global search API
 * Queries for blog content using text index.
 */
export async function get(request: SapperRequest, response: SapperResponse, next: () => void) {
  const { db } = await database();
  const query = request.query?.query as string;
  
  try {
    const data: SearchResults[] | null = await db?.collection("blog.econtwitts")
      .aggregate([
        { $lookup: {
          from: "blog.econtwitts",
          pipeline: [
            { $match: { $text: { $search: query } }},
            { $project: { _id: 1, summary: 1 }},
            { $set: { type: "econtwitt" }},
            { $facet: {
              "results": [
                { $limit: 5 }
              ],
              "total": [
                { $count: "count" },
                { $set: { tag: "econtwitts" }},
              ]
            }},
          ],
          as: "econtwitts"
        }},
        { $lookup: {
          from: "blog.articles",
          pipeline: [
            { $match: { $text: { $search: query } }},
            { $project: { _id: 1, summary: 1, title: 1 }},
            { $set: { type: "article" }},
            { $facet: {
              "results": [  
                { $limit: 5 }
              ],
              "total": [
                { $count: "count" },
                { $set: { tag: "articles" }},
              ]
            }},
          ],
          as: "articles"
        }},
        { $unwind: { path: "$econtwitts", preserveNullAndEmptyArrays: true }},
        { $unwind: { path: "$articles", preserveNullAndEmptyArrays: true }},
        { $project: {
          _id: 0,
          results: {
            $setUnion: [
              { $ifNull: [ "$econtwitts.results", [] ] },
              { $ifNull: [ "$articles.results", [] ] }
            ]
          },
          total: {
            $setUnion: [
              { $ifNull: [ "$econtwitts.total", {} ] },
              { $ifNull: [ "$articles.total", {} ] }
            ]
          }
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
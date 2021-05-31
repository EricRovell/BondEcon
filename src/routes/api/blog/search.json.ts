import { connectDB } from "$services/db";
//import type { SearchResults } from "$types";

/**
 * Blog global search API
 * Queries for blog content using text index.
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function get({ query }) {
  const { db } = await connectDB();
  const q = query.get("q");
  
  try {
    const econtwitts = db?.collection("blog.econtwitts")
      .aggregate([
        { $match: { $text: { $search: q } }},
        { $project: { _id: 1, summary: 1 }},
        { $set: { type: "econtwitt" }},
        { $facet: {
          "data": [
            { $limit: 5 }
          ],
          "total": [
            { $count: "count" },
            { $set: { type: "econtwitts" }},
          ]
        }},
        ]
      ).toArray() ?? [];
      
    const articles = db?.collection("blog.articles")
      .aggregate([
        { $match: { $text: { $search: q } }},
        { $project: { _id: 1, summary: 1, title: 1 }},
        { $set: { type: "article" }},
        { $facet: {
          "data": [
            { $limit: 5 }
          ],
          "total": [
            { $count: "count" },
            { $set: { type: "articles" }},
          ]
        }},
        ]
      ).toArray() ?? [];
      
      const responses = await Promise.all([ econtwitts, articles ]);   
      const results = responses.reduce((acc, current) => {
        const { data, total } = current[0];

        return {
          data: [ ...acc.data, ...data ],
          total: [ ...acc.total, ...total ]
        }
      }, { data: [], total: [] });
      
      return {
        body: JSON.stringify(results)
      };
  } catch (error) {
    console.error(error);
  }
}
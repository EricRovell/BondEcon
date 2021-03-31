import { database } from "#db";
import { EcontwittQueryBuilder } from "@services/query-builder";
import type { SapperRequest, SapperResponse } from "@sapper/server";
import type { EcontwittRecordCard } from "@core/components/content";

export async function get(request: SapperRequest, response: SapperResponse, next: () => void) {
  const { db, ObjectID } = await database();
  const _id = request.params.id;
  
  if (!ObjectID.isValid(_id)) {
    response.writeHead(404, "Not Found");
    response.end(JSON.stringify(null));
  }
  
  const queryBuilder = new EcontwittQueryBuilder({
    _id: request.params.id,
    projection: "card"
  });
  
  const [ query, options ] = queryBuilder.buildQuery();

  try {
    let data: EcontwittRecordCard | null = await db?.collection("blog.econtwitts")
      .findOne(query, options) ?? null;

    if (data) {
      response.setHeader("Content-Type", "application/json");
      response.end(JSON.stringify(data));
    } else {
      next();
    }

  } catch (error) {
    console.error(error.message);
    next();
  }
}
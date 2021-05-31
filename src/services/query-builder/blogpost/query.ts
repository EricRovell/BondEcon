import {
  queryID,
  queryLang,
  queryTags,
  queryCursor,
  queryLimit,
  querySort,
  queryDate
} from "../fields";

import { projections } from "./projections";

type QueryParams = URLSearchParams | Record<string, any>;

export function buildArticleQuery(queryParams: QueryParams = {}, queryOptions = {}) {
  // copy URLParams to prevent mutation
  const params = new URLSearchParams(queryParams);
  // merge query options to params
  for (const [ key, value ] of Object.entries(queryOptions)) {
    params.set(key, value as string);
  }
  
  // mongoDB query object
  const query = {};
  // mongoDB query options object
  const options: Record<string, any> = {};
  
  if (params.has("sort")) {
    options["sort"] = querySort(params.get("sort"));
  }
  
  if (params.has("limit")) {
    options["limit"] = queryLimit(params.get("limit"));
  }
  
  if (params.has("_id")) {
    query["_id"] = queryID(params.get("_id"));
  }
  
  if (params.has("lang")) {
    query["lang"] = queryLang(params.get("lang"));
  }
  
  if (params.has("tags")) {
    query["tags"] = queryTags(params.get("tags"));
  }
  
  if (params.has("cursor")) {
    const sort = +params.get("sort") ?? -1;
    query["cursor"] = queryCursor(params.get("projection"), sort);
  }
  
  if (params.has("dateStart") || params.has("dateEnd")) {
    query["date"] = queryDate(
      params.get("dateStart"),
      params.get("dateEnd")
    );
  }
  
  // set projection / default is "card"
  const projection = params.get("projection");
  options["projection"] = projections.hasOwnProperty(projection)
    ? projections[projection]
    : projections["card"];
  
  return [
    query,
    options
  ];
}
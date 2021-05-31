import {
  queryID,
  queryLang,
  queryTags,
  queryCursor,
  queryLimit,
  querySort,
  queryDate,
  textSearch
} from "../fields";

import { projections } from "./projections";

type QueryParams = URLSearchParams | Record<string, any>;

export function buildEcontwittQuery(queryParams: QueryParams = {}, queryOptions = {}) {
  const params = new URLSearchParams(queryParams);
  
  for (const [ key, value ] of Object.entries(queryOptions)) {
    params.set(key, value as string);
  }
  
  const query = {};
  const options: Record<string, any> = {};
  
  // build options  
  if (params.has("sort")) {
    options["sort"] = querySort(params.get("sort"));
  }
  
  if (params.has("limit")) {
    options["limit"] = queryLimit(params.get("limit"));
  }
  
  // build query
  if (params.has("_id")) {
    query["_id"] = queryID(params.get("_id"));
  }
  
  if (params.has("q")) {
    query["$text"] = textSearch(params.get("q"));
  }
  
  if (params.has("lang")) {
    query["lang"] = queryLang(params.get("lang"));
  }
  
  if (params.has("tags")) {
    query["tags"] = queryTags(params.get("tags"));
  }
  
  if (params.has("cursor")) {
    query["_id"] = queryCursor(params.get("cursor"), options?.sort ?? 1);
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
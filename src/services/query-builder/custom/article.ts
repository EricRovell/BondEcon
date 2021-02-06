import { QueryBuilder } from "../queryBuilder";
import type { QueryParams, Options } from "../types";

export type Projection = "summary" | "card";

export class ArticleQueryBuilder extends QueryBuilder<Projection> {
  constructor(queryParams: QueryParams = {}, options: Options<Projection> = {}) {
    super(queryParams, options);
    this.options = { limit: 5, sort: { _id: -1 } };
  }
  
  get projection() {
    return {
      "card": {
        title: 1,
        summary: 1,
        cover: 1,
        category: 1,
        date: 1
      },
      "read": {
        md: 0
      }
    };
  };
  
  get defaultProjection() {
    return "card";
  }
}
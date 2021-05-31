import { QueryBuilder } from "../queryBuilder";
import type { QueryParams, Options } from "../types";

export type Projection = "summary" | "card";

export class EcontwittQueryBuilder extends QueryBuilder<Projection> {
  constructor(queryParams: QueryParams = {}, options: Options<Projection> = {}) {
    super(queryParams, options);
    this.options = { limit: 7, sort: { _id: -1 } };
  }
  
  get projection() {
    return {
      summary: {
        _id: 1,
        lang: 1,
        summary: 1,
        date: 1
      },
      card: {
        md: 0
      }
    };
  };
  
  get defaultProjection(): Projection {
    return "card";
  }
}
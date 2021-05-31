import { ObjectID } from "mongodb";

import type { QueryParams, Options } from "./types";

/**
 * MongoDB find query builder.
 * 
 * Builds the query object for mongodb find method from query parameters object.
 */
export class QueryBuilder<Projection extends string> {
  queryParams: QueryParams;
  query: QueryParams;
  options: Record<string, any>;
  
  constructor(queryParams: QueryParams = {}, options: Options<Projection> = {}) {
    this.queryParams = { ...queryParams, ...options };
    
    this.query = {};
    this.options = { limit: 5, sort: { _id: -1 } };
  }
  
  /**
   * Iterates over query parameters and pass truthy values to the query setter.
   */
  setQuery() {
    for (let [ parameter, value ] of Object.entries(this.queryParams)) {
      if (!value || value === "undefined") continue;
      this.setQueryField(parameter, value);
    }
  }
  
  /**
   * Sets the mongo query search field for predefined parameters.
   */
  setQueryField(fieldname: string, value: any) {
    if (fieldname === "_id") {
      this.query._id = new ObjectID(value);
    }
    
    else if (fieldname === "q") {
      this.query.q = { $search: value };
    }
    
    else if (fieldname === "lang") {
      if (new Set([ "en", "fr", "ru" ]).has(value)) {
        this.query.lang = value;
      }
    }
    
    else if (fieldname === "tags") {
      this.query.tags = { $in: value.split(",") };
    }
    
    else if (fieldname === "tail") {
      const sort = this.queryParams?.sort ?? this.options?.sort?._id;
      const comparison = +sort === -1 ? "$lt" : "$gt";
      this.query._id = { [comparison]: new ObjectID(value) };
    }
    
    else if (fieldname === "dateFrom" || fieldname === "dateTo") {
      if (this.query.date) return;
      
      const { dateFrom, dateTo } = this.queryParams;
      
      const start = dateFrom ? { $gte: new Date(dateFrom) } : {};
      const end = dateTo ? { $lte: new Date(dateTo) } : {};
      
      this.query.date = { ...start, ...end };
    }
    
    // options
    else if (fieldname === "sort") {
      this.options.sort = { _id: (+value == 1) ? 1 : -1 };
    }
    
    else if (fieldname === "limit") {
      this.options.limit = Math.min(+value || 10, 25);
    }
  }
  
  /**
   * Gets the projection.
   */
  get projection(): Partial<Record<Projection, any>> {
    return {};
  }
  
  /**
   * Default projection name if not specified in query paramaters.
   */
  get defaultProjection() {
    return "default";
  }
  
  /**
   * Sets the projection to the mongo query options.
   * If not set inside getter, defaults to "default" option.
   */
  setProjection() {
    const alias: Projection = this.queryParams.projection ?? this.defaultProjection;
    const projection = this.projection[alias];
  
    if (projection) {
      this.options.projection = projection; 
    }
  }
  
  buildQuery() {
    this.setQuery();
    this.setProjection();
    
    return [
      this.query,
      this.options
    ];
  }
}
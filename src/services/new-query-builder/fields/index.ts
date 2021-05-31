import pkg from "mongodb";

const { ObjectID } = pkg;

/**
 * The ObjectID field.
 */
export function queryID(_id: string) {
  return new ObjectID(_id);
}

/**
 * The text search field.
 */
export function textSearch(q: string) {
  return { $search: q };
}

/**
 * The lang/locale field.
 */
export function queryLang(lang: string) {
  if (new Set([ "en", "ru", "fr" ]).has(lang)) {
    return lang;
  }
}

/**
 * The tag list field.
 */
export function queryTags(tags: string) {
  return { $in: tags.split(",") };
}

/**
 * The cursor field
 */
export function queryCursor(cursor: string, sort: -1 | 1 = -1) {
  const comparison = +sort === -1 ? "$lt" : "$gt";
  return { [comparison]: new ObjectID(cursor) };
}


/**
 * Date search
 */
export function queryDate(dateStart: string = null, dateEnd: string = null) {
  const start = dateStart ? { $gte: new Date(dateStart) } : {};
  const end = dateEnd ? { $lte: new Date(dateEnd) } : {};
  
  return { ...start, ...end };
}

export function querySort(sort: number | string, field: string = "_id") {
  return { [field]: +sort };
}

/**
 * The limit field.
 */
export function queryLimit(limit: number | string, min: number = 1, max: number = 10) {
  return Math.min(Math.max(+limit, min), max);
}
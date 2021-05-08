interface FlatObjParams {
  prefix: string;
  flatArrays: boolean;
}

const defaultParams = {
  prefix: "",
  flatArrays: false
};

/**
 * Flattens the object, concatenating keys with dot.
 * 
 * The desired initial prefix can be specified.
 * The array flattening can be stopped.
 */
export function flatObject(obj: Record<string, any>, { prefix = "", flatArrays = true }: FlatObjParams = defaultParams) {
  const flatted: Record<string, string> = {};

  for (const key of Object.keys(obj)) {
    const flatKey = prefix + key;

    // Array check
    if (!flatArrays && Array.isArray(obj[key])) {
      flatted[flatKey] = obj[key];
      continue;
    }

    // Object check
    if (typeof obj[key] === "object" && obj[key] !== null) {
      Object.assign(flatted, flatObject(obj[key], {
        prefix: `${flatKey}.`,
        flatArrays
      }));
    } else {
      flatted[flatKey] = obj[key];
    }
  }

  return flatted;
};

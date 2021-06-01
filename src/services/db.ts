import pkg from "mongodb";

const { MongoClient } = pkg;

const MONGO_URI = import.meta.env.VITE_MONGO_URI;
const MONGO_DB = import.meta.env.VITE_MONGO_DB;

/* if (!MONGO_URI) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env");
}

if (!MONGO_DB) {
  throw new Error("Please define the MONGO_DB environment variable inside .env");
} */

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global["mongo"];

if (!cached) {
  cached = global["mongo"] = { connection: null, promise: null };
}

export async function connectDB() {
  if (cached.connection) {
    return cached.connection
  }

  if (!cached.promise) {
    cached.promise = MongoClient.connect(MONGO_URI, { useUnifiedTopology: true }).then((client) => {
      return {
        client,
        db: client.db(MONGO_DB),
      }
    });
  }
  
  cached.connection = await cached.promise
  return cached.connection;
}
import { Db, MongoClient, ObjectID } from "mongodb";

let client: MongoClient | null = null;
let db: Db | null = null;

export async function database() {
  if (!client) {
    client = await MongoClient.connect(process.env.MONGO_URI as string, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    db = client.db(process.env.MONGO_DB);
  }

  return { db, ObjectID };
}
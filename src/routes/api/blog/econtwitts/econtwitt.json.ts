import { connectDB } from "$services/db";
import marked from "marked";

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function post(request) {
  const { db } = await connectDB();
  const { body } = request;
  
  const post = [ ...body.entries() ].reduce((data, [ key, value ]) => {
    if (key === "md") {
      data["md"] = value;
      data["html"] = marked(value);
    } else if (key === "summary") {
      data["summary"] = value;
    } else if (key === "date") {
      data["date"] = value ? new Date(value) : new Date();
    } else if (key === "lang") {
      data["lang"] = value;
    } else if (key === "tags") {
      if (value) {
        data["tags"] = value.split(",")
      }
    }
    
    return data;
  }, {});
  
  let response = null;
  
  try {
    response = await db?.collection("blog.econtwitts")
      .insertOne(post);
  } catch (error) {
    console.error(`Cannot post: ${error.message}.`);
  }
  
  return {
    body: JSON.stringify(response.insertedId)
  };
}
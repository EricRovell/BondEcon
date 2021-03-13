import dotenv from "dotenv";
import * as sapper from "@sapper/server";
import express, { Express } from "express";
import compression from "compression";
import sirv from "sirv";
import { localeMiddleware } from "@stores/locale";

dotenv.config();

const PORT = process.env.PORT;
const mode = process.env.MODE;
const dev = mode === "dev";

const createSapper = async (): Promise<Express> => {
  const app = express();
  
  app.use(
		compression({ threshold: 0 }),
    sirv("static", { dev }),
    localeMiddleware(),
    sapper.middleware({
      session: (request, response) => ({
        // @ts-ignore
        session: request.session
      })
    }),
	);

	return app;
};

createSapper().then(app => {
	app.listen(PORT, (err?: any): void => {
		if (err) console.log("error", err);
	});
});
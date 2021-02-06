import dotenv from "dotenv";

import * as sapper from "@sapper/server";
import compression from "compression";
import express, { Express, Request as ExpressRequest, Response as ExpressResponse } from "express";
import sirv from "sirv";
import { localeMiddleware } from "@stores/i18n";

dotenv.config();

const PORT = process.env.PORT;
const mode = process.env.MODE;
const dev = mode === "development";

const createSapper = async (): Promise<Express> => {
  const app = express();
  
  app.use(
		compression({ threshold: 0 }),
    sirv("static", { dev }),
    localeMiddleware(),
    sapper.middleware({
      session: (request: ExpressRequest, response: ExpressResponse) => {
        if (request.session) {
          return request.session || {};
        }
      }
    }),
	);

	return app;
};

createSapper().then(app => {
	app.listen(PORT, (err?: any): void => {
		if (err) console.log("error", err);
	});
});
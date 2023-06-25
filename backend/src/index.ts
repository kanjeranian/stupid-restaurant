import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { connect } from "mongoose";
import { Configuration, OpenAIApi } from "openai";
import { IMenu } from "./database";
import { MenuService } from "./menu-service";

dotenv.config();

const openAIApiKey = process.env.OPENAI_API_KEY;
const port = process.env.PORT;
const mongoUri = process.env.MONGO_URI ?? "";
const mongoDbName = process.env.MONGO_DB_NAME;

const menuService = new MenuService(
  new OpenAIApi(new Configuration({ apiKey: openAIApiKey }))
);

function menuToResponse(menu: IMenu) {
  return {
    name: menu.name,
    creativeName: menu.creativeName,
    ingredients: menu.ingredients,
    description: menu.description,
    imageUrl: menu.imageUrl,
  };
}

(async () => {
  await connect(mongoUri, { dbName: mongoDbName });

  const app = express();
  app.use(bodyParser.json());
  app.use(cors());

  app.get("/latest-menu", async (req, res) => {
    const menu = await menuService.getLatestMenu();
    if (menu === null) {
      res.json(null);
      return;
    }

    res.json(menuToResponse(menu));
  });

  app.post("/create-random-menu", async (req, res) => {
    const menu = await menuService.createRandomMenu();

    res.json(menuToResponse(menu));
  });

  app.post("/create-menu", async (req, res) => {
    const ingredients = req.body.ingredients;
    const menu = await menuService.createMenuFromIngredients(ingredients);

    res.json(menuToResponse(menu));
  });

  app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
  });
})();

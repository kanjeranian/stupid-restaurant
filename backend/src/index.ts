import cors from "cors";
import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import { Configuration, OpenAIApi } from "openai";
import { MenuService } from "./menu-service";

dotenv.config();

const openAIApiKey = process.env.OPENAI_API_KEY;
const port = process.env.PORT;

const menuService = new MenuService(
  new OpenAIApi(new Configuration({ apiKey: openAIApiKey }))
);

const app: Express = express();
app.use(cors());

app.post("/create-menu", async (req: Request, res: Response) => {
  const ingredients = menuService.generateIngredients();
  const menu = await menuService.createMenuFromIngredients(ingredients);

  res.json(menu);
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

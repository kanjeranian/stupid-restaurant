import { Schema, model } from "mongoose";

export interface IMenu {
  gptResponse: string;
  name: string;
  creativeName: string;
  ingredients: string[];
  description: string;
  dallEPrompt: string;
  imageUrl: string;
  createdAt: Date;
}

const menuSchema = new Schema<IMenu>({
  gptResponse: String,
  name: String,
  creativeName: String,
  ingredients: [String],
  description: String,
  dallEPrompt: String,
  imageUrl: String,
  createdAt: Date,
});

export const Menu = model("menu", menuSchema);

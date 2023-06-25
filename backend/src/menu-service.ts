import { OpenAIApi } from "openai";
import { IMenu, Menu } from "./database";

interface GPTMenuResponse {
  menuName: string;
  creativeName: string;
  ingredients: string[];
  description: string;
  dallePrompt: string;
}

const menuInfoPromptTemplate = `create a menu with {{ingredients}} provided information in this json format, please provided the creative name of the menu that people would amaze it, split each ingredients in to arrays element, please specify the DALL-E prompt for generating this menu image which looks disturbing, disgusting and horrible as much as possible, the background image should not be white
{
  "menuName": "string",
  "creativeName": "string",
  "ingredients": "string",
  "description": "string",
  "dallePrompt": "string",
}

return me only 1 menu`;

export class MenuService {
  base1Ingredients = [
    "boat noodle",
    "truffle",
    "macaroni",
    "pasta",
    "pancake",
    "tacos",
    "pickle",
    "spagetti",
    "watermelon",
    "ginger",
    "strawberry",
    "Hadyai roast chicken",
    "mom's leftover broccoli",
    "pineapple",
    "nugget",
    "lactos-free almond milk",
  ];
  base2Ingredients = [
    "papaya",
    "lemon grass",
    "curry powder",
    "basil",
    "mango",
    "sweet fish sauce",
    "salmon",
    "matcha",
    "ramen",
    "udon",
    "yentafo",
    "kimchi",
    "gochujung",
    "jajanmyeon",
    "ramyeon",
    "mala",
    "pho",
    "coleslaw",
    "avocado",
    "soup",
    "nachos",
    "takoyaki",
    "toast",
    "sriracha hot sauce",
    "buffalo wings",
    "marijuana",
    "freez sandwich from 7-11",
    "omlette",
    "fried rice",
    "sukiyaki",
    "crepe",
    "burrito",
    "Smartheart gold",
    "Spam ham",
  ];
  memeableIngredients = [
    "sushi",
    "omakase",
    "boba",
    "dumpling",
    "one china duck",
    "pizza",
    "nutella",
    "ketchup",
    "kebab",
    "banana",
    "chihuahua",
    "paracetamol",
    "xanax",
    "colgate whitenning toothpaste",
    "fruitloop",
    "textured veggy protein",
    "cheetos",
    "holy water",
    "mayonnaise",
    "dettol",
    "hotdog",
    "3D-printed lab meat",
    "peanut butter",
    "popsicle",
    "sugar-coat donut",
    "arsenal cookies",
    "microplastic",
    "komodo",
    "M&M",
    "Titanium Dioxide",
    "Evian Mineral Water",
  ];

  constructor(private openAIApi: OpenAIApi) {}

  async getLatestMenu(): Promise<IMenu | null> {
    return Menu.where({}).sort({ createdAt: "desc" }).findOne();
  }

  async createRandomMenu(): Promise<IMenu> {
    const ingredients = this.generateIngredients();
    const menu = await this.createMenuFromIngredients(ingredients);
    return menu;
  }

  private generateIngredients(): string[] {
    const base1Index = Math.floor(Math.random() * this.base1Ingredients.length);
    const base2Index = Math.floor(Math.random() * this.base2Ingredients.length);
    const memeableIndex = Math.floor(
      Math.random() * this.memeableIngredients.length
    );

    const base1 = this.base1Ingredients[base1Index];
    const base2 = this.base2Ingredients[base2Index];
    const memeable = this.memeableIngredients[memeableIndex];

    return [base1, base2, memeable];
  }

  async createMenuFromIngredients(
    requiredIngredients: string[]
  ): Promise<IMenu> {
    try {
      const gptResponse = await this.requestMenuInformation(
        requiredIngredients
      );
      const menuInformation = await this.parseMenuInformation(gptResponse);

      const menu = new Menu({
        gptResponse: gptResponse,
        name: menuInformation.menuName,
        creativeName: menuInformation.creativeName,
        ingredients: menuInformation.ingredients,
        description: menuInformation.description,
        dallEPrompt: menuInformation.dallePrompt,
        imageUrl: await this.createImageFromMenu(menuInformation.dallePrompt),
        createdAt: new Date(),
      });
      await menu.save();

      return menu;
    } catch (e) {
      return (await this.getLatestMenu()) as IMenu;
    }
  }

  private async requestMenuInformation(ingredients: string[]): Promise<string> {
    const prompt = menuInfoPromptTemplate.replace(
      "{{ingredients}}",
      ingredients.join(", ")
    );

    const response = await this.openAIApi.createCompletion({
      model: "text-davinci-003",
      prompt,
      max_tokens: 500,
      temperature: 1,
    });

    return response.data.choices[0].text ?? "{}";
  }

  private async parseMenuInformation(
    promptResponse: string
  ): Promise<GPTMenuResponse> {
    return JSON.parse(
      promptResponse.substring(
        promptResponse.indexOf("{"),
        promptResponse.indexOf("}") + 1
      )
    );
  }

  private async createImageFromMenu(
    dallePrompt: string
  ): Promise<string | undefined> {
    const response = await this.openAIApi.createImage({
      prompt: dallePrompt,
      n: 1,
      size: "512x512",
    });
    return response.data.data[0].url;
  }
}

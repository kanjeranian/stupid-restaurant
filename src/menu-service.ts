import { Configuration, OpenAIApi } from "openai";

interface GPTMenuResponse {
  menuName: string;
  creativeName: string;
  ingredients: string[];
  description: string;
  dallePrompt: string;
}

export interface Menu {
  menuName: string;
  creativeName: string;
  ingredients: string[];
  description: string;
  imageUrl?: string;
}

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

  constructor(private openAIApi: OpenAIApi) { }

  generateIngredients(): string[] {
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

  async createMenuFromIngredients(requiredIngredients: string[]): Promise<Menu> {
    const gptMenuResponse = await this.generateMenuInformation(requiredIngredients);

    return {
      menuName: gptMenuResponse.menuName,
      creativeName: gptMenuResponse.creativeName,
      ingredients: gptMenuResponse.ingredients,
      description: gptMenuResponse.description,
      imageUrl: await this.createImageFromMenu(gptMenuResponse.dallePrompt)
    }
  }

  private async generateMenuInformation(requiredIngredients: string[]): Promise<GPTMenuResponse> {
    const prompt = `create a menu with ${requiredIngredients.join(', ')} provided information in this json format, please provided the creative name of the menu that people would amaze it, split each ingredients in to arrays element, please specify the DALL-E prompt for generating this menu image which looks disturbing, disgusting and horrible as much as possible
    {
      "menuName": "string",
      "creativeName": "string",
      "ingredients": "string",
      "description": "string",
      "dallePrompt": "string",
    }
    
    return me only 1 menu`

    const response = await this.openAIApi.createCompletion({
      model: "text-davinci-003",
      prompt,
      max_tokens: 500,
      temperature: 1,
    });
    const responseText = response.data.choices[0].text ?? '{}'
    console.log('oildel', responseText);

    return JSON.parse(responseText.substring(responseText.indexOf('{'), responseText.indexOf('}') + 1));
  }

  private async createImageFromMenu(dallePrompt: string): Promise<string | undefined> {
    const response = await this.openAIApi.createImage({
      prompt: dallePrompt,
      n: 1,
      size: "512x512",
    });
    return response.data.data[0].url;
  }
}

export const menuService = new MenuService(
  new OpenAIApi(new Configuration({
    apiKey: '',
  }))
);

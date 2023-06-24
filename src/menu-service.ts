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

  generateMenuAlg1(): string {
    const base1Index = Math.floor(Math.random() * this.base1Ingredients.length);
    const base2Index = Math.floor(Math.random() * this.base2Ingredients.length);
    const memeableIndex = Math.floor(
      Math.random() * this.memeableIngredients.length
    );

    const base1 = this.base1Ingredients[base1Index];
    const base2 = this.base2Ingredients[base2Index];
    const memeable = this.memeableIngredients[memeableIndex];

    return `${base1}, ${base2}, ${memeable}`;
  }

  generateMenuAlg2(): string {
    const baseIndex = Math.floor(
      Math.random() *
        (this.base1Ingredients.length + this.base2Ingredients.length)
    );
    const memeableIndex = Math.floor(
      Math.random() * this.memeableIngredients.length
    );

    let base: string;
    if (baseIndex < this.base1Ingredients.length) {
      base = this.base1Ingredients[baseIndex];
    } else {
      base = this.base2Ingredients[baseIndex - this.base1Ingredients.length];
    }
    const memeable = this.memeableIngredients[memeableIndex];

    return `${base}, ${memeable}`;
  }
}

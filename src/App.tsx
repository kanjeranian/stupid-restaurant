import { useState } from "react";
import "./App.css";
import { Menu, menuService, } from "./menu-service";

function App() {
  const [isLoading, setLoading] = useState(false);
  const [menu, setMenu] = useState<Menu>({
    menuName: "Strawberry Curry Omakase",
    creativeName: "Tasteful Treat of Oriental Delight",
    ingredients: [
      "strawberries",
      "lemons",
      "curry powder",
      "vegetable oil",
      "salt"
    ],
    description: "This dish is the perfect blend of sweet and savory. Start your experience with the sweet burst of fresh strawberries, cutting through it all with the zing of lemon and the rich and spicy flavors of curry powder",
    imageUrl: "https://oaidalleapiprodscus.blob.core.windows.net/private/org-eOBx37hJO3dTQO4DuaBja5ko/user-AyQ701q0tmEwbgMovCsflyA3/img-57VJfjC3NZ9pOnTokVJ0Sq87.png?st=2023-06-24T12%3A18%3A26Z&se=2023-06-24T14%3A18%3A26Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-06-24T01%3A53%3A31Z&ske=2023-06-25T01%3A53%3A31Z&sks=b&skv=2021-08-06&sig=dwkSIW%2BjY4Sa2AQM%2B6Vz0DosM2fHpHx2XyiHsXBQbZA%3D"
  });


  const createRandomMenus = async () => {
    setLoading(true);

    try {
      const ingredients = menuService.generateIngredients();
      const menu = await menuService.createMenuFromIngredients(ingredients);
      setMenu(menu);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Stupid Restaurant</h1>
        {isLoading ? <p>Wait a second, we are cooking ...</p> :
          <>
            <p>Menu name: {menu.creativeName}</p>
            <p>Ingredients: {menu.ingredients.join(', ')}</p>
            <p>description: {menu.description}</p>
            {
              menu.imageUrl && <img src={menu.imageUrl} alt="stupidImage" />
            }
          </>
        }

        <button
          onClick={createRandomMenus}
          style={{
            height: 48,
            paddingLeft: 24,
            paddingRight: 24,
            borderRadius: 24,
            fontSize: 18
          }}
        >
          Generate
        </button>
      </header>
    </div>
  );
}

export default App;

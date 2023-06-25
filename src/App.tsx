import { useState } from "react";
import "./App.css";
import { Menu, createRandomMenu } from "./menu-service";

function App() {
  const [isLoading, setLoading] = useState(false);
  const [menu, setMenu] = useState<Menu>({
    menuName: "Horrible Mess",
    creativeName: "Off the Rails Noodle Plate",
    ingredients: ["Boat noodle", "Sriracha hot sauce", "Evian Mineral Water"],
    description:
      "A concoction of ingredients sure to disturb even the bravest of souls.",
    imageUrl:
      "https://oaidalleapiprodscus.blob.core.windows.net/private/org-eOBx37hJO3dTQO4DuaBja5ko/user-AyQ701q0tmEwbgMovCsflyA3/img-R4LEPnqsRGWzwZgoS7oa1t1G.png?st=2023-06-25T03%3A16%3A20Z&se=2023-06-25T05%3A16%3A20Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-06-25T01%3A54%3A49Z&ske=2023-06-26T01%3A54%3A49Z&sks=b&skv=2021-08-06&sig=tIf1sgNjv9RJ4OtfNyYge1fSoykdi341GZDnh4iG1d8%3D",
  });

  const onCreateNewMenu = async () => {
    setLoading(true);

    try {
      const menu = await createRandomMenu();
      setMenu(menu);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ramsey's Aveji Kitchen</h1>
        {isLoading ? (
          <p>Wait a second, we are cooking ...</p>
        ) : (
          <>
            <p>Menu name: {menu.creativeName}</p>
            <p>Ingredients: {menu.ingredients.join(", ")}</p>
            <p>description: {menu.description}</p>
            {menu.imageUrl && <img src={menu.imageUrl} alt="stupidImage" />}
          </>
        )}

        <button
          onClick={onCreateNewMenu}
          style={{
            height: 48,
            paddingLeft: 24,
            paddingRight: 24,
            borderRadius: 24,
            fontSize: 18,
          }}
        >
          Generate
        </button>
      </header>
    </div>
  );
}

export default App;

import { useEffect, useState } from "react";
import "./App.css";
import { Menu, createRandomMenu, getLatestMenu } from "./menu-service";

function App() {
  const [isLoading, setLoading] = useState(false);
  const [menu, setMenu] = useState<Menu>();

  const onCreateNewMenu = async () => {
    setLoading(true);

    try {
      const menu = await createRandomMenu();
      setMenu(menu);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getLatestMenu().then(menu => setMenu(menu));
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ramsey's Aveji Kitchen</h1>
        {isLoading ? (
          <p>Wait a second, we are cooking ...</p>
        ) : (
          menu && (
            <>
              <p>Menu name: {menu.creativeName}</p>
              <p>Ingredients: {menu.ingredients.join(", ")}</p>
              <p>description: {menu.description}</p>
              {menu.imageUrl && <img src={menu.imageUrl} alt="stupidImage" />}
            </>
          )
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

import { useEffect, useState } from "react";
import "./App.css";
import { MenuService } from "./menu-service";

function App() {
  const [state, setState] = useState<string[]>([]);

  const randomMenus = () => {
    const menuService = new MenuService();

    const menus = [];
    for (let i = 0; i < 10; i++) {
      const menu = menuService.generateMenuAlg1();
      menus.push(menu);
    }
    setState(menus);
  };

  useEffect(() => {
    randomMenus();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Stupid restaurant</h1>
        <ul>
          {state.map((menu) => (
            <li>{menu}</li>
          ))}
        </ul>

        <button
        onClick={randomMenus}
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

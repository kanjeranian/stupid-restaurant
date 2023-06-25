import { useState, useEffect } from "react";
import "./App.css";
import { Menu, createRandomMenu, getLatestMenu } from "./menu-service";
import header from './assets/header.png';
import logo from './assets/logo.png';
import tape from './assets/tape.png';
import ordernow from './assets/ordernow.png';
import orderAgain from './assets/orderAgain.png';
import loading from './assets/loading.gif';
import cookingText from './assets/cooking-text.gif';

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

  // useEffect(() => {
  //   getLatestMenu().then(menu => setMenu(menu));
  // }, [])

  return (
    <div className="App">
      <div className="container">
        <img src={header} alt="" className="headerImg" />
        {!isLoading && !menu && <img src={logo} alt="" className="logoImg" />}
        {!isLoading && !menu && <img src={ordernow} alt="" className="orderButton" onClick={onCreateNewMenu} />}
        
        {isLoading && <div className="loading-container">
          <img src={loading} alt="" className="loading" />
          <img src={cookingText} alt="" className="cookingText" />
        </div>}

        {!isLoading && menu && <div className="board-container">
          <div className="board-content">
            <div className="menuName">{menu.creativeName}</div>
            <div className="menuIngredients"> {menu.ingredients.join(" | ")}</div>
            <div className="menuImageContainer">
              <img src={tape} alt="" className="tape" />
              {menu.imageUrl && <img src={menu.imageUrl} alt="menuImage" className="menuImage" />}
            </div>
            <div className="description"> Description </div>
            <div className="menuDescription">{menu.description}</div>

            <img src={orderAgain} alt="" className="orderButton" onClick={onCreateNewMenu} />

          </div>
        </div>}

        

      </div>
    </div>
  );
}

export default App;

import "./App.css";
import FooterComponent from "./components/Footer";
import HeaderComponent from "./components/Header";
import ListRecipes from "./components/ListRecipes";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Recipe from "./components/Recipe";

function App() {
  return (
    <div className="app-container">
      <BrowserRouter>
        <HeaderComponent />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<ListRecipes />} />
            <Route path="/recipes" element={<ListRecipes />} />
            <Route path="/add-recipe" element={<Recipe />} />
            <Route path="/update-recipe/:recipeId" element={<Recipe />} />
          </Routes>
        </main>
        <FooterComponent />
      </BrowserRouter>
    </div>
  );
}

export default App;

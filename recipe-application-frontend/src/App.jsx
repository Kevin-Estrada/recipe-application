import "./App.css";
import FooterComponent from "./components/Footer";
import HeaderComponent from "./components/Header";
import ListRecipes from "./components/Recipe/ListRecipes";
import ListUsers from "./components/User/ListUsers";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Recipe from "./components/Recipe/Recipe";
import User from "./components/User/User";

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
            <Route path="/users" element={<ListUsers />} />
            <Route path="/add-user" element={<User />} />
            <Route path="/update-user/:userId" element={<User />} />
          </Routes>
        </main>
        <FooterComponent />
      </BrowserRouter>
    </div>
  );
}

export default App;

import { useEffect, useState } from "react";
import { deleteRecipe, listRecipes } from "../services/RecipeService";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";

const ListRecipes = () => {
  const [recipes, setRecipes] = useState([]); // State to store recipes
  const [loading, setLoading] = useState(true); // State to track loading
  const [error, setError] = useState(""); // State to track errors
  const navigate = useNavigate();

  // Fetch all recipes when the component loads
  useEffect(() => {
    fetchRecipes();
  }, []);

  // Fetch recipes from the backend
  const fetchRecipes = async () => {
    console.log("Starting fetchRecipes...");
    setLoading(true); // Show loading indicator
    setError(""); // Clear any previous errors
    try {
      const response = await listRecipes(); // Fetch recipes
      console.log("Recipes fetched successfully:", response.data);
      setRecipes(response.data); // Update state with recipes
    } catch (err) {
      console.error("Error fetching recipes:", err);
      setError("Failed to fetch recipes. Please try again later.");
    } finally {
      setLoading(false); // Hide loading indicator
    }
  };

  // Navigate to the "Add Recipe" page
  function addNewRecipe() {
    navigate("/add-recipe");
  }

  // Navigate to the "Update Recipe" page
  function updateRecipe(recipeId) {
    navigate(`/update-recipe/${recipeId}`);
  }

  // Delete a recipe
  const handleDeleteRecipe = async (recipeId) => {
    try {
      await deleteRecipe(recipeId); // Delete recipe from backend
      fetchRecipes(); // Refresh the list of recipes
    } catch (err) {
      console.error("Error deleting recipe:", err);
      setError("Failed to delete the recipe. Please try again.");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center"> List of Recipes</h2>

      {/* Conditionally render the Add Recipe button */}
      {!loading && !error && (
        <button className="btn btn-primary mb-3" onClick={addNewRecipe}>
          Add Recipe
        </button>
      )}

      {/* Error Message */}
      {error && <div className="alert alert-danger">{error}</div>}

      {/* Loading Indicator */}
      {loading ? (
        <Spinner message="Loading recipes..." />
      ) : error ? (
        " "
      ) : recipes.length === 0 ? (
        <p>No recipes found. Add a new recipe to get started!</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Recipe ID</th>
                <th>Title</th>
                <th>Description</th>
                <th>Ingredients</th>
                <th>Instructions</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {recipes.map((recipe) => (
                <tr key={recipe.recipeId}>
                  <td>{recipe.recipeId}</td>
                  <td>{recipe.title}</td>
                  <td>{recipe.description}</td>
                  <td>{recipe.ingredients.join(", ")}</td>
                  <td>{recipe.instructions.join(", ")}</td>
                  <td>
                    <div className="d-flex justify-content-evenly flex-column flex-md-row">
                      <button
                        className="btn btn-info mb-2 mb-md-0 mr-md-2"
                        onClick={() => updateRecipe(recipe.recipeId)}
                        aria-label={`Update recipe ${recipe.title}`}
                      >
                        Update
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDeleteRecipe(recipe.recipeId)}
                        aria-label={`Delete recipe ${recipe.title}`}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ListRecipes;

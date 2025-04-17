import axios from "axios";

// const RECIPE_API_BASE_URL = "http://localhost:8080/api/recipes";
const RECIPE_API_BASE_URL = "http://192.168.1.30:8080/api/recipes";

export const listRecipes = async () => {
  const response = await axios.get(RECIPE_API_BASE_URL);
  console.log("Response from listRecipes:", response.data); // Log the response data
  return response; // Ensure the response is still returned
};

export const addRecipe = async (recipe) => {
  const response = await axios.post(RECIPE_API_BASE_URL, recipe);
  console.log("Response from addRecipe:", response.data); // Log the response data
  return response; // Ensure the response is still returned
};

export const getRecipe = async (recipeId) => {
  const response = await axios.get(RECIPE_API_BASE_URL + "/" + recipeId);
  console.log("Response from getRecipe:", response.data); // Log the response data
  return response; // Ensure the response is still returned
};

export const updateRecipe = async (recipeId, recipe) => {
  const response = await axios.put(
    RECIPE_API_BASE_URL + "/" + recipeId,
    recipe
  );
  console.log("Response from updateRecipe:", response.data); // Log the response data
  return response; // Ensure the response is still returned
};

export const deleteRecipe = async (recipeId) => {
  const response = await axios.delete(RECIPE_API_BASE_URL + "/" + recipeId);
  console.log("Response from deleteRecipe:", response.data); // Log the response data
  return response; // Ensure the response is still returned
};

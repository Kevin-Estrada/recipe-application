import axios from "axios";

const USERS_API_BASE_URL = "http://localhost:8080/users";
// const RECIPE_API_BASE_URL = "http://192.168.1.30:8080/api/recipes";

export const listUsers = async () => {
  const response = await axios.get(USERS_API_BASE_URL);
  console.log("Response from listRecipes:", response.data); // Log the response data
  return response; // Ensure the response is still returned
};

export const addUser = async (user) => {
  const response = await axios.post(USERS_API_BASE_URL, user);
  console.log("Response from addUser:", response.data); // Log the response data
  return response; // Ensure the response is still returned
};

export const getUser = async (userId) => {
  const response = await axios.get(USERS_API_BASE_URL + "/" + userId);
  console.log("Response from getUser:", response.data); // Log the response data
  return response; // Ensure the response is still returned
};

export const updateUser = async (userId, user) => {
  const response = await axios.put(USERS_API_BASE_URL + "/" + userId, user);
  console.log("Response from updateUser:", response.data); // Log the response data
  return response; // Ensure the response is still returned
};

export const deleteUser = async (userId) => {
  const response = await axios.delete(USERS_API_BASE_URL + "/" + userId);
  console.log("Response from deleteUser:", response.data); // Log the response data
  return response; // Ensure the response is still returned
};

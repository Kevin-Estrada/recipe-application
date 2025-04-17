import { useEffect, useState } from "react";
import { addRecipe, getRecipe, updateRecipe } from "../services/RecipeService";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "./Spinner";

const Recipe = () => {
  // State variables for form fields and errors
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState([""]);
  const [instructions, setInstructions] = useState([""]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false); // State for loading
  const [error, setError] = useState(""); // State for error messages

  const { recipeId } = useParams();

  const navigator = useNavigate();

  useEffect(() => {
    if (recipeId) {
      getRecipe(recipeId)
        .then((response) => {
          const recipe = response.data;
          setTitle(recipe.title);
          setDescription(recipe.description);
          setIngredients(recipe.ingredients);
          setInstructions(recipe.instructions);
        })
        .catch((error) => {
          console.error("Error fetching data: ", error);
        });
    }
  }, [recipeId]);

  // Handler for changing simple input fields (title, description)
  const handleChange = (setter, field) => (event) => {
    setter(event.target.value);
    setErrors((prev) => ({
      ...prev,
      [field]: event.target.value ? "" : `${field} is required`,
    }));
  };

  // Handler for changing array input fields (ingredients, instructions)
  const handleArrayChange = (setter, array, field) => (index) => (event) => {
    const updatedArray = [...array];
    updatedArray[index] = event.target.value;
    setter(updatedArray);
    setErrors((prev) => ({
      ...prev,
      [field]: updatedArray.some((item) => item)
        ? ""
        : `At least 1 ${field} is required`,
    }));
  };

  // Handler for adding a new field to an array (ingredients, instructions)
  const handleAddField = (setter, array) => () => {
    setter([...array, ""]);
  };

  // Handler for removing a field from an array (ingredients, instructions)
  const handleRemoveField = (setter, array, index) => () => {
    const updatedArray = array.filter((_, i) => i !== index);
    setter(updatedArray);
  };

  // Handler for form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    const newErrors = {
      title: title ? "" : "Title is required",
      description: description ? "" : "Description is required",
      ingredients: ingredients.some((ingredient) => ingredient)
        ? ""
        : "At least 1 ingredient is required",
      instructions: instructions.some((instruction) => instruction)
        ? ""
        : "At least 1 instruction is required",
    };
    setErrors(newErrors);

    // If no errors, submit the form
    if (Object.values(newErrors).every((error) => !error)) {
      const filteredIngredients = ingredients.filter(
        (ingredient) => ingredient.trim() !== ""
      );
      const filteredInstructions = instructions.filter(
        (instruction) => instruction.trim() !== ""
      );
      const recipe = {
        title,
        description,
        ingredients: filteredIngredients,
        instructions: filteredInstructions,
      };
      setLoading(true); // Set loading to true
      setError(""); // Reset error message

      try {
        if (recipeId) {
          await updateRecipe(recipeId, recipe); // Update the recipe
          console.log("Recipe updated successfully");
        } else {
          await addRecipe(recipe); // Add the recipe
          console.log("Recipe added successfully");
        }
        navigator("/recipes"); // Navigate back to the list of recipes
      } catch (err) {
        console.error("Error submitting recipe:", err);
        setError("Failed to submit the recipe. Please try again.");
      } finally {
        setLoading(false); // Hide the spinner
      }

      // if (recipeId) {
      //   updateRecipe(recipeId, recipe)
      //     .then((response) => {
      //       console.log("Recipe updated successfully: ", response.data);
      //       navigator("/recipes");
      //     })
      //     .catch((error) => {
      //       console.error("Error updating recipe: ", error);
      //     });
      // } else {
      //   addRecipe(recipe)
      //     .then((response) => {
      //       console.log("Recipe added successfully: ", response.data);
      //       navigator("/recipes");
      //     })
      //     .catch((error) => {
      //       console.error("Error adding recipe: ", error);
      //     });
      // }
    }
  };

  function pageTitle() {
    if (recipeId) {
      return <h1 className="text-center">Update Recipe</h1>;
    } else {
      return <h1 className="text-center">Add Recipe</h1>;
    }
  }

  return (
    <div className="container mt-4">
      {pageTitle()}

      {/* Error Message */}
      {error && <div className="alert alert-danger">{error}</div>}

      {/* Loading Spinner */}
      {loading ? (
        <Spinner message="Submitting recipe..." />
      ) : (
        <form onSubmit={handleSubmit}>
          {/* Title Section */}
          <div className="card mb-4">
            <div className="card-header">
              <h5>Title</h5>
            </div>
            <div className="card-body">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  value={title}
                  onChange={handleChange(setTitle, "title")}
                />
                {errors.title && (
                  <div className="text-danger">{errors.title}</div>
                )}
              </div>
            </div>
          </div>

          {/* Description Section */}
          <div className="card mb-4">
            <div className="card-header">
              <h5>Description</h5>
            </div>
            <div className="card-body">
              <div className="form-group">
                <textarea
                  className="form-control"
                  value={description}
                  onChange={handleChange(setDescription, "description")}
                />
                {errors.description && (
                  <div className="text-danger">{errors.description}</div>
                )}
              </div>
            </div>
          </div>

          {/* Ingredients Section */}
          <div className="card mb-4">
            <div className="card-header">
              <h5>Ingredients</h5>
            </div>
            <div className="card-body">
              {ingredients.map((ingredient, index) => (
                <div key={index} className="input-group mb-2">
                  <input
                    type="text"
                    className="form-control"
                    value={ingredient}
                    onChange={handleArrayChange(
                      setIngredients,
                      ingredients,
                      "ingredients"
                    )(index)}
                  />
                  <div className="input-group-append">
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={handleRemoveField(
                        setIngredients,
                        ingredients,
                        index
                      )}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleAddField(setIngredients, ingredients)}
              >
                Add Ingredient
              </button>
              {errors.ingredients && (
                <div className="text-danger">{errors.ingredients}</div>
              )}
            </div>
          </div>

          {/* Instructions Section */}
          <div className="card mb-4">
            <div className="card-header">
              <h5>Instructions</h5>
            </div>
            <div className="card-body">
              {instructions.map((instruction, index) => (
                <div key={index} className="input-group mb-2">
                  <input
                    type="text"
                    className="form-control"
                    value={instruction}
                    onChange={handleArrayChange(
                      setInstructions,
                      instructions,
                      "instructions"
                    )(index)}
                  />
                  <div className="input-group-append">
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={handleRemoveField(
                        setInstructions,
                        instructions,
                        index
                      )}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleAddField(setInstructions, instructions)}
              >
                Add Instruction
              </button>
              {errors.instructions && (
                <div className="text-danger">{errors.instructions}</div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-success">
            Save Recipe
          </button>
        </form>
      )}
    </div>
  );
};

export default Recipe;

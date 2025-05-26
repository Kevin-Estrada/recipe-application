package com.estradakevin.recipeapplicationbackend.mappers;

import com.estradakevin.recipeapplicationbackend.dto.RecipeDto;
import com.estradakevin.recipeapplicationbackend.models.Recipe;

public class RecipeMapper {
    public static RecipeDto mapToRecipeDto(Recipe recipe) {
        RecipeDto recipeDto = new RecipeDto();
        recipeDto.setRecipeId(recipe.getRecipeId());
        recipeDto.setTitle(recipe.getTitle());
        recipeDto.setDescription(recipe.getDescription());
        recipeDto.setIngredients(recipe.getIngredients());
        recipeDto.setInstructions(recipe.getInstructions());
        recipeDto.setUserId(recipe.getUser() != null ? recipe.getUser().getUserId() : null);
        return recipeDto;
    }

    public static Recipe mapToRecipe(RecipeDto recipeDto) {
        Recipe recipe = new Recipe();
        recipe.setRecipeId(recipeDto.getRecipeId());
        recipe.setTitle(recipeDto.getTitle());
        recipe.setDescription(recipeDto.getDescription());
        recipe.setIngredients(recipeDto.getIngredients());
        recipe.setInstructions(recipeDto.getInstructions());
        return recipe;
    }
}

package com.estradakevin.recipeapplicationbackend.mappers;

import com.estradakevin.recipeapplicationbackend.dto.RecipeDto;
import com.estradakevin.recipeapplicationbackend.models.Recipe;

public class RecipeMapper {
    public static RecipeDto mapToRecipeDto(Recipe recipe) {
        return new RecipeDto(recipe.getRecipeId(), recipe.getTitle(), recipe.getDescription(), recipe.getIngredients(),
                recipe.getInstructions());
    }

    public static Recipe mapToRecipe(RecipeDto recipeDto) {
        return new Recipe(recipeDto.getRecipeId(), recipeDto.getTitle(), recipeDto.getDescription(),
                recipeDto.getIngredients(), recipeDto.getInstructions());
    }
}

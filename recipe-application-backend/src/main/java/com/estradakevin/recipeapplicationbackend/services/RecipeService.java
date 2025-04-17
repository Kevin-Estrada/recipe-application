package com.estradakevin.recipeapplicationbackend.services;

import java.util.List;

import com.estradakevin.recipeapplicationbackend.dto.RecipeDto;

public interface RecipeService {
    RecipeDto createRecipe(RecipeDto recipeDto);

    RecipeDto getRecipeById(Long recipeId);

    List<RecipeDto> getAllRecipes();

    RecipeDto updateRecipe(Long recipeId, RecipeDto recipeDto);

    void deleteRecipe(Long recipeId);
}

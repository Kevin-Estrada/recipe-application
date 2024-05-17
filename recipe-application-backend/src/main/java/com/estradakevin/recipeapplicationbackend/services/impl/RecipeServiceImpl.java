package com.estradakevin.recipeapplicationbackend.services.impl;

import org.springframework.stereotype.Service;

import com.estradakevin.recipeapplicationbackend.dto.RecipeDto;
import com.estradakevin.recipeapplicationbackend.mappers.RecipeMapper;
import com.estradakevin.recipeapplicationbackend.models.Recipe;
import com.estradakevin.recipeapplicationbackend.repositories.RecipeRepository;
import com.estradakevin.recipeapplicationbackend.services.RecipeService;

@Service
public class RecipeServiceImpl implements RecipeService {

    private RecipeRepository recipeRepository;

    public RecipeServiceImpl(RecipeRepository recipeRepository) {
        this.recipeRepository = recipeRepository;
    }

    @Override
    public RecipeDto createRecipe(RecipeDto recipeDto) {
        Recipe recipe = RecipeMapper.mapToRecipe(recipeDto);
        Recipe savedRecipe = recipeRepository.save(recipe);
        return RecipeMapper.mapToRecipeDto(savedRecipe);
    }

}

package com.estradakevin.recipeapplicationbackend.services.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.estradakevin.recipeapplicationbackend.dto.RecipeDto;
import com.estradakevin.recipeapplicationbackend.exception.ResourceNotFoundException;
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

    @Override
    public RecipeDto getRecipeById(Long recipeId) {
        Recipe recipe = recipeRepository.findById(recipeId)
                .orElseThrow(() -> new ResourceNotFoundException("Recipe not found with id: " + recipeId));
        return RecipeMapper.mapToRecipeDto(recipe);
    }

    @Override
    public List<RecipeDto> getAllRecipes() {
        List<Recipe> recipes = recipeRepository.findAll();
        return recipes.stream().map(recipe -> RecipeMapper.mapToRecipeDto(recipe)).collect(Collectors.toList());
    }

    @Override
    public RecipeDto updateRecipe(Long recipeId, RecipeDto recipeDto) {
        Recipe recipe = recipeRepository.findById(recipeId)
                .orElseThrow(() -> new ResourceNotFoundException("Recipe not found with id: " + recipeId));
        recipe.setTitle(recipeDto.getTitle());
        recipe.setDescription(recipeDto.getDescription());
        recipe.setIngredients(recipeDto.getIngredients());
        recipe.setInstructions(recipeDto.getInstructions());
        Recipe updatedRecipe = recipeRepository.save(recipe);
        return RecipeMapper.mapToRecipeDto(updatedRecipe);
    }

    @Override
    public void deleteRecipe(Long recipeId) {
        Recipe recipe = recipeRepository.findById(recipeId)
                .orElseThrow(() -> new ResourceNotFoundException("Recipe not found with id: " + recipeId));
        recipeRepository.delete(recipe);
    }

}

package com.estradakevin.recipeapplicationbackend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.estradakevin.recipeapplicationbackend.models.Recipe;

public interface RecipeRepository extends JpaRepository<Recipe, Long> {

}

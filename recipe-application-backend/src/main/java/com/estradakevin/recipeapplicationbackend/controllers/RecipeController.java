package com.estradakevin.recipeapplicationbackend.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.estradakevin.recipeapplicationbackend.dto.RecipeDto;
import com.estradakevin.recipeapplicationbackend.services.RecipeService;
import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/recipes")
public class RecipeController {
    private RecipeService recipeService;

    public RecipeController(RecipeService recipeService) {
        this.recipeService = recipeService;
    }

    @PostMapping
    public ResponseEntity<RecipeDto> createRecipe(@RequestBody RecipeDto recipeDto) {
        System.out.println(recipeDto.toString());
        RecipeDto createdRecipe = recipeService.createRecipe(recipeDto);
        return new ResponseEntity<>(createdRecipe, HttpStatus.CREATED);
    }

    @GetMapping("/{recipeId}")
    public ResponseEntity<RecipeDto> getRecipeById(@PathVariable Long recipeId) {
        RecipeDto recipeDto = recipeService.getRecipeById(recipeId);
        return new ResponseEntity<>(recipeDto, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<RecipeDto>> getAllRecipes() {
        return new ResponseEntity<>(recipeService.getAllRecipes(), HttpStatus.OK);
    }

    @PutMapping("/{recipeId}")
    public ResponseEntity<RecipeDto> updateRecipe(@PathVariable Long recipeId, @RequestBody RecipeDto recipeDto) {
        RecipeDto updatedRecipe = recipeService.updateRecipe(recipeId, recipeDto);
        return new ResponseEntity<>(updatedRecipe, HttpStatus.OK);
    }

    @DeleteMapping("/{recipeId}")
    public ResponseEntity<String> deleteRecipe(@PathVariable Long recipeId) {
        recipeService.deleteRecipe(recipeId);
        return new ResponseEntity<>("Recipe Successfully Deleted.", HttpStatus.OK);
    }
}

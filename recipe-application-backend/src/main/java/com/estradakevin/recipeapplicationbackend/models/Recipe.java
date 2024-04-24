package com.estradakevin.recipeapplicationbackend.models;

public class Recipe {
    private Long recipeId;
    private String description;

    public Recipe() {
    }

    public Recipe(Long recipeId, String description) {
        this.recipeId = recipeId;
        this.description = description;
    }

    public Long getRecipeId() {
        return recipeId;
    }

    public void setRecipeId(Long recipeId) {
        this.recipeId = recipeId;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

}

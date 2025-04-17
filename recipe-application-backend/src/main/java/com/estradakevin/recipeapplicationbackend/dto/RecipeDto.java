package com.estradakevin.recipeapplicationbackend.dto;

import java.util.List;

public class RecipeDto {
    private Long recipeId;
    private String title;
    private String description;
    private List<String> ingredients;
    private List<String> instructions;

    public RecipeDto() {
    }

    public RecipeDto(Long recipeId, String title, String description, List<String> ingredients,
            List<String> instructions) {
        this.recipeId = recipeId;
        this.title = title;
        this.description = description;
        this.ingredients = ingredients;
        this.instructions = instructions;
    }

    public Long getRecipeId() {
        return recipeId;
    }

    public void setRecipeId(Long recipeId) {
        this.recipeId = recipeId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<String> getIngredients() {
        return ingredients;
    }

    public void setIngredients(List<String> ingredients) {
        this.ingredients = ingredients;
    }

    public List<String> getInstructions() {
        return instructions;
    }

    public void setInstructions(List<String> instructions) {
        this.instructions = instructions;
    }

    @Override
    public String toString() {
        return "RecipeDto{" +
                "recipeId=" + recipeId +
                ", title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", ingredients=" + ingredients +
                ", instructions='" + instructions + '\'' +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (!(o instanceof RecipeDto))
            return false;

        RecipeDto recipeDto = (RecipeDto) o;

        if (getRecipeId() != null ? !getRecipeId().equals(recipeDto.getRecipeId()) : recipeDto.getRecipeId() != null)
            return false;
        if (getTitle() != null ? !getTitle().equals(recipeDto.getTitle()) : recipeDto.getTitle() != null)
            return false;
        if (getDescription() != null ? !getDescription().equals(recipeDto.getDescription())
                : recipeDto.getDescription() != null)
            return false;
        if (getIngredients() != null ? !getIngredients().equals(recipeDto.getIngredients())
                : recipeDto.getIngredients() != null)
            return false;
        return getInstructions() != null ? getInstructions().equals(recipeDto.getInstructions())
                : recipeDto.getInstructions() == null;
    }

    @Override
    public int hashCode() {
        int result = getRecipeId() != null ? getRecipeId().hashCode() : 0;
        result = 31 * result + (getTitle() != null ? getTitle().hashCode() : 0);
        result = 31 * result + (getDescription() != null ? getDescription().hashCode() : 0);
        result = 31 * result + (getIngredients() != null ? getIngredients().hashCode() : 0);
        result = 31 * result + (getInstructions() != null ? getInstructions().hashCode() : 0);
        return result;
    }

}

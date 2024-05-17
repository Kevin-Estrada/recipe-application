package com.estradakevin.recipeapplicationbackend.models;

import java.util.List;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;

@Entity
@Table(name = "recipes")
public class Recipe {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long recipeId;

    // @NotBlank(message = "Title is mandatory")
    private String title;

    // @NotBlank(message = "Description is mandatory")
    private String description;

    @ElementCollection
    private List<String> ingredients;

    @Lob
    private String instructions;

    public Recipe() {
    }

    public Recipe(Long recipeId, String title, String description, List<String> ingredients, String instrutions) {
        this.recipeId = recipeId;
        this.title = title;
        this.description = description;
        this.ingredients = ingredients;
        this.instructions = instrutions;
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

    public String getInstructions() {
        return instructions;
    }

    public void setInstructions(String instructions) {
        this.instructions = instructions;
    }

    @Override
    public String toString() {
        return "Recipe [description=" + description + ", ingredients=" + ingredients + ", instructions=" + instructions
                + ", recipeId=" + recipeId + ", title=" + title + "]";
    }
}

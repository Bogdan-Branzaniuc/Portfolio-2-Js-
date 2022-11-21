'use strict'
const filters = {
    searchText: ''
}

const functions = new RecipesFunctions(filters)

document.querySelector('#search-text').addEventListener('input', (e) => {
    filters.searchText = e.target.value
    functions.renderRecipesBlock()
})

const savedRecipes = functions.getSavedRecipes()
//functions.deleteRecipe()

functions.renderRecipesBlock()

const addButton = document.querySelector('#add-recipe')
const recipeId = uuidv4()

addButton.addEventListener('click', (e) => {
    functions.addRecipe(recipeId)
    functions.renderRecipesBlock()
})
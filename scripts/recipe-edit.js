const recipeId = location.hash.substring(1)
const recipeFunctions = new Recipe(recipeId)

const recipes = recipeFunctions.recipes
const recipe = recipeFunctions.recipe

recipeFunctions.renderRecipeElement()

const titleListener = document.querySelector('#title-element')
titleListener.addEventListener('input', (e) => {
    recipeFunctions.modifyRecipeTitle(e)
    recipeFunctions.saveRecipes(recipes)
})

const addStepButton = document.querySelector('#add-step')
addStepButton.addEventListener('submit', (e) => {
    document.location.reload()
    const trimmedInput = e.target.elements[0].value.trim()
    recipeFunctions.addRecipeStep(trimmedInput)
    recipeFunctions.saveRecipes(recipes)
    recipeFunctions.renderRecipeElement()
})

recipeFunctions.modifyRecipeIngredients()

const addIngredientButton = document.querySelector('#add-ingredient')
addIngredientButton.addEventListener('submit', (e) => {
    document.location.reload()
    const trimmedInput = e.target.elements[0].value.trim()
    console.log(trimmedInput)
    recipeFunctions.addRecipeIngredient(trimmedInput)
    recipeFunctions.saveRecipes(recipes)
    recipeFunctions.renderRecipeElement()
})

recipeFunctions.modifyRecipeSteps()

const deleteRecipeButton = document.querySelector('#delete-recipe-button')
deleteRecipeButton.addEventListener('click', (e) => {
    const recipeIndex = recipeFunctions.recipes.findIndex((recipeId) => recipeId.id === recipeFunctions.recipe.id)
    recipeIndex > -1 ? recipeFunctions.recipes.splice(recipeIndex, 1) : ''
    recipeFunctions.saveRecipes(recipes)
    location.assign('index.html')
})

console.log(recipe)
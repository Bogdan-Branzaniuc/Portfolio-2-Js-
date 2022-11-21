//require.main.require('/recipe-functions.js')

class Recipe extends RecipesFunctions {
    constructor(recipeId, filters) {
        super(filters)
        this.recipe = this.recipes.find((recipe) => recipe.id === recipeId)
    }
    modifyRecipeTitle(e) {
        this.recipe.title = e.target.value
        this.saveRecipes(this.recipes)
    }
    modifyRecipeSteps() {
        this.recipe.steps.forEach((step) => {
            const stepTextArea = document.querySelector(`#step-text-${step.id}`)
            stepTextArea.addEventListener('input', (e) => {
                step.text = e.target.value
                this.saveRecipes(this.recipes)
            })
            const removeStep = document.querySelector(`#step-del-button-${step.id}`)
            removeStep.addEventListener('click', (e) => {
                document.location.reload()
                const stepIndex = this.recipe.steps.findIndex((stepId) => stepId.id === step.id)
                if (stepIndex > -1) {
                    this.recipe.steps.splice(stepIndex, 1)
                    this.saveRecipes(this.recipes)
                    this.renderRecipeElement()
                }
            })
        })
    }
    addRecipeStep(step = 'undefined step') {
        this.recipe.steps.push({
            text: step,
            id: uuidv4()
        })
    }
    addRecipeIngredient(ingredient = 'undefined ingredient') {
        this.recipe.ingredients.push({
            text: ingredient,
            id: uuidv4()
        })
    }
    modifyRecipeIngredients() {
        this.recipe.ingredients.forEach((ingredient) => {
            const ingredientTextArea = document.querySelector(`#ingredient-text-${ingredient.id}`)
            ingredientTextArea.addEventListener('input', (e) => {
                console.log(e.target.value)
                ingredient.text = e.target.value
                this.saveRecipes(this.recipes)
            })
            const removeIngredient = document.querySelector(`#ingredient-del-button-${ingredient.id}`)
            removeIngredient.addEventListener('click', (e) => {
                document.location.reload()
                const ingredientIndex = this.recipe.ingredients.findIndex((ingredientId) => ingredientId.id === ingredient.id)

                if (ingredientIndex > -1) {
                    this.recipe.ingredients.splice(ingredientIndex, 1)
                    this.saveRecipes(this.recipes)
                    this.renderRecipeElement()
                }
                console.log('index', ingredientIndex)
                console.log(ingredient.id)
            })
        })
    }
    renderRecipeElement() {
        const recipeEl = document.querySelector('#recipe-details')
        recipeEl.innerHTML = ''
        recipeEl.appendChild(this.generateRecipeDom())
    }

    generateRecipeDom() {
        const recipe = document.createElement('div')
        recipe.appendChild(this.generateTitleElement())
        recipe.appendChild(this.generateStepsBlock())
        recipe.appendChild(this.generateIngredientsBlock())
        recipe.appendChild(this.generateDeleteRecipeButton())
        return recipe
    }

    generateTitleElement() {
        const titleEl = document.createElement('div')
        const titleText = document.createElement('input')
        titleText.setAttribute('value', this.recipe.title)
        titleText.setAttribute('id', 'title-element')
        titleEl.setAttribute('class', 'bg-warning h3')
        titleEl.appendChild(this.generateLabel('Recipe:'))
        titleEl.appendChild(titleText)
        return titleEl
    }

    generateStepsBlock() {
        let stepCount = 0

        const stepEl = document.createElement('div')
        const blockTitle = document.createElement('p')
        blockTitle.innerHTML = 'Recipe Steps'
        const addStep = document.createElement('form')
        const InputStep = document.createElement('input')
        InputStep.value = ''
        InputStep.setAttribute('placeholder', 'next step...')
        const addStepButton = document.createElement('button')
        addStepButton.textContent = 'new step'


        stepEl.appendChild(blockTitle)
        addStep.appendChild(InputStep)
        addStep.appendChild(addStepButton)

        if (this.recipe.steps.length > 0) {
            this.recipe.steps.forEach((step) => {
                step.id = stepCount
                const eachStep = document.createElement('div')
                eachStep.setAttribute('id', "recipe-step")

                const stepText = document.createElement('textarea')
                stepText.setAttribute('id', `step-text-${step.id}`)
                stepText.setAttribute('class', `d-inline-block align-middle`)
                stepText.value = step.text

                const stepNumber = document.createElement('p')

                stepNumber.textContent = `Step ${step.id + 1}:`
                stepNumber.setAttribute('class', `d-inline-block align-middle h4`)

                const deleteStepButton = document.createElement('button')
                deleteStepButton.textContent = 'remove'
                deleteStepButton.setAttribute('id', `step-del-button-${step.id}`)

                eachStep.appendChild(stepNumber)
                eachStep.appendChild(stepText)
                eachStep.appendChild(deleteStepButton)
                stepEl.appendChild(eachStep)
                stepEl.setAttribute('class', 'border p- w-50 container')
                stepEl.setAttribute('style', 'margin-bottom:50px; margin-top:50px;')

                eachStep.setAttribute('class', 'mb-2')
                stepCount += 1
            })
        }

        addStep.setAttribute('id', 'add-step')
        addStep.setAttribute('style', 'margin-bottom:20px; margin-top:20px;')

        stepEl.appendChild(addStep)

        return stepEl
    }
    generateIngredientsBlock() {
        let ingredientCount = 0

        const ingredientEl = document.createElement('div')
        const blockTitle = document.createElement('p')
        blockTitle.innerHTML = 'Ingredients'
        const addIngredient = document.createElement('form')
        const inputIngredient = document.createElement('input')
        inputIngredient.value = ''
        inputIngredient.setAttribute('placeholder', 'next ingredient...')

        const addIngredientButton = document.createElement('button')
        addIngredientButton.textContent = 'add ingredient'
        addIngredient.appendChild(inputIngredient)
        addIngredient.appendChild(addIngredientButton)
        ingredientEl.appendChild(blockTitle)

        if (this.recipe.ingredients.length > 0) {
            this.recipe.ingredients.forEach((ingredient) => {
                ingredient.id = ingredientCount

                const eachIngredient = document.createElement('div')
                eachIngredient.setAttribute('id', "recipe-ingredient")

                const ingredientText = document.createElement('input')
                ingredientText.setAttribute('id', `ingredient-text-${ingredient.id}`)
                ingredientText.setAttribute('class', `d-inline-block align-middle`)
                ingredientText.value = ingredient.text

                const ingredientNumber = document.createElement('h3')
                ingredientNumber.textContent = `ingredient ${ingredient.id + 1}:`
                ingredientNumber.setAttribute('class', `d-inline-block align-middle h4`)

                const deleteIngredientButton = document.createElement('button')
                deleteIngredientButton.textContent = 'remove'
                deleteIngredientButton.setAttribute('id', `ingredient-del-button-${ingredient.id}`)
                deleteIngredientButton.setAttribute('class', 'btn btn-outline-dark  btn-sm')
                const ingredientCheckbox = document.createElement('input')
                ingredientCheckbox.setAttribute('type', 'checkBox')
                eachIngredient.appendChild(ingredientCheckbox)
                eachIngredient.appendChild(ingredientNumber)


                eachIngredient.appendChild(ingredientText)
                eachIngredient.appendChild(deleteIngredientButton)
                ingredientEl.appendChild(eachIngredient)
                ingredientEl.setAttribute('class', 'border p- w-50 container')
                ingredientEl.setAttribute('style', 'margin-bottom:50px; margin-top:50px;')

                ingredientCount += 1
            })
        }
        addIngredient.setAttribute('id', 'add-ingredient')
        addIngredient.setAttribute('style', 'margin-bottom:20px; margin-top:20px;')

        ingredientEl.appendChild(addIngredient)

        return ingredientEl
    }
    generateDeleteRecipeButton() {
        const deleteRecipeButton = document.createElement('button')
        deleteRecipeButton.setAttribute('id', 'delete-recipe-button')
        deleteRecipeButton.setAttribute('class', 'btn btn-outline-danger btn-block')
        deleteRecipeButton.textContent = 'Delete this recipe'
        return deleteRecipeButton
    }
    generateLabel(text) {
        const labelEl = document.createElement('label')
        labelEl.textContent = text
        return labelEl
    }
}
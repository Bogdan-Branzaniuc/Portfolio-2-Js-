class RecipesFunctions {
    constructor(filters) {
        this.recipes = this.getSavedRecipes()
        this.filters = filters
    }

    getSavedRecipes() {
        const recipeJSON = localStorage.getItem('recipes')
        try {
            return recipeJSON ? JSON.parse(recipeJSON) : []
        } catch (e) {
            return []
        }
    }
    saveRecipes(recipes) {
        localStorage.setItem('recipes', JSON.stringify(recipes))
    }

    generateRecipeDom(recipe) {
        const newRecipe = document.createElement('a') // a setAttribute location
        const textEl = document.createElement('p')

        newRecipe.setAttribute('href', `recipe.html#${recipe.id}`)
        newRecipe.setAttribute('class', `text-dark text-decoration-none`)

        if (recipe.title.length > 0) {
            textEl.textContent = recipe.title
        } else {
            textEl.textContent = 'Unnamed recipe'
            recipe.title = 'Unnamed recipe'
        }
        newRecipe.appendChild(textEl)

        return newRecipe
    }

    renderRecipesBlock() {
        const recipeBlockEl = document.querySelector('#recipe-block')

        const filteredRecipes = this.recipes.filter((recipe) => {
            return recipe.title.toLowerCase().includes(this.filters.searchText.toLowerCase())
        })

        recipeBlockEl.innerHTML = ''

        if (filteredRecipes.length > 0) {
            filteredRecipes.forEach((recipe) => {
                const recipeEl = this.generateRecipeDom(recipe)
                recipeBlockEl.appendChild(recipeEl)
            })
        }
    }

    addRecipe(id) {
        const newRecipe = {
            title: 'unnamed recipe',
            id: id,
            steps: [],
            ingredients: []
        }
        this.recipes.push(newRecipe)
        this.saveRecipes(this.recipes)
        location.assign(`recipe.html#${id}`)
    }

    deleteRecipe() {
        this.recipes = []
        this.saveRecipes(this.recipes)
    }
}
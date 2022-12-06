import {
    wordsApiCall,
} from "./api-requests.js"
import {
    GameState
} from "./game-state.js";

let gameState
let currentDifficultyType = 1
let currentHintType = 'none'
const startGame = async () => {

    // ************* commented out for api-usage-limit reasons ***********************
    // let puzzleWord = await wordsApiCall()
    // while (!puzzleWord.results) {
    //     puzzleWord = await wordsApiCall()
    // }
    let puzzleWord = {
        word: 'hangman is awesome',
        results: [{
            definition: 'greateness',
            partOfSpeech: 'exclamation'
        }]
    }
    gameState = new GameState(puzzleWord)
    gameState.settings.difficulty = currentDifficultyType
    gameState.settings.hint = currentHintType
    gameState.renderGame()
}

startGame()

//eventlisteners - word hint change
//               - dificulty change
//               - letter input
//               - reset word


//word hint change
document.querySelector('#hint-type-form').addEventListener('change', (e) => {
    gameState.settings.hint = e.target.id
    currentHintType = e.target.id
    console.log(e.target.id)
    gameState.renderHint()
})
//word difficulty change
document.querySelector('#difficulty-level-form').addEventListener('change', (e) => {
    console.log(e.target.id)
    if (confirm('This action will reset the game with a new word')) {
        startGame()
        currentDifficultyType = e.target.id[e.target.id.length - 1]
        gameState.settings.difficulty = e.target.id[e.target.id.length - 1]
        if (gameState.settings.difficulty == 1) {
            gameState.settings.lives = 6
        } else if (gameState.settings.difficulty == 2) {
            gameState.settings.lives = 4
        } else if (gameState.settings.difficulty == 3)(
            gameState.settings.lives = 2
        )
        gameState.renderGame()
    } else {
        //e.target.checked = false
        document.getElementById(`word-difficulty-option-${currentDifficultyType}`).checked = true
    }

})

//letter input
document.querySelector('#guess-letter-form').addEventListener('submit', (e) => {
    const letterTry = document.querySelector('#input-letter-word-puzzle').value
    document.querySelector('#input-letter-word-puzzle').value = ''
    gameState.makeGuess(letterTry)
})

// reset game with a new word
document.querySelector('#reset-word-button').addEventListener('click', startGame)
import {
    wordsApiCall,
} from "./api-requests.js"
import {
    GameState
} from "./game-state.js";

let gameState
let currentDifficultyType
let currentHintType = 'none'

//helps with not rendering the game twice when changing difficulty-level with no tryes submitted yet
let dfficultyLevelChangeLock
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

    dfficultyLevelChangeLock = false
    gameState = new GameState(puzzleWord)
    gameState.settings.difficulty = currentDifficultyType
    document.getElementById('hint-option-none').checked = true
    gameState.startGame = startGame // we can start a new game within the objects methods if needed
    gameState.renderGame()
}

startGame()
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
    let sellectedDifficulty = e.target.id[e.target.id.length - 1]
    if (!dfficultyLevelChangeLock) {
        gameState.setDifficulty(sellectedDifficulty)
        currentDifficultyType = sellectedDifficulty
        gameState.renderGame()
    } else {
        if (confirm('This action will reset the game with a new word')) {
            currentDifficultyType = sellectedDifficulty
            gameState.setDifficulty(sellectedDifficulty)

            gameState.gameOverTimeRestrictions(false)
            gameState.startGame()

        } else {
            document.getElementById(`word-difficulty-option-${currentDifficultyType}`).checked = true
        }
    }
})

//letter input
document.querySelector('#guess-letter-form').addEventListener('submit', (e) => {
    const letterTry = document.querySelector('#input-letter-word-puzzle').value.toLowerCase()
    document.querySelector('#input-letter-word-puzzle').value = ''
    gameState.makeGuess(letterTry)
    dfficultyLevelChangeLock = true
})

// reset game with a new word
document.querySelector('#reset-word-button').addEventListener('click', () => {
    if (confirm('This action will reset the game with a new word')) {
        gameState.gameOverTimeRestrictions(false)
        gameState.startGame()
    }
})

//// restart game after Game Over event is built in the gameState.renderGameOver()
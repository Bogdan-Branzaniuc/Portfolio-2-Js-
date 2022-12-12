import {
    wordsApiCall,
} from "./api-requests.js"
import {
    GameState
} from "./game-state.js";

import {
    HangmanLottieAnimation
} from "./hangman-lottie-animation.js"

let gameState
const hangmanAnimationObject = new HangmanLottieAnimation()
let currentDifficultyType
let currentHintType = 'none'

let dfficultyLevelChangeLock //helps with not rendering the game twice when changing difficulty-level with no tryes submitted yet
const startGame = async () => {
    let puzzleWord = await wordsApiCall()
    while (!puzzleWord.results) {
        puzzleWord = await wordsApiCall()
    }

    dfficultyLevelChangeLock = false
    gameState = new GameState(puzzleWord, hangmanAnimationObject)
    gameState.settings.difficulty = currentDifficultyType
    document.getElementById('hint-option-none').checked = true
    gameState.startGame = startGame // we can start a new game within the objects methods if needed
    gameState.renderGame()
    gameState.renderKeypadCollors()
    gameState.letterTrialMessageElement.textContent = 'Make a guess'
    gameState.letterTrialDivElement.innerHTML = ''
    gameState.letterTrialDivElement.style.backgroundColor = 'grey'
}

startGame()
//word hint change
document.querySelector('#hint-type-form').addEventListener('change', (e) => {
    gameState.settings.hint = e.target.id
    currentHintType = e.target.id
    gameState.renderHint()
})

//word difficulty change
document.querySelector('#difficulty-level-form').addEventListener('change', (e) => {
    let sellectedDifficulty = e.target.id[e.target.id.length - 1]
    //setTimeout()
    if (!dfficultyLevelChangeLock) {
        gameState.setDifficulty(sellectedDifficulty)
        currentDifficultyType = sellectedDifficulty
        gameState.renderLives()
        hangmanAnimationObject.renderHangmanAnimation(gameState.settings.lives)
    } else {
        if (confirm('This action will reset the game with a new word')) {
            currentDifficultyType = sellectedDifficulty
            gameState.setDifficulty(sellectedDifficulty)
            gameState.successTimeRestrictions(false)
            gameState.gameOverTimeRestrictions(false)
            gameState.startGame()

        } else {
            document.getElementById(`word-difficulty-option-${currentDifficultyType}`).checked = true
        }
    }
})

// reset game with a new word
document.querySelector('#reset-word-button').addEventListener('click', () => {
    if (confirm('This action will reset the game with a new word')) {
        gameState.gameOverTimeRestrictions(false)
        gameState.successTimeRestrictions(false)
        gameState.startGame()
    }
})

document.querySelectorAll('.hangman-keypad-buttons').forEach((button) => {
    button.addEventListener('click', (e) => {
        if (gameState.isGameOverFlag || gameState.isGameWonFlag) {
            return
        }
        const letterTry = e.target.textContent
        gameState.makeGuess(letterTry)
        dfficultyLevelChangeLock = true
    })
})

//// restart game after Game Over event is built in the gameState.renderGameOver()
//// start a new game after Game Won event is built in the gameState.renderGameWon()'
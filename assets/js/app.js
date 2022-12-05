import {
    wordsApiCall,
} from "./api-requests.js"
import {
    GameState
} from "./game-state.js";

let gameState

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
    gameState.renderGame()
})
//word difficulty change
document.querySelector('#difficulty-level-form').addEventListener('change', (e) => {
    console.log(e.target.id)
    console.log(gameState)
    //gameState.renderGame()
})
//letter input

document.querySelector('#guess-letter-form').addEventListener('submit', (e) => {
    console.log(e.target.id)
    const letterTry = document.querySelector('#input-letter-word-puzzle').value
    document.querySelector('#input-letter-word-puzzle').value = ''
    gameState.makeGuess(letterTry)


    //verify the guessed letter
    //gameState.renderGame()
})

// reset word
document.querySelector('#reset-word-button').addEventListener('click', startGame)
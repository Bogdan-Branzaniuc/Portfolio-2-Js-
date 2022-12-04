import {
    wordsApiCall,
} from "./api-requests.js"
import {
    GameState
} from "./game-state.js";



//eventlisteners - word count change
//               - dificulty change
//               - letter input


const startGame = async () => {
    const puzzleWord = await wordsApiCall()
    let settings = [true, 1, 6]
    let gameState = new GameState(settings, puzzleWord)
    gameState.renderGame('hangman-word-game-section')

    //////  gameState methods
    //gameState.stopGame
    //gameState.updateWord
    //gameState.updateSettings
    //gameState.updateHangPlatform
    //gameState.failedGame
    //gameState.apiReachedLimitForToday
}

startGame()





// object gameState
// methods: - render word
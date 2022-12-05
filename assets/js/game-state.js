class GameState {
    constructor(puzzleWordData) {
        this.puzzleWordData = puzzleWordData
        this.puzzleWord = puzzleWordData.word
        this.settings = {
            difficulty: 1,
            hint: 'none',
            lives: 6
        }
        this.lettersGuessed = []
        this.lettersTried = []
    }
    //////  gameState methods
    //gameState.renderWord
    //gameState.renderHint
    //gameState.renderHangPlatform
    //gameState.updateWord
    //gameState.updateSettings
    //gameState.updateHangPlatform
    //gameState.failedGame
    //gameState.stopGame
    //gameState.apiReachedLimitForToday

    // renderGame will use all the other render-functions to render the game
    renderGame() {
        this.renderWordPuzzle()
        this.renderHint()
    }

    renderWordPuzzle() {
        const wordJunctionElement = document.getElementById('word')
        wordJunctionElement.innerHTML = ''

        // split puzzle, foreach letter create span
        for (let i = 0; i < this.puzzleWord.length; i++) {

            //if a space, create a space
            const puzzleElement = document.createElement('span')
            if (this.puzzleWord[i] == ' ') {
                puzzleElement.setAttribute('id', "puzzle-span-space")
            } else {
                puzzleElement.setAttribute('id', "puzzle-span-letter")
            }
            puzzleElement.setAttribute('class', "puzzle-span-element")

            if (this.lettersGuessed.includes(this.puzzleWord[i])) {
                puzzleElement.textContent = this.puzzleWord[i]
                puzzleElement.setAttribute('id', "puzzle-span-space")
            } else {
                puzzleElement.textContent = ''
            }
            wordJunctionElement.appendChild(puzzleElement)
        }
        //define ID for wordPuzzle for future animations
    }

    renderHint() {
        //word Hint
        const wordJunctionElement = document.getElementById('hint')
        wordJunctionElement.innerHTML = ''

        const puzzleWordHint = document.createElement('p')
        puzzleWordHint.textContent = "Hint: "

        if (this.settings.hint == 'hint-option-part-of-speech') {
            puzzleWordHint.textContent += this.puzzleWordData.results[0].partOfSpeech
        } else if (this.settings.hint == 'hint-option-definition') {
            puzzleWordHint.textContent += this.puzzleWordData.results[0].definition
        } else {
            puzzleWordHint.textContent = "you still have " + this.settings.lives + " lives"
        }

        wordJunctionElement.appendChild(puzzleWordHint)
        //define ID for hint for future animations
    }
    makeGuess(letterTry) {

        if (this.lettersTried.includes(letterTry)) {
            console.log('this has allready been guessed')

        } else if (this.puzzleWord.includes(letterTry)) {
            this.lettersTried.push(letterTry)

        } else if (!this.puzzleWord.includes(letterTry) && !this.lettersTried.includes(letterTry)) {
            this.settings.lives--
            console.log('oops')
        }
        this.lettersTried.push(letterTry)
        this.lettersTried = [...new Set(this.lettersTried)];
        console.log(this.lettersTried)
        this.renderGame()
    }
}


export {
    GameState
}
class GameState {
    constructor([isComposedWord, dificultyLevel, lives], puzzleWord) {
        this.isComposedWord = isComposedWord
        this.dificultyLevel = dificultyLevel
        this.lives = lives
        this.puzzleWord = puzzleWord
    }

    generatePuzzleWord() {

    }
    // renderGame will use all the other render-functions to render the game
    renderGame(wordJunctionElementId) {
        this.renderWordPuzzle(wordJunctionElementId)
        this.renderHint(wordJunctionElementId)
    }

    renderWordPuzzle(parentId) {
        const wordJunctionElement = document.getElementById(parentId)
        // split puzzle, foreach letter create span
        for (let i = 0; i < this.puzzleWord.word.length; i++) {
            const puzzleElement = document.createElement('span')
            puzzleElement.textContent = ' '
            wordJunctionElement.appendChild(puzzleElement)
        }
        //define ID for wordPuzzle for future animations
    }

    renderHint(parentId) {
        //word Hint
        const wordJunctionElement = document.getElementById(parentId)
        const puzzleWordHint = document.createElement('p')
        if (this.puzzleWord.results) {
            puzzleWordHint.textContent = this.puzzleWord.results[0].definition
        } else if (this.puzzleWord.syllables) {
            puzzleWordHint.textContent = `this word has ${this.puzzleWord.syllables.count} syllabels`
        }
        wordJunctionElement.appendChild(puzzleWordHint)
        //define ID for hint for future animations
    }

    renderHangPlatform() {

    }
}


export {
    GameState
}
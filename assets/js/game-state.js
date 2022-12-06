class GameState {
    constructor(puzzleWordData) {
        this.puzzleWordData = puzzleWordData
        this.puzzleWord = puzzleWordData.word
        this.settings = {
            difficulty: 1,
            hint: 'none',
            lives: 6
        }
        this.hint = {
            partOfSpeech: this.puzzleWordData.results[0].partOfSpeech,
            definition: this.puzzleWordData.results[0].definition,
            none: "only use hints when needed"
        }
        this.lettersGuessed = []
        this.lettersTried = []
        this.letterTry = ''
    }
    //////  gameState methods
    //gameState.renderWord //done
    //gameState.renderHint //done
    //gameState.guessWord // done
    //gameState.renderGame // good
    //gameState.renderHangPlatform 
    //gameState.apiReachedLimitForToday
    //gameState.failedGame
    //gameState.stopGame
    //gameState.renderLives



    // renderGame will use all the other render-functions to render the current state of the gameState object
    renderGame() {
        this.renderWordPuzzle()
        this.renderHint()
        this.renderLetters()
        this.renderLives()
    }

    renderWordPuzzle() {
        const wordJunctionWordElement = document.getElementById('word')
        wordJunctionWordElement.innerHTML = ''
        // split puzzle, foreach letter create span
        for (let i = 0; i < this.puzzleWord.length; i++) {
            const puzzleElement = document.createElement('span')

            //if a space, create a space
            if (this.puzzleWord[i] == ' ') {
                puzzleElement.setAttribute('class', "puzzle-span-space")
            } else {
                puzzleElement.setAttribute('class', "puzzle-span-letter")
                puzzleElement.setAttribute('id', "puzzle-span-letter-" + this.puzzleWord[i] + i)
            }
            wordJunctionWordElement.appendChild(puzzleElement)
        }
    }

    renderHint() {
        //word Hint
        const wordJunctionHintElement = document.getElementById('hint')
        wordJunctionHintElement.innerHTML = ''

        const puzzleWordHint = document.createElement('p')
        puzzleWordHint.textContent = "Hint: "

        if (this.settings.hint == 'hint-option-part-of-speech') {
            puzzleWordHint.textContent += this.hint.partOfSpeech
        } else if (this.settings.hint == 'hint-option-definition') {
            puzzleWordHint.textContent += this.hint.definition
        } else {
            puzzleWordHint.textContent = this.hint.none
        }
        wordJunctionHintElement.appendChild(puzzleWordHint)
        //define ID for hint for future animations
    }

    renderLetters() {
        for (let i = 0; i < this.puzzleWord.length; i++) {
            if (this.puzzleWord[i] != ' ') {
                const letterElement = document.querySelector(`#puzzle-span-letter-${this.puzzleWord[i]+i}`)
                if (this.lettersGuessed.includes(this.puzzleWord[i])) {
                    letterElement.textContent = this.puzzleWord[i]
                    letterElement.setAttribute('class', "puzzle-span-space")
                }
                if (this.letterTry === this.puzzleWord[i])
                    gsap.from(letterElement, {
                        opacity: 0
                    });
            }
        }
    }
    renderLives() {
        const wordJunctionLivesElement = document.getElementById('lives')
        wordJunctionLivesElement.innerHTML = ''
        const livesParagraph = document.createElement('p')
        livesParagraph.textContent = this.settings.lives
        wordJunctionLivesElement.appendChild(livesParagraph)
    }

    makeGuess(letterTry) {
        if (this.lettersTried.includes(letterTry)) {
            console.log('this has allready been guessed')
        } else if (this.puzzleWord.includes(letterTry)) {
            this.lettersGuessed.push(letterTry)
        } else if (!this.puzzleWord.includes(letterTry) && !this.lettersTried.includes(letterTry)) {
            if (this.settings.lives > 0) {
                this.settings.lives--
                console.log('oops')
            } else {
                console.log('game-over')
            }
        }
        this.lettersTried.push(letterTry)
        this.lettersTried = [...new Set(this.lettersTried)];
        this.lettersGuessed = [...new Set(this.lettersGuessed)]
        this.letterTry = letterTry
        console.log(this.lettersTried + " from makeGuess function")
        console.log(this.settings.lives)

        this.renderLetters()
        this.renderLives()
    }


}
export {
    GameState
}
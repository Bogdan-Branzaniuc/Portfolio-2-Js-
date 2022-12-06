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
        // nice experiment !!!
        gsap.from('#word', {
            x: 50,
            duration: 1,
            opacity: 0
        });
        //define ID for wordPuzzle for future animations
    }

    renderHint() {
        //word Hint
        const wordJunctionElement = document.getElementById('hint')
        wordJunctionElement.innerHTML = ''

        const puzzleWordHint = document.createElement('p')
        puzzleWordHint.textContent = "Hint: "

        if (this.settings.hint == 'hint-option-part-of-speech') {
            puzzleWordHint.textContent += this.hint.partOfSpeech
        } else if (this.settings.hint == 'hint-option-definition') {
            puzzleWordHint.textContent += this.hint.definition
        } else {
            puzzleWordHint.textContent = this.hint.none
        }
        wordJunctionElement.appendChild(puzzleWordHint)
        //define ID for hint for future animations
    }
    makeGuess(letterTry) {
        if (this.lettersTried.includes(letterTry)) {
            console.log('this has allready been guessed')
        } else if (this.puzzleWord.includes(letterTry)) {
            this.lettersGuessed.push(letterTry)
        } else if (!this.puzzleWord.includes(letterTry) && !this.lettersTried.includes(letterTry)) {
            if (this.settings.lives > 0) {
                this.settings.lives--
            }
            console.log('oops')
        }
        this.lettersTried.push(letterTry)
        this.lettersTried = [...new Set(this.lettersTried)];
        console.log(this.lettersTried)
        console.log(this.settings.lives)
        this.renderGame()
    }
}
export {
    GameState
}
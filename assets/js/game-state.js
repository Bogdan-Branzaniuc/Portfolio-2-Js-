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

        //DOM ELEMENTS
        this.gameDiv = document.getElementById('game-container')
        this.wordJunctionWordElement = document.getElementById('word')
        this.wordJunctionHintElement = document.getElementById('hint')
        this.wordJunctionLivesElement = document.getElementById('lives')
        this.settingsEllement = document.getElementById('settings-block')
        this.gameOverEllement = document.getElementById('game-over-message-div')
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
        this.wordJunctionWordElement.innerHTML = ''
        // split puzzle and foreach letter create span element
        for (let i = 0; i < this.puzzleWord.length; i++) {
            const puzzleElement = document.createElement('span')
            //if a space, create a space
            if (this.puzzleWord[i] == ' ') {
                puzzleElement.setAttribute('class', "puzzle-span-space")
            } else {
                puzzleElement.setAttribute('class', "puzzle-span-letter")
                puzzleElement.setAttribute('id', "puzzle-span-letter-" + this.puzzleWord[i] + i)
            }
            this.wordJunctionWordElement.appendChild(puzzleElement)
        }
    }

    renderHint() {
        //word Hint
        this.wordJunctionHintElement.innerHTML = ''
        const puzzleWordHint = document.createElement('p')
        puzzleWordHint.textContent = "Hint: "

        if (this.settings.hint == 'hint-option-part-of-speech') {
            puzzleWordHint.textContent += this.hint.partOfSpeech
        } else if (this.settings.hint == 'hint-option-definition') {
            puzzleWordHint.textContent += this.hint.definition
        } else {
            puzzleWordHint.textContent = this.hint.none
        }
        this.wordJunctionHintElement.appendChild(puzzleWordHint)
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
        this.wordJunctionLivesElement.innerHTML = ''
        const livesParagraph = document.createElement('p')
        livesParagraph.textContent = this.settings.lives
        this.wordJunctionLivesElement.appendChild(livesParagraph)
    }

    renderDifficulty(sellectedDifficulty) {
        this.settings.difficulty = sellectedDifficulty
        if (this.settings.difficulty == 1) {
            this.settings.lives = 6
        } else if (this.settings.difficulty == 2) {
            this.settings.lives = 4
        } else if (this.settings.difficulty == 3)(
            this.settings.lives = 2
        )
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
            }
        }
        this.lettersTried.push(letterTry)
        this.lettersTried = [...new Set(this.lettersTried)];
        this.lettersGuessed = [...new Set(this.lettersGuessed)]
        this.letterTry = letterTry
        this.renderLetters()
        this.renderLives()
        this.isGameOver()
    }

    isGameOver() {
        if (this.settings.lives <= 0) {
            console.log('Game Over')
            // gsap.to([this.wordJunctionWordElement, this.wordJunctionHintElement, this.wordJunctionLivesElement], {
            //     x: 50,
            //     duration: 1,
            //     opacity: 0
            // });
            // gsap.to(this.settingsEllement, {
            //     x: -50,
            //     duration: 1,
            //     opacity: 0
            // })
            this.renderGameOverMessage()
        }

    }
    renderGameOverMessage() {
        const gameOverMessage1 = document.createElement('p')
        const gameOverMessage2 = document.createElement('p')
        const restartButton = document.createElement('button')
        restartButton.setAttribute('id', 'restart-game-button')
        restartButton.setAttribute('class', 'btn btn-danger')
        restartButton.textContent = "Restart Game"
        gameOverMessage1.textContent = 'Game Over'
        gameOverMessage2.textContent = 'The puzzle was "' + this.puzzleWord + '"'
        this.gameOverEllement.appendChild(gameOverMessage1)
        this.gameOverEllement.appendChild(gameOverMessage2)
        this.gameOverEllement.appendChild(restartButton)


        this.gameDiv.appendChild(this.gameOverEllement)

        gsap.from(this.gameDiv, {
            y: -50,
            duration: 1,
            opacity: 0
        })
    }

}
export {
    GameState
}
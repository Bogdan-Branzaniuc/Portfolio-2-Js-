class HangmanLottieAnimation {
    constructor() {
        this.currentFrame = 0
        this.targetFrame
        this.anim = this.buildLottieAnimation()
    }

    buildLottieAnimation = () => {
        let animationContainer = document.querySelector('#hangman-lottie-container')
        animationContainer.innerHTML = ''
        this.anim = lottie.loadAnimation({
            container: animationContainer,
            renderer: 'svg',
            loop: false,
            autoplay: false,
            path: "/assets/lottie-json-files/hangman.json",
        });
        this.anim.goToAndStop(151, true)
        this.anim.setSpeed(2.3)
        return this.anim
    }

    renderHangmanAnimation(lives) {
        if (lives === 6) {
            this.targetFrame = 0.001
            this.anim.playSegments([this.currentFrame, this.targetFrame])
            this.currentFrame = this.targetFrame
        } else if (lives === 5) {
            this.targetFrame = 55
            this.anim.playSegments([this.currentFrame, this.targetFrame])
            this.currentFrame = this.targetFrame
        } else if (lives === 4) {
            this.targetFrame = 75
            this.anim.playSegments([this.currentFrame, this.targetFrame])
            this.currentFrame = this.targetFrame
        } else if (lives === 3) {
            this.targetFrame = 90
            this.anim.playSegments([this.currentFrame, this.targetFrame])
            this.currentFrame = this.targetFrame
        } else if (lives === 2) {
            this.targetFrame = 109
            this.anim.playSegments([this.currentFrame, this.targetFrame])
            this.currentFrame = this.targetFrame
        } else if (lives === 1) {
            this.targetFrame = 120
            this.anim.playSegments([this.currentFrame, this.targetFrame])
            this.currentFrame = this.targetFrame
        } else if (lives === 0) {
            this.targetFrame = 150
            this.anim.playSegments([this.currentFrame, this.targetFrame])
            this.currentFrame = this.targetFrame
        }

    }
}

export {
    HangmanLottieAnimation
}
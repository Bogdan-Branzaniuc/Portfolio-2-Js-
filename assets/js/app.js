class Api {
    callApi(gameState) {
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '4d7b70ad50msh55d950e4991579cp104b01jsn94aca4159235',
                'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com'
            }
        };

        fetch('https://wordsapiv1.p.rapidapi.com/words/?random=true', options)
            .then(response => response.json())
            .then(response => console.log(response))
            .then(response => {
                gameState.renderWord(response)
            })
            .catch(err => console.error(err))
    }
}
let api = new Api

api.callApi(gameState)





// object gameState
// methods: - render word
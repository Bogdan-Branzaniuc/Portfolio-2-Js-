const wordsApiCall = async () => {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '4d7b70ad50msh55d950e4991579cp104b01jsn94aca4159235',
            'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com'
        }
    };
    const response = await fetch('https://wordsapiv1.p.rapidapi.com/words/?random=true', options)

    if (response.status === 200) {
        const data = await response.json()
        return data
    } else {
        throw new Error('Unable to fetch data')
    }
}

export {
    wordsApiCall,
}
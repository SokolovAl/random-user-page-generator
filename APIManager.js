class APIManager {
    constructor() {
        this.data = {};
    }

    fetchRandomUsers() {
        const randomUserApiUrl = "https://randomuser.me/api/?results=";
        const numberOfUsers = 7;
        const completeRandomUserApiUrl = randomUserApiUrl + numberOfUsers;

        return fetch(completeRandomUserApiUrl)
            .then(response => response.json())
            .then(data => {
                const users = data.results;
                const mainUser = users.shift();
                this.data.mainUser = {
                    firstName: mainUser.name.first,
                    lastName: mainUser.name.last,
                    city: mainUser.location.city,
                    state: mainUser.location.state,
                    picture: mainUser.picture.large
                };
                this.data.friends = users.map(user => ({
                    firstName: user.name.first,
                    lastName: user.name.last
                }));
            });
    }

    fetchKanyeQuote() {
        const kanyeQuoteApiUrl = "https://api.kanye.rest/";

        return fetch(kanyeQuoteApiUrl)
            .then(response => response.json())
            .then(data => {
                this.data.quote = data.quote;
            });
    }

    fetchRandomPokemon() {
        const getRandomPokemonId = () => Math.floor(Math.random() * 949) + 1;
        const randomPokemonId = getRandomPokemonId();
        const pokemonApiUrl = "https://pokeapi.co/api/v2/pokemon/";
        const completePokemonApiUrl = pokemonApiUrl + randomPokemonId;

        return fetch(completePokemonApiUrl)
            .then(response => response.json())
            .then(data => {
                this.data.pokemon = {
                    name: data.name,
                    picture: data.sprites.front_default
                };
            });
    }

    fetchMeatText() {
        const baconIpsumUrl = "https://baconipsum.com/api/?type=all-meat";

        return fetch(baconIpsumUrl)
            .then(response => response.json())
            .then(data => {
                this.data.meatText = data[0];
            });
    }

    fetchPokemonGif(pokemonName) {
        const MY_API_KEY = "R8EOFm8OBCRU1y5UxTd9NMlpTqM977LG"
        const gifApiUrl = `https://api.giphy.com/v1/gifs/search?q=${pokemonName}&api_key=${MY_API_KEY}&output=embed`;

        return fetch(gifApiUrl)
            .then(response => response.json())
            .then(data => {
                const gifData = data.data[0];
                if (gifData) {
                    this.data.pokemonGif = gifData.embed_url;
                } else {
                    this.data.pokemonGif = null;
                    alert("Sorry we can't find pokemon gif")
                }
            })
            .catch(error => {
                console.error("Error fetching Pokemon gif:", error);
                this.data.pokemonGif = null;
            });
    }

    fetchPokemonType(pokemonName) {
        const pokemonApiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonName}/`;

        return fetch(pokemonApiUrl)
            .then(response => response.json())
            .then(data => {
                const firstType = data.types[0].type.name;
                this.data.pokemonType = firstType;
            });
    }
}

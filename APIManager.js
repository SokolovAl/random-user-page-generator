class APIManager {
    constructor() {
        this.data = {};
    }

    fetchRandomUsers() {
        const randomUserApiUrl = "https://randomuser.me/api/?results=7";

        return fetch(randomUserApiUrl)
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
}

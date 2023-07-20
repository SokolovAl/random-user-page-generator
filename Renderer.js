class Renderer {
    constructor() {
        this.userSource = $("#user-template").html();
        this.userTemplate = Handlebars.compile(this.userSource);
        this.pokemonSource = $("#pokemon-template").html();
        this.pokemonTemplate = Handlebars.compile(this.pokemonSource);
        this.friendsSource = $("#friends-template").html();
        this.friendsTemplate = Handlebars.compile(this.friendsSource);
    }

    renderUser(user) {
        const userContainer = $(".user-container");
        const userHtml = this.userTemplate(user);
        userContainer.html(userHtml);
    }

    renderFriends(friends) {
        const friendsContainer = $(".friends-container");
        const friendsHtml = this.friendsTemplate({ friends });
        friendsContainer.html(friendsHtml);
    }

    renderQuote(quote) {
        const quoteContainer = $(".quote-container");
        quoteContainer.empty();
        quoteContainer.append("<p>Favorite quote:</p>");

        const quoteText = `${quote}`;
        quoteContainer.append(quoteText);
        quoteContainer.addClass("quote-container");
    }

    renderPokemon(pokemon) {
        const pokemonContainer = $(".pokemon-container");
        const pokemonHtml = this.pokemonTemplate(pokemon);
        pokemonContainer.html(pokemonHtml);
    }

    renderMeat(meat) {
        const meatContainer = $(".meat-container");
        meatContainer.empty();
        meatContainer.append("<h4>About me</h4>");

        const meatText = `${meat}`;
        meatContainer.append(meatText);
        meatContainer.addClass("meat-text");
    }

    renderPokemonGif(gifUrl) {
        const pokemonGifContainer = $(".pokemon-gif-container");
        const iframeHtml = `<iframe src="${gifUrl}" width="100" height="100"></iframe>`;
        pokemonGifContainer.html(iframeHtml);
    }
}

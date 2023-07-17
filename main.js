const apiManager = new APIManager();
const renderer = new Renderer();

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

function updateUserData() {
    Promise.all([
        apiManager.fetchRandomUsers(),
        apiManager.fetchKanyeQuote(),
        apiManager.fetchRandomPokemon(),
        apiManager.fetchMeatText()
    ])
           .then(() => {
               apiManager.data.pokemon.name = capitalize(apiManager.data.pokemon.name);

               renderer.renderUser(apiManager.data.mainUser);
               renderer.renderFriends(apiManager.data.friends);
               renderer.renderQuote(apiManager.data.quote);
               renderer.renderPokemon(apiManager.data.pokemon);
               renderer.renderMeat(apiManager.data.meatText);
           })
           .catch(error => console.error("Error", error));
}

function saveUserPageData() {
    const userPageData = {
        mainUser: apiManager.data.mainUser,
        friends: apiManager.data.friends,
        quote: apiManager.data.quote,
        pokemon: apiManager.data.pokemon,
        meatText: apiManager.data.meatText
    };
    localStorage.setItem("userPageData", JSON.stringify(userPageData));
    alert("User page saved successfully!");
}

function loadUserPageData() {
    const userPageData = JSON.parse(localStorage.getItem("userPageData"));
    if (userPageData) {
        apiManager.data.mainUser = userPageData.mainUser;
        apiManager.data.friends = userPageData.friends;
        apiManager.data.quote = userPageData.quote;
        apiManager.data.pokemon = userPageData.pokemon;
        apiManager.data.meatText = userPageData.meatText;

        renderer.renderUser(apiManager.data.mainUser);
        renderer.renderFriends(apiManager.data.friends);
        renderer.renderQuote(apiManager.data.quote);
        renderer.renderPokemon(apiManager.data.pokemon);
        renderer.renderMeat(apiManager.data.meatText);

        alert("User page loaded successfully!");
    } else {
        alert("No saved user page found.");
    }
}

updateUserData();

const generateUserButton = document.getElementById("generate-user-btn");
generateUserButton.addEventListener("click", updateUserData);

const saveUserButton = document.getElementById("save-user-btn");
saveUserButton.addEventListener("click", saveUserPageData);

const loadUserButton = document.getElementById("load-user-btn");
loadUserButton.addEventListener("click", loadUserPageData);

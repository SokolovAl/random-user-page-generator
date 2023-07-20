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
               apiManager.fetchPokemonType(apiManager.data.pokemon.name)
                         .then(() => {
                             const bgColor = getColorForPokemonType(apiManager.data.pokemonType);
                             changeBackgroundColor(bgColor);
                         });

               apiManager.data.pokemon.name = capitalize(apiManager.data.pokemon.name);

               return apiManager.fetchPokemonGif(apiManager.data.pokemon.name);
           })
           .then(() => {
               renderer.renderUser(apiManager.data.mainUser);
               renderer.renderFriends(apiManager.data.friends);
               renderer.renderQuote(apiManager.data.quote);
               renderer.renderPokemon(apiManager.data.pokemon);
               renderer.renderMeat(apiManager.data.meatText);
               renderer.renderPokemonGif(apiManager.data.pokemonGif);
           })
           .catch(error => console.error("Error", error));
}

function getColorForPokemonType(type) {
    const colorMap = {
        "normal": "#a8a878",
        "fire": "#f08030",
        "water": "#6890f0",
        "grass": "#78c850",
        "electric": "#f8d030"
    };

    return colorMap[type] || "#ffffff";
}

function changeBackgroundColor(color) {
    document.body.style.backgroundColor = color;
}

function saveUserPageData() {
    const savedUsers = JSON.parse(localStorage.getItem("savedUsers")) || [];
    const userPageData = {
        id: Date.now(),
        mainUser: apiManager.data.mainUser,
        friends: apiManager.data.friends,
        quote: apiManager.data.quote,
        pokemon: apiManager.data.pokemon,
        meatText: apiManager.data.meatText
    };
    savedUsers.push(userPageData);
    localStorage.setItem("savedUsers", JSON.stringify(savedUsers));
    alert("User page saved successfully!");
    loadSavedUsersList();
}

function loadSavedUsersList() {
    const savedUsers = JSON.parse(localStorage.getItem("savedUsers")) || [];
    const usersDropdownMenu = document.getElementById("users-dropdown-menu");
    usersDropdownMenu.innerHTML = "";
    savedUsers.forEach(user => {
        const option = document.createElement("option");
        option.value = user.id;
        option.innerText = `${user.mainUser.firstName} ${user.mainUser.lastName}`;
        usersDropdownMenu.appendChild(option);
    });
}

function loadUserPageDataById(userId) {
    const savedUsers = JSON.parse(localStorage.getItem("savedUsers")) || [];
    const userPageData = savedUsers.find(user => user.id === userId);
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
        renderer.renderPokemonGif(apiManager.data.pokemonGif);

        alert("User page loaded successfully!");
    } else {
        alert("No saved user page found.");
    }
}

loadSavedUsersList();
updateUserData();
changeBackgroundColor();

const generateUserButton = document.getElementById("generate-user-btn");
generateUserButton.addEventListener("click", updateUserData);

const saveUserButton = document.getElementById("save-user-btn");
saveUserButton.addEventListener("click", saveUserPageData);

const loadUserButton = document.getElementById("load-user-btn");
loadUserButton.addEventListener("click", () => {
    const usersDropdownMenu = document.getElementById("users-dropdown-menu");
    const selectedUserId = usersDropdownMenu.value;
    loadUserPageDataById(Number(selectedUserId));
});

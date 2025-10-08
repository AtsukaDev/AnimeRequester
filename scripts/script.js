
const typeSearch = document.getElementById('searchSelect');
const searchInput = document.getElementById('searchQuery');
const searchButton = document.getElementById('searchButton');
const cardDiv = document.getElementById('animeCards');
localStorage.setItem("color-theme", "light");
searchButton.addEventListener("click", searchAnime);

let themeToggleDarkIcon = document.getElementById(
    "theme-toggle-dark-icon"
);
let themeToggleLightIcon = document.getElementById(
    "theme-toggle-light-icon"
);

if (
    localStorage.getItem("color-theme") === "dark" ||
    (!("color-theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
) {
    themeToggleLightIcon.classList.remove("hidden");
} else {
    themeToggleDarkIcon.classList.remove("hidden");
}

let darkModeButton = document.getElementById("theme-toggle");

darkModeButton.addEventListener("click", function () {
    themeToggleDarkIcon.classList.toggle("hidden");
    themeToggleLightIcon.classList.toggle("hidden");

    if (localStorage.getItem("color-theme")) {
        if (localStorage.getItem("color-theme") === "light") {
            document.documentElement.classList.add("dark");
            localStorage.setItem("color-theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("color-theme", "light");
        }

    }
});

document.getElementById("clearButton").addEventListener("click", clearCards);


async function getAnime() {

    const input = searchInput.value;
    console.log(input);

    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '323150c3bamsh6b82d834895abd1p187c69jsn867625905ec0',
            'x-rapidapi-host': 'anime-db.p.rapidapi.com'
        }
    };
    let url;

    if (typeSearch.value == "title") {
        // Search by title

        url = `https://anime-db.p.rapidapi.com/anime?page=1&size=10&search=${input}`;

    }
    else if (typeSearch.value == "id") {
        // Search by id
        url = `https://anime-db.p.rapidapi.com/anime/by-id/${input}`;

    }
    else if (typeSearch.value == "ranking") {
        // Search by ranking
        url = `https://anime-db.p.rapidapi.com/anime/by-ranking/${input}`;
    }

    else {
        return [];
    }

    const response = await fetch(url, options);
    if (response.status != 200) return [];
    let data = (await response.json());
    return data;
}

function clearCards() {
    while (cardDiv.firstChild) {
        cardDiv.removeChild(cardDiv.firstChild);
    }
}

function generateCard(titleValue, imgCardUrl, descriptionValue, typeValue, episodeValue, leaderboardValue) {

    let card = document.createElement("div");
    let Title = document.createElement("h1");
    let imgCard = document.createElement("img");
    let description = document.createElement("p");
    let type = document.createElement("p");
    let leaderboard = document.createElement("p");
    let episode = document.createElement("p");

    Title.textContent += titleValue;

    imgCard.srcset = imgCardUrl;

    description.textContent = "Synopsis : ";
    description.textContent += descriptionValue;

    type.textContent = "Genres : ";
    type.textContent += typeValue.join(", ");

    leaderboard.textContent = "Leaderboard : ";
    leaderboard.textContent += leaderboardValue;

    episode.textContent = "Episodes : ";
    episode.textContent += episodeValue;

    card.classList.add("font-[Roboto]")
    Title.classList.add("font-bold");


    card.appendChild(Title);
    card.appendChild(imgCard);
    card.appendChild(description);
    card.appendChild(type);
    card.appendChild(leaderboard);
    card.appendChild(episode);
    cardDiv.appendChild(card);
}

async function searchAnime() {
    clearCards();
    const data = await getAnime();

    console.log(data)
    if (typeSearch.value != "title") {
        generateCard(data.title, data.image, data.synopsis, data.genres, data.episodes, data.ranking);
    }
    else {
        for (let anime of data.data) {

            generateCard(anime.title, anime.image, anime.synopsis, anime.genres, anime.episodes, anime.ranking);
        }
    }


}




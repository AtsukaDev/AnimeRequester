
const typeSearch = document.getElementById('searchSelect');
const searchInput = document.getElementById('searchQuery');
const searchButton = document.getElementById('searchButton');
const cardDiv = document.getElementById('animeCards');
const filterDiv = document.getElementById('filters');
const genresButtonDiv = document.getElementById('genresButtons');
const animeGenres = ["Award Winning", "Action", "Suspense", "Horror", "Ecchi", "Avant Garde", "Sports", "Supernatural", "Fantasy", "Gourmet", "Boys Love", "Drama", "Comedy", "Mystery", "Girls Love", "Slice of Life", "Adventure", "Romance", "Sci-Fi"]
for (let genre of animeGenres) {
    genresButtonDiv.innerHTML += `
    <div class="flex justify-center items-center p-1 rounded-2xl">
    <input type="checkbox" name="${genre}" class="flex" />
    <label for="${genre}" class="flex p-2 " >${genre}</label>
    </div>
    `
}





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

        // Get genres to update request
        let genresSelected = genresButtonDiv.querySelectorAll('input[type="checkbox"]:checked');
        if (genresSelected.length > 0) {
            url += "&genres=";
            for(let genreInput of genresSelected){
                url += genreInput.name + "%2C";
            }
        }

       



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
    card.classList.add("w-full", "mx-4", "md:w-5/12", "md:mx-0", "text-center", "shadow-xl", "bg-[#ff7a7a]", "rounded-2xl", "h-full")

    let Title = document.createElement("h1");
    Title.classList.add("m-2", "bg-[#ffacac]", "rounded-xl", "shadow-lg", "p-1")

    let grid = document.createElement("div");
    grid.classList.add("grid", "gap-5", "grid-cols-4", "grid-rows-3")

    let imgCard = document.createElement("img");
    imgCard.classList.add("rounded-xl", "col-span-2", "m-2", "row-span-3", "justify-center");


    let type = document.createElement("p");
    type.classList.add("m-2", "bg-[#ffacac]", "rounded-xl", "shadow-lg", "p-1", "col-span-2", "row-span-2");

    let leaderboard = document.createElement("p");
    leaderboard.classList.add("m-2", "bg-[#ffacac]", "rounded-xl", "shadow-lg", "p-1", "content-center", "font-bold", "text-xl");

    let episode = document.createElement("p");
    episode.classList.add("m-2", "bg-[#ffacac]", "rounded-xl", "shadow-lg", "p-1", "content-center", "font-bold", "text-xl");

    let description = document.createElement("p");
    description.classList.add("m-2", "bg-[#ffacac]", "rounded-xl", "shadow-lg", "p-1", "text-justify", "p-3");


    Title.textContent += titleValue;

    imgCard.srcset = imgCardUrl;

    description.textContent = descriptionValue;

    type.textContent = "Genres : ";
    type.textContent += typeValue.join(", ");

    leaderboard.textContent = "#";
    leaderboard.textContent += leaderboardValue;

    episode.textContent = `${episodeValue} Episodes`;

    card.classList.add("font-[Roboto]")
    Title.classList.add("font-bold");


    card.appendChild(Title);
    grid.appendChild(imgCard);
    grid.appendChild(type);
    grid.appendChild(leaderboard);
    grid.appendChild(episode);
    card.appendChild(grid);
    card.appendChild(description);
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



document.getElementById("filterButton").addEventListener("click", () => {
    if (filterDiv.classList.contains("hidden")) {
        filterDiv.classList.replace("hidden", "flex");
        return;
    }
    filterDiv.classList.replace("flex", "hidden");
})




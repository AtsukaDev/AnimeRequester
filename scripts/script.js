
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

function handle404(){
    cardDiv.innerHTML = `
    <div class="flex items-center justify-center content-center">
    <h2 class="text-3xl"> Aucun résultat n'a été trouvé pour cette recherche.. </h2>
    <img src="https://media.tenor.com/Jfvooie8DbAAAAAj/monkey-cymbals.gif" class="justify-center" />
    </div>
    `
}


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
    if (response.status != 200) {
        handle404();
        return [];
    };
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
    card.classList.add("w-full","mx-4","lg:w-[46%]","lg:mx-0","text-center","shadow-xl","bg-[#ff7a7a]","dark:bg-[#42183c]","rounded-2xl","h-500","text-[#571b4f]","dark:text-[#ffc6c2]","my-5","hover:shadow-pop-br");
    
    let Title = document.createElement("h1");
    Title.classList.add("m-2","bg-[#ffacac]","dark:bg-[#612759]","rounded-xl","shadow-lg","p-1","hover:shadow-pop-br")

    let grid = document.createElement("div");
    grid.classList.add("grid","grid-cols-6","grid-rows-5")

    let imgCard = document.createElement("img");
    imgCard.classList.add("rounded-xl","col-span-3","m-2","row-span-5","justify-center");

    let textGenre = document.createElement("h1");
    textGenre.textContent = "GENRES"
    textGenre.classList.add("rounded-xl","col-span-3","m-2","row-span-1","justify-center","font-bold","bg-[#ffacac]","dark:bg-[#612759]","text-xl","content-center");

    let leaderboard = document.createElement("p");
    leaderboard.classList.add("m-2","bg-[#ffacac]","dark:bg-[#612759]","rounded-xl","shadow-lg","p-1","content-center", "font-bold", "text-xl", "row-start-4", "col-start-4");
    
    let episode = document.createElement("p");
    episode.classList.add("m-2","bg-[#ffacac]","dark:bg-[#612759]","rounded-xl","shadow-lg","p-1","content-center", "font-bold", "text-xl", "col-span-2","col-start-5","row-start-4");

    let description = document.createElement("p");
    description.classList.add("m-2","bg-[#ffacac]","dark:bg-[#612759]","rounded-xl","shadow-lg","p-1","text-justify","p-3","col-span-6");
    
    
    Title.textContent += titleValue;

    imgCard.srcset = imgCardUrl;

    description.textContent = descriptionValue;

    leaderboard.textContent = "#";
    leaderboard.textContent += leaderboardValue;

    episode.textContent = `${episodeValue} Episodes`;

    card.classList.add("font-[Roboto]")
    Title.classList.add("font-bold");


    card.appendChild(Title);
    grid.appendChild(imgCard);
    grid.appendChild(textGenre);
    for (let i = 0; i < typeValue.length; i++){
        let type = document.createElement("p");
        let divContent = document.createElement("div")
        divContent.classList.add("m-2","bg-[#ffacac]","dark:bg-[#612759]","rounded-xl","shadow-lg","p-1","col-span-1","row-span-1","bg-[#ffacac]","content-center","object-cover")
        type.textContent = typeValue[i];
        
        divContent.appendChild(type)
        grid.appendChild(divContent);
    }
    grid.appendChild(leaderboard);
    grid.appendChild(episode);
    card.appendChild(grid);
    card.appendChild(description);
    cardDiv.appendChild(card);
}

async function searchAnime() {
    clearCards();
    const data = await getAnime();

    if(data.length == 0){
        handle404();
    }
    else if (typeSearch.value != "title") {
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




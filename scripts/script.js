import { clearCards, generateCard } from "./cards.js";
import { getAnime, handle404 } from "./anime.js";
import { initializeDarkmode } from "./darkmode.js";
import { initializeApikey } from "./apikey.js";
const typeSearch = document.getElementById('searchSelect');
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

document.getElementById('searchQuery').addEventListener("keypress", (e)=>{
    if(e.key == "Enter"){
        searchAnime();
    }
})
searchButton.addEventListener("click", searchAnime);
initializeApikey();
initializeDarkmode();
document.getElementById("clearButton").addEventListener("click", () => {
    clearCards(cardDiv)
});

async function searchAnime() {
    clearCards(cardDiv);
    const data = await getAnime(genresButtonDiv, cardDiv);

    if(data.length == 0){
        handle404(cardDiv);
    }
    else if (typeSearch.value != "title") {
        generateCard(data.title, data.image, data.synopsis, data.genres, data.episodes, data.ranking,cardDiv);
    }
    else {
        for (let anime of data.data) {

            generateCard(anime.title, anime.image, anime.synopsis, anime.genres, anime.episodes, anime.ranking, cardDiv);
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




const typeSearch = document.getElementById('searchSelect');
const searchInput = document.getElementById('searchQuery');
const searchButton = document.getElementById('searchButton');
const cardDiv = document.getElementById('animeCards');

async function getAnime() {

    const input = searchInput.value;

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

    const response = await fetch(url, options);
    if (response.status != 200) return -1;
    const data = (await response.json()).data;
    return data;
}

function generateCard(titleValue, imgCardUrl, descriptionValue, typeValue, episodeValue, leaderboardValue){

    let card = document.createElement("div");
    let Title = document.createElement("h1");
    let imgCard = document.createElement("img");
    let description = document.createElement("p");
    let type = document.createElement("p");
    let leaderboard = document.createElement("p");
    let episode = document.createElement("p");
    
    Title.textContent += titleValue;

    imgCard.srcset = imgCardUrl;

    description.textContent = "Description : ";
    description.textContent += descriptionValue;

    type.textContent = "Type : ";
    type.textContent += typeValue;

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

async function searchAnime(){
    const data = await getAnime();
    for(let anime of data){
        generateCard(anime.title, anime.image, anime.synopsis, "", anime.episodes, anime.ranking);
    }
}




const searchInput = document.getElementById('searchQuery');
const typeSearch = document.getElementById('searchSelect');
export function handle404(cardDiv){
    cardDiv.innerHTML = `
    <div class="flex items-center justify-center content-center">
    <h2 class="text-3xl dark:text-white">Nothing has been found for this entry.. </h2>
    <img src="https://media.tenor.com/Jfvooie8DbAAAAAj/monkey-cymbals.gif" class="justify-center" />
    </div>
    `
}

export function handle403(){
    alert("You're api key is not valid, change it using the top-left button");
}

export async function getAnime(genresButtonDiv, cardDiv) {

    const input = searchInput.value;

    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': localStorage.getItem('api-key'),
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
    if(response.status== 403){
        handle403();
    }
    if (response.status != 200) {
        handle404(cardDiv);
        return [];
    };
    let data = (await response.json());
    return data;
}
const searchInput = document.getElementById('searchQuery');
const typeSearch = document.getElementById('searchSelect');

export async function getAnime(genresButtonDiv, cardDiv) {

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
        handle404(cardDiv);
        return [];
    };
    let data = (await response.json());
    return data;
}
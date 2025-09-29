const typeSearch = document.getElementById('searchSelect');
const searchInput = document.getElementById('searchQuery')

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

async function searchAnime(){
    const data = await getAnime();
    console.log(data);
}


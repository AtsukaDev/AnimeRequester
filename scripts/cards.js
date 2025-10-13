export function clearCards(cardDiv) {
    while (cardDiv.firstChild) {
        cardDiv.removeChild(cardDiv.firstChild);
    }
}
export function generateCard(titleValue, imgCardUrl, descriptionValue, typeValue, episodeValue, leaderboardValue, cardDiv) {

    let card = document.createElement("div");
    card.classList.add("w-full","mx-4","lg:w-[46%]","lg:mx-0","text-center","shadow-2xl","dark:shadow-lg","dark:shadow-[#c77dff]","bg-[#ff7a7a]","dark:bg-[#240046]","rounded-2xl","h-500","text-[#571b4f]","dark:text-[#ffc6c2]","my-5","hover:shadow-pop-br","drop-shadow-xl/25", "dark:drop-shadow-xl/10", "dark:drop-shadow-[#e0aaff]");
    
    let Title = document.createElement("h1");
    Title.classList.add("m-2","bg-[#ffacac]","dark:bg-[#3c096c]","rounded-xl","shadow-lg","p-1","hover:shadow-pop-br")

    let grid = document.createElement("div");
    grid.classList.add("grid","grid-cols-6","grid-rows-5")

    let imgCard = document.createElement("img");
    imgCard.classList.add("rounded-xl","col-span-3","m-2","row-span-5","justify-center");

    let textGenre = document.createElement("h1");
    textGenre.textContent = "GENRES"
    textGenre.classList.add("rounded-xl","col-span-3","m-2","row-span-1","justify-center","font-bold","bg-[#ffacac]","dark:bg-[#3c096c]","text-xl","content-center");

    let leaderboard = document.createElement("p");
    leaderboard.classList.add("m-2","bg-[#ffacac]","dark:bg-[#3c096c]","rounded-xl","shadow-lg","p-1","content-center", "font-bold", "text-xl", "row-start-4", "col-start-4");
    
    let episode = document.createElement("p");
    episode.classList.add("m-2","bg-[#ffacac]","dark:bg-[#3c096c]","rounded-xl","shadow-lg","p-1","content-center", "font-bold", "text-xl", "col-span-2","col-start-5","row-start-4");

    let description = document.createElement("p");
    description.classList.add("m-2","bg-[#ffacac]","dark:bg-[#3c096c]","rounded-xl","shadow-lg","p-1","text-justify","p-3","col-span-6");
    
    
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
        divContent.classList.add("m-2","bg-[#ffacac]","dark:bg-[#3c096c]","rounded-xl","shadow-lg","p-1","col-span-1","row-span-1","bg-[#ffacac]","content-center","object-cover")
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

export function handle404(cardDiv){
    cardDiv.innerHTML = `
    <div class="flex items-center justify-center content-center">
    <h2 class="text-3xl dark:text-white"> Aucun résultat n'a été trouvé pour cette recherche.. </h2>
    <img src="https://media.tenor.com/Jfvooie8DbAAAAAj/monkey-cymbals.gif" class="justify-center" />
    </div>
    `
}
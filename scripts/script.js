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
    document.body.appendChild(card);
}

generateCard("test", "https://media.istockphoto.com/id/814423752/fr/photo/oeil-du-mod%C3%A8le-avec-le-maquillage-art-color%C3%A9-gros-plan.jpg?s=612x612&w=0&k=20&c=NeNYcLTUsVfcAyGmFHM7BWpwnFFXvCxsGfSwyZOB8nU=", "test", "test", "test", "test");
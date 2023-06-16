export function createGameInfo(game) {
  const gameInfo = document.createElement("div");
  gameInfo.classList.add("game-info__container");
  gameInfo.innerHTML = `
<div id="card">


        <h1>${game.name}</h1>
        <div class="game-info__image">
        <img src="${game.background_image}" alt="${game.name}" class="background-img-game" />
        </div>
        <div class="game-info__text">
        <h2>${game.name}</h2>
        <p>${game.description_raw}</p>
        </div>

        </div>
    `;
  gameInfo.appendChild(createGameRatings(game.ratings));

  return gameInfo;
}

function createGameRatings(ratings) {
  const listaEl = document.createElement("ul");
  ratings.forEach((rating) => {
    listaEl.innerHTML += `<li>${rating.title} Porcentaje${rating.percent}</li>`;
  });
  return listaEl;
}

import { getGameTrailers } from "../gamesApiFunctions.js";
let mostrandoVideo = false;
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

export function addGameTrailer(juegoId) {
  getGameTrailers(juegoId).then((data) => {
    if (mostrandoVideo) return;
    mostrandoVideo = true;
    const backgroundEl = document.querySelector(".background-img-game");

    backgroundEl.addEventListener("mouseover", () =>
      agregarTrailer(data, backgroundEl)
    );
    backgroundEl.removeEventListener("mouseover", () =>
      agregarTrailer(data, backgroundEl)
    );
    mostrandoVideo = false;
  });
}
function agregarTrailer(data, backgroundEl) {
  const URLtrailer = data.results[0].data.max;
  const trailerEl = document.querySelector(".trailer-container");
  backgroundEl.style.display = "none";
  const iframeConEl = document.createElement("div");
  iframeConEl.innerHTML = `<iframe width="560" height="315" src="${URLtrailer}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
  trailerEl.innerHTML = iframeConEl.innerHTML;
  setTimeout(() => {
    trailerEl.innerHTML = "";
    backgroundEl.style.display = "block";
  }, 30000);
}

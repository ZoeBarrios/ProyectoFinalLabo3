import {
  getGameTrailers,
  getGameScreenshots,
  getGameStores,
  getStoreInfo,
} from "../gamesApiFunctions.js";
const usuario = localStorage.getItem("logeado");
let mostrandoVideo = false;

export function createGameInfo(game) {
  if (!usuario) {
    const botonFavorito = document.querySelector(".favoritos");
    botonFavorito.style.display = "none";
  }
  const gameInfo = document.createElement("div");

  gameInfo.classList.add("game-info__container");

  gameInfo.innerHTML = `

  <div id="card">

    <h1 class="titulo-info-game">${game.name}</h1>
    <div class="trailer-container"></div>

    <div class="game-info__image">
     <img src="${game.background_image}" alt="${
    game.name
  }" class="background-img-game" />
    </div>
    <div class="game-info__text">
      <p>${game.description.split("Español")[0]}</p>
      </div>
  </div>

    `;

  return gameInfo;
}

export function addGameTrailer(juegoId) {
  getGameTrailers(juegoId).then((data) => {
    if (mostrandoVideo) return;
    mostrandoVideo = true;
    const backgroundEl = document.querySelector(".background-img-game");

    backgroundEl.addEventListener("mouseover", () => {
      crearTrailer(data, backgroundEl);
    });

    mostrandoVideo = false;
  });
}
function crearTrailer(data, backgroundEl) {
  if (data.results.length == 0) return;
  const URLtrailer = data.results[0].data.max;
  const trailerEl = document.querySelector(".trailer-container");

  backgroundEl.style.display = "none";

  const iframe = document.createElement("iframe");
  iframe.innerHTML = `<iframe width="560" height="315" src="${URLtrailer}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
  trailerEl.innerHTML = iframe.innerHTML;
}

export function addScreenshots(juegoId) {
  getGameScreenshots(juegoId).then((screenshots) => {
    const screenshotsEl = document.querySelector(".screenshots-container");
    screenshots.results.forEach((screenshot, i) => {
      if (i > 5) return;
      screenshotsEl.innerHTML += `<li class="slide-visible"><img src="${screenshot.image}" alt="${screenshot.id}"></li>`;
    });
  });
}

export function addStores(id) {
  const storesEl = document.querySelector(".stores-container");

  getGameStores(id).then((stores) => {
    stores.results.forEach(async (store, index) => {
      if (index > 3) return;
      const storeInfo = await getStoreInfo(store.store_id);
      storesEl.innerHTML += `<a href="${store.url}" target="_blank" class="stores"> <i class="fa-solid fa-cart-shopping carrito"></i> ${storeInfo.name}   </a>`;
    });
  });
}

import { getGame } from "../js/gamesApiFunctions.js";
import { createGameInfo } from "./components/game.js";
import { getGameTrailers } from "./gamesApiFunctions.js";

const urlParams = new URLSearchParams(window.location.search);
const juegoId = urlParams.get("id");
let mostrandoVideo = false;

getGame(juegoId)
  .then((data) => {
    gameInfoEl.appendChild(createGameInfo(data));
  })
  .then(() => {
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
  })
  .catch((error) => console.log(error));

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
  }, 10000);
}

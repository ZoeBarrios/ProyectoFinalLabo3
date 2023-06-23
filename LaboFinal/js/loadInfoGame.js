import { getGame } from "../js/gamesApiFunctions.js";
import {
  createGameInfo,
  addGameTrailer,
  addScreenshots,
  addStores,
} from "./components/game.js";
import { gameInfoEl } from "./dom.js";
import { getAll, pushDB } from "./vercelVKFuntions.js";

const urlParams = new URLSearchParams(window.location.search);
const juegoId = urlParams.get("id");

getGame(juegoId)
  .then((data) => {
    gameInfoEl.appendChild(createGameInfo(data));
    addStores(juegoId);
  })
  .then((data) => {
    addGameTrailer(juegoId);
    addScreenshots(juegoId);
  })
  .then(() => {
    const favoritos = document.querySelector(".favoritos");
    favoritos.addEventListener("click", (e) => {
      agregarFavoritos();
    });
  })

  .catch((error) => console.log(error));

function agregarFavoritos() {
  const favoritos = document.querySelector(".favoritos");
  favoritos.addEventListener("click", async (e) => {
    const usuarioId = JSON.parse(localStorage.getItem("logeado"));
    const juegoFavorito = await getGame(juegoId);
    let juegos = await getAll("games");

    let yaExiste = false;
    if (juegos) {
      yaExiste = juegos.find((juego) => juego.id === juegoId);
    }
    if (juegoFavorito == undefined)
      return alert("No se pudo agregar a favoritos");
    if (yaExiste) return alert("El juego ya esta en favoritos");

    const juego = {
      juegoId: juegoFavorito.id,
      usuarioId,
      juegoFavorito,
    };

    juegos.push(juego);
    pushDB("games", juegos);
  });
}

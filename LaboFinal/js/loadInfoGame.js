import Noty from "noty";
import "noty/lib/noty.css";
import "noty/lib/themes/mint.css";
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
    agregarFavoritos();
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
      yaExiste = juegos.find(
        (juego) =>
          juego.juegoId == juegoId && juego.usuarioId.id == usuarioId.id
      );
    }

    if (juegoFavorito == undefined) {
      new Noty({
        theme: "mint",
        text: "Unable to add to favorites",
        type: "error",
        timeout: 2000,
      }).show();
      return;
    }

    if (yaExiste) {
      new Noty({
        theme: "mint",
        text: "Game already added to favorites",
        type: "error",
        timeout: 2000,
      }).show();
      return;
    }

    const juego = {
      juegoId: juegoFavorito.id,
      usuarioId,
      juegoFavorito,
    };

    juegos.push(juego);
    pushDB("games", juegos).then(() => {
      new Noty({
        theme: "mint",
        text: "Game added to favorites",
        type: "success",
        timeout: 2000,
      }).show();
    });
  });
}

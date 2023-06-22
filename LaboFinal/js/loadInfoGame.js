import { getGame } from "../js/gamesApiFunctions.js";
import {
  createGameInfo,
  addGameTrailer,
  addScreenshots,
  addStores,
} from "./components/game.js";

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
    const urlJsonServer = import.meta.env.VITE_API_URL_JSONSERVER;
    const usuarioId = JSON.parse(localStorage.getItem("logeado"));
    const juegoFavorito = await getGame(juegoId);
    if (juegoFavorito == undefined)
      return alert("No se pudo agregar a favoritos");
    if (
      (await fetch(
        `${urlJsonServer}/favoritos?juegoId=${juegoFavorito.id}&usuarioId=${usuarioId.id}`
      ).then((res) => res.json()).length) > 0
    )
      return alert("El juego ya esta en favoritos");

    await fetch(`${urlJsonServer}/favoritos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        juegoId: juegoFavorito.id,
        usuarioId: usuarioId,
        juegoFavorito,
      }),
    }).then((res) => alert("Juego agregado a favoritos"));
  });
}

import { getGame } from "../js/gamesApiFunctions.js";
import { createGameInfo } from "./components/game.js";

const urlParams = new URLSearchParams(window.location.search);
const juegoId = urlParams.get("id");

getGame(juegoId)
  .then((data) => {
    gameInfoEl.appendChild(createGameInfo(data));
  })
  .catch((error) => console.log(error));

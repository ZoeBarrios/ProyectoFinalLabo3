import { createGame } from "./components/game.js";
import { getGames } from "./gamesApiFunctions.js";
//PAGINACION
let pagina = 1;
let games = [];

iniciarPaginacion();

function iniciarPaginacion() {
  avanzarEl.disabled = false;
  retrocederEl.disabled = true;
  pagina = 1;
}

getGames(pagina).then((data) => {
  games = data.results;
  renderGames();
});

avanzarEl.addEventListener("click", (ev) => {
  ev.preventDefault();
  pagina++;
  controlPaginacion();
});

retrocederEl.addEventListener("click", (ev) => {
  ev.preventDefault();
  pagina--;
  controlPaginacion();
});

function obtenerJuegos() {
  getGames(pagina).then((data) => {
    games = data.results;
    renderGames();
  });
}

function controlPaginacion() {
  let juegosAMostrar = games.slice(pagina * 10, pagina * 10 + 10);
  if (
    juegosAMostrar.length == 20 &&
    games.slice((pagina + 1) * 10, (pagina + 1) * 10 + 10) != 0
  ) {
    avanzarEl.disabled = false;
  } else {
    obtenerJuegos();
  }
  pagina > 1 ? (retrocederEl.disabled = false) : (retrocederEl.disabled = true);
}

function renderGames() {
  gamesEl.innerHTML = "";
  games.forEach((game) => {
    gamesEl.appendChild(createGame(game));
  });
}

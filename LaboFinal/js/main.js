import { createGameCard } from "./components/gameCard.js";
import { getGames } from "./gamesApiFunctions.js";







//PAGINACION
let pagina = 0;
let urlNext = "";
let obteniendoJuegos = false;

iniciarPaginacion();
getGames()
  .then((data) => {
    games = data.results;
    urlNext = data.data.next;
    controlPaginacion();
  })
  .catch((error) => console.log(error));

function iniciarPaginacion() {
  avanzarEl.disabled = false;
  retrocederEl.disabled = true;
  pagina = 0;
}

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
  if (obteniendoJuegos) return;
  obteniendoJuegos = true;
  getGames(urlNext)
    .then((data) => {
      for (let i = 0; i < data.results.length; i++) {
        games.push(data.results[i]);
      }
      urlNext = data.data.next;
      controlPaginacion();
      obteniendoJuegos = false;
    })
    .catch((error) => {
      console.log(error);
      obteniendoJuegos = false;
    });
}

function controlPaginacion() {
  if (pagina != 0 && pagina % 2 == 0) {
    obtenerJuegos(urlNext);
  }
  let juegosAMostrar = games.slice(pagina * 20, pagina * 20 + 20);
  console.log(pagina);
  if (
    juegosAMostrar.length == 20 &&
    games.slice((pagina + 1) * 20, (pagina + 1) * 20 + 20) != 0
  ) {
    avanzarEl.disabled = false;
  }
  pagina > 0 ? (retrocederEl.disabled = false) : (retrocederEl.disabled = true);
  renderGames(juegosAMostrar);
}

function renderGames(juegosAMostrar) {
  gamesEl.innerHTML = "";
  juegosAMostrar.forEach((game) => {
    gamesEl.appendChild(createGameCard(game));
  });
}






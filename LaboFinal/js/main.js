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
    juego_al_azar();
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

/*FUNCIONALIDAD EN JUEGOS AL AZAR EN DIV DE FONDO*/
export function juego_al_azar() {
  let juego = games[Math.floor(Math.random() * games.length)];
  let fondoDiv = document.querySelector(".fondo1");
  let tituloH1 = document.querySelector(".tituloJuego");
  let fecha = document.querySelector(".fecha_lanzamiento");
  let h4el = document.createElement("a");
  h4el.classList.add("categoria");
  h4el.textContent = ` ${juego.genres[0].name}`;
  fondoDiv.style.backgroundImage = ` linear-gradient(to right, rgba(20, 30, 48, 0.7), rgba(36,59,85,0.7)), url(${juego.background_image})`;
  tituloH1.textContent = juego.name;
  fecha.textContent = `Estrenada : ${juego.released}`;
  tituloH1.appendChild(h4el);
  let link = document.createElement("a");
  link.classList.add("link_info");
  link.href = `../html/game.html?id=${juego.id}`;
  link.textContent = "Ver Info";
  let contenedor_fondo1 = document.querySelector(".contenedor_fondo1");
  contenedor_fondo1.appendChild(link);
}

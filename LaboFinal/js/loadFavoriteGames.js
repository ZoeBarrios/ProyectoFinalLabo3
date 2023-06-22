import { createGameCard } from "./components/gameCard";

const urlJsonServer = import.meta.env.VITE_API_URL_JSONSERVER;
const listaJuegosFavoritos = document.querySelector(".listaJuegosFavoritos");

loadFavoriteGames();

export async function loadFavoriteGames() {
  const usuarioId = JSON.parse(localStorage.getItem("logeado"));
  const juegosFavoritos = await fetch(
    `${urlJsonServer}/favoritos?usuarioId=${usuarioId}`
  ).then((res) => res.json());

  if (juegosFavoritos.length == 0) {
    listaJuegosFavoritos.innerHTML = `<h1 class="tituloSeccion">No hay juegos favoritos</h1>`;
  } else {
    juegosFavoritos.forEach((juegosFavoritos) => {
      listaJuegosFavoritos.appendChild(
        createGameCard(juegosFavoritos.juegoFavorito)
      );
    });
  }
}

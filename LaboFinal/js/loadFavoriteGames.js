import { createGameCard } from "./components/gameCard";
import { getAll } from "./vercelVKFuntions";

const listaJuegosFavoritos = document.querySelector(".listaJuegosFavoritos");

loadFavoriteGames();

export async function loadFavoriteGames() {
  const usuarioId = JSON.parse(localStorage.getItem("logeado"));
  const juegosFavoritos = await getAll("games");
  const juegosUsuario = juegosFavoritos.filter(
    (juego) => juego.usuarioId == usuarioId
  );

  if (juegosUsuario.length == 0) {
    listaJuegosFavoritos.innerHTML = `<h1 class="tituloSeccion">No hay juegos favoritos</h1>`;
  } else {
    juegosUsuario.forEach((juegosFavoritos) => {
      listaJuegosFavoritos.appendChild(
        createGameCard(juegosFavoritos.juegoFavorito)
      );
    });
  }
}

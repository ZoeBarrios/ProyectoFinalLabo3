import { createGameCardProfile } from "./components/gameCardProfile";
import { nombreUsuario } from "./dom";
import { getAll } from "./vercelVKFuntions";

const listaJuegosFavoritos = document.querySelector(".listaJuegosFavoritos");

loadFavoriteGames();

export async function loadFavoriteGames() {
  const tituloInfoProfile = document.querySelector(".tituloInfoProfile");
  const user = JSON.parse(localStorage.getItem("logeado"));
  const usuarioId = user.id;

  console.log(user);
  const userName = user.user.toUpperCase();
  nombreUsuario.innerHTML = userName;

  const juegosFavoritos = await getAll("games");

  const juegosUsuario = juegosFavoritos.filter(
    (juego) => juego.usuarioId.id == usuarioId
  );

  if (juegosUsuario.length == 0) {
    tituloInfoProfile.innerHTML = `<h1 class="tituloSeccion">No hay juegos favoritos</h1>`;
  } else {
    tituloInfoProfile.innerHTML = `<h1 class="tituloSeccion">Juegos favoritos</h1>`;
    juegosUsuario.forEach((juegosFavoritos) => {
      listaJuegosFavoritos.appendChild(createGameCardProfile(juegosFavoritos));
    });
  }
}

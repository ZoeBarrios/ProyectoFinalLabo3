import { createGameCard } from "./components/gameCard";
import { nombreUsuario } from "./dom";
import { deleteOne, getAll } from "./vercelVKFuntions";

const listaJuegosFavoritos = document.querySelector(".listaJuegosFavoritos");

loadFavoriteGames();

export async function loadFavoriteGames() {
  const tituloInfoProfile = document.querySelector(".tituloInfoProfile");
  const user = JSON.parse(localStorage.getItem("logeado"));
  const usuarioId = user.id;
  const userName = user.user.toUpperCase();
  nombreUsuario.innerHTML = userName;

  const juegosFavoritos = await getAll("games");

  console.log(juegosFavoritos);
  const juegosUsuario = juegosFavoritos.filter(
    (juego) => juego.usuarioId.id == usuarioId
  );

  if (juegosUsuario.length == 0) {
    tituloInfoProfile.innerHTML = `<h1 class="tituloSeccion">No hay juegos favoritos</h1>`;
  } else {
    tituloInfoProfile.innerHTML = `<h1 class="tituloSeccion">Juegos favoritos</h1>`;
    juegosUsuario.forEach((juegosFavoritos) => {
      const botonEliminar = document.createElement("button");
      const juegoFavoritoCreado = createGameCard(juegosFavoritos.juegoFavorito);
      botonEliminar.innerHTML = `<i class="fa-solid fa-trash">Eliminar</i>`;
      botonEliminar.classList.add("botonEliminar");
      botonEliminar.addEventListener("click", async () => {
        const id = juegosFavoritos.juegoFavorito.id;
        await deleteOne("games", id);
      });
      juegoFavoritoCreado.appendChild(botonEliminar);
      listaJuegosFavoritos.appendChild(juegoFavoritoCreado);
    });
  }
}

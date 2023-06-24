import { deleteOne } from "../vercelVKFuntions.js";
import { createGameCard } from "./gameCard.js";
export function createGameCardProfile(juegosFavoritos) {
  const botonEliminar = document.createElement("a");
  botonEliminar.classList.add("eliminar");
  const juegoFavoritoCreado = createGameCard(juegosFavoritos.juegoFavorito);
  const gameInfo = juegoFavoritoCreado.querySelector(".game-info");
  const anchorEl = gameInfo.querySelector("a");

  botonEliminar.innerText = `Eliminar de favoritos`;
  botonEliminar.classList.add("botonEliminar");
  botonEliminar.addEventListener("click", async () => {
    const id = juegosFavoritos.juegoFavorito.id;
    await deleteOne("games", id);
  });
  gameInfo.innerHTML = "";
  gameInfo.appendChild(anchorEl);
  gameInfo.appendChild(botonEliminar);

  return juegoFavoritoCreado;
}

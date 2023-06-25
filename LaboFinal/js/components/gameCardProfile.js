import Noty from "noty";
import "noty/lib/noty.css";
import "noty/lib/themes/mint.css";
import { deleteOne } from "../vercelVKFuntions.js";
import { createGameCard } from "./gameCard.js";
export function createGameCardProfile(juegosFavoritos) {
  const user = JSON.parse(localStorage.getItem("logeado"));
  const botonEliminar = document.createElement("a");
  botonEliminar.classList.add("eliminar");
  const juegoFavoritoCreado = createGameCard(juegosFavoritos.juegoFavorito);
  const gameInfo = juegoFavoritoCreado.querySelector(".game-info");
  const anchorEl = gameInfo.querySelector("a");

  botonEliminar.innerHTML = `<i class="fa-solid fa-trash"></i>`;
  botonEliminar.classList.add("botonEliminar");
  botonEliminar.addEventListener("click", async () => {
    const id = juegosFavoritos.juegoFavorito.id;
    deleteOne("games", id, user.id)
      .then(() => {
        new Noty({
          theme: "mint",
          text: "Juego eliminado de favoritos",
          type: "success",
          timeout: 1000,
        }).show();
      })
      .then(() => setTimeout(() => location.reload(), 2000));
  });
  gameInfo.innerHTML = "";
  gameInfo.appendChild(anchorEl);
  gameInfo.appendChild(botonEliminar);

  return juegoFavoritoCreado;
}

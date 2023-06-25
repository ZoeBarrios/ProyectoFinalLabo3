import { cargarJuegos } from "./main.js";
import {
  botonesFiltroEl,
  buscadorEl,
  retrocederEl,
  avanzarEl,
  fondoExplicacion,
  titulosListado,
  tituloLogo,
  gamesEl,
} from "./dom.js";
const URL = import.meta.env.VITE_API_URL;
const KEY = import.meta.env.VITE_API_KEY;
botonesFiltroEl.forEach((boton) => {
  boton.addEventListener("click", (ev) => {
    ev.preventDefault();
    retrocederEl.style.display = "block";
    avanzarEl.style.display = "block";
    const genre = ev.target.innerText.toLowerCase();
    const url = `${URL}games?page_size=40&page=1&genres=${genre}&key=${KEY}`;
    cargarJuegos(url);
  });
});

buscadorEl.forEach((buscador) => {
  buscador.addEventListener("keyup", (ev) => {
    if (ev.key === "Enter") {
      window.scrollTo(0, gamesEl.offsetTop - 200);
      titulosListado.forEach((titulo) => {
        titulo.style.display = "none";
      });
      fondoExplicacion.style.display = "none";
      const url = `${URL}games?page_size=40&page=1&search=${ev.target.value}&key=${KEY}`;
      cargarJuegos(url);
      retrocederEl.style.display = "none";
      avanzarEl.style.display = "none";
    }
  });
});

tituloLogo.addEventListener("click", (ev) => {
  ev.preventDefault();
  retrocederEl.style.display = "block";
  avanzarEl.style.display = "block";
  cargarJuegos();
  titulosListado.forEach((titulo) => {
    titulo.style.display = "none";
  });
});

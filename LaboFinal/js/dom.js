const avanzarEl = document.querySelector(".avanzar");
const retrocederEl = document.querySelector(".retroceder");
const gamesEl = document.querySelector(".games");
const gameInfoEl = document.querySelector(".game-info");
let games = [];
/*CODIGO JS PARA OCULTAR MENU*/
let div_desplegable = document.querySelector("#menu_oculto")
let icono = document.querySelector(".menu_click")

icono.addEventListener("click", function () {
  div_desplegable.classList.toggle("ocultar")
.div_desplegable.classList.toggle("rojo")
})
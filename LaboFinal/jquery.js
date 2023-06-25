import { gamesEl } from "./js/dom";

$(document).ready(function () {
  $(".menu_click").click(function (e) {
    e.preventDefault();

    $(".menu_oculto").slideToggle();
  });

  $(".filtro").addClass("estilos_link");

  $(".filtro").click(function (e) {
    e.preventDefault();
    window.scrollTo(0, gamesEl.offsetTop - 100);
    window.$(".filtro").removeClass("estilo_link");
    $(this).addClass("estilo_link");
  });

  $(".tituloLogo ").click(function (e) {
    e.preventDefault();
    $(".filtro").removeClass("estilo_link");
  });

  $(".tituloLogo").click(function (e) {
    e.preventDefault();
    $("#fondo_explicacion").fadeIn();
  });

  $(".filtro").click(function (e) {
    e.preventDefault();
    $("#fondo_explicacion").fadeOut(500);
  });

  $(".juegos_arcade").hide();
  $(".juegos_adventure").hide();
  $(".juegos_pelea").hide();
  $(".juegos_shoter").hide();

  /*mostrar div arcade*/
  $(".cont_header")
    .find("nav")
    .find("ul")
    .find("a")
    .eq(0)
    .click(function (e) {
      e.preventDefault();
      $(".juegos_arcade").fadeIn(900);
      $(".juegos_adventure").hide();
      $(".juegos_pelea").hide();
      $(".juegos_shoter").hide();
    });

  /*mostrar div adventure*/
  $(".cont_header")
    .find("nav")
    .find("ul")
    .find("a")
    .eq(1)
    .click(function (e) {
      e.preventDefault();
      $(".juegos_arcade").hide();
      $(".juegos_adventure").fadeIn(900);
      $(".juegos_pelea").hide();
      $(".juegos_shoter").hide();
    });

  /*mostrar div adventure*/
  $(".cont_header")
    .find("nav")
    .find("ul")
    .find("a")
    .eq(2)
    .click(function (e) {
      e.preventDefault();
      $(".juegos_arcade").hide();
      $(".juegos_adventure").hide();
      $(".juegos_pelea").fadeIn(900);
      $(".juegos_shoter").hide();
    });

  /*mostrar div adventure*/
  $(".cont_header")
    .find("nav")
    .find("ul")
    .find("a")
    .eq(3)
    .click(function (e) {
      e.preventDefault();
      $(".juegos_arcade").hide();
      $(".juegos_adventure").hide();
      $(".juegos_pelea").hide();
      $(".juegos_shoter").fadeIn(900);
    });

  $(".menu_oculto").hide();

  /*mostrar div arcade*/
  $(".contenedor_menu")
    .find("nav")
    .find("ul")
    .find("a")
    .eq(0)
    .click(function (e) {
      e.preventDefault();
      $(".juegos_arcade").fadeIn(900);
      $(".juegos_adventure").hide();
      $(".juegos_pelea").hide();
      $(".juegos_shoter").hide();
    });

  /*mostrar div adventure*/
  $(".contenedor_menu")
    .find("nav")
    .find("ul")
    .find("a")
    .eq(1)
    .click(function (e) {
      e.preventDefault();
      $(".juegos_arcade").hide();
      $(".juegos_adventure").fadeIn(900);
      $(".juegos_pelea").hide();
      $(".juegos_shoter").hide();
    });

  /*mostrar div adventure*/
  $(".contenedor_menu")
    .find("nav")
    .find("ul")
    .find("a")
    .eq(2)
    .click(function (e) {
      e.preventDefault();
      $(".juegos_arcade").hide();
      $(".juegos_adventure").hide();
      $(".juegos_pelea").fadeIn(900);
      $(".juegos_shoter").hide();
    });

  /*mostrar div adventure*/
  $(".contenedor_menu")
    .find("nav")
    .find("ul")
    .find("a")
    .eq(3)
    .click(function (e) {
      e.preventDefault();
      $(".juegos_arcade").hide();
      $(".juegos_adventure").hide();
      $(".juegos_pelea").hide();
      $(".juegos_shoter").fadeIn(900);
    });
});

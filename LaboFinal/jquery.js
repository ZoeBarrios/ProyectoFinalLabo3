$(document).ready(function () {
    

$(".menu_click").click(function (e) { 
    e.preventDefault();

    $(".menu_oculto").slideToggle();
    
});

$(".filtro").addClass("estilos_link");

$(".filtro").click(function (e) { 
    e.preventDefault();
$(".filtro").removeClass("estilo_link");
$(this).addClass("estilo_link")   
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
    $("#fondo_explicacion").fadeOut();
    
});





});
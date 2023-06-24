/* IR ARRIBA */
$(document).ready(function () {
  $(".ir-arriba").click(function () {
    $("body, html").animate(
      {
        scrollTop: "0px",
      },
      300
    );
  });

  $(window).scroll(function () {
    if ($(this).scrollTop() > 0) {
      $(".ir-arriba").slideDown(300);
    } else {
      $(".ir-arriba").slideUp(300);
    }
  });
});

/* Loader */
const loaderEl = document.querySelector(".load_container");
window.onload = function(){
  setTimeout(function(){
	loaderEl.style.opacity = 0;
	setTimeout(function(){
	  loaderEl.style.display = "none";
	}, 500);
  }, 1500);
} 

export function createGameCard(game) {
  const gameEl = document.createElement("div");
  gameEl.classList.add("game");
  gameEl.innerHTML = `
  <div id="card">
      <img src="${game.background_image}" alt="${game.name}" class="game-img" />
      <div class="game-info">
        <a href="../html/game.html?id=${game.id}">Ver más</a>
        <h3>${game.name}</h3>
        <span>${game.released}</span>
        <span>RATING ${game.rating}</span>
      </div>
      </div>
    `;
    const imagenes = game.background_image;
    const imagenaleatoria = imagenes[Math.floor(Math.random() * imagenes.length)];


const divimagen = document.querySelector("#div-imagen");
divimagen.style.backgroundImage = `url(${imagenaleatoria})`






  return gameEl;
}




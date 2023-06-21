export function createGameCard(game) {
  const { ratings } = game;
  const contenedorLista = document.createElement("div");
  contenedorLista.classList.add("contenedorLista");
  const ulEl = document.createElement("ul");
  ratings.forEach((rating) => {
    ulEl.innerHTML += `<li>${rating.title} ${rating.percent}</li>`;
  });

  const gameEl = document.createElement("div");
  gameEl.classList.add("game");
  gameEl.innerHTML = `
  <div id="card">
      <img src="${game.background_image}" alt="${game.name}" class="game-img" />
      <div class="contenedorLista">
      ${ulEl.outerHTML}
      </div>
      <div class="game-info">
        <a href="../html/game.html?id=${game.id}">Ver más</a>
        <h3>${game.name}</h3>
        <span>${game.released}</span>
        <span>RATING ${game.rating}</span>
      </div>
      </div>
    `;

  return gameEl;
}

export function createGameCard(game) {
  const gameEl = document.createElement("div");
  gameEl.classList.add("game");
  gameEl.innerHTML = `
      <img src="${game.background_image}" alt="${game.name}" class="game-img" />
      <div class="game-info">
        <a href="../html/game.html?id=${game.id}">Ver más</a>
        <h3>${game.name}</h3>
        <span>${game.released}</span>
        <span>RATING ${game.rating}</span>
      </div>
    `;

  return gameEl;
}

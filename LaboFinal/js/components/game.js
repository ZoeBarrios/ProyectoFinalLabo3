export function createGame(game) {
  const gameEl = document.createElement("div");
  gameEl.classList.add("game");
  gameEl.innerHTML = `
      <img src="${game.background_image}" alt="${game.name}" class="game-img" />
      <div class="game-info">
        <h3>${game.name}</h3>
        <span>${game.released}</span>
      </div>
    `;
  return gameEl;
}

export function createGameInfo(game) {
  const gameInfo = document.createElement("div");
  gameInfo.classList.add("game-info__container");
  gameInfo.innerHTML = `
        <h1>${game.name}</h1>
        <div class="game-info__image">
        <img src="${game.background_image}" alt="${game.name}" />
        </div>
        <div class="game-info__text">
        <h2>${game.name}</h2>
        <p>${game.description_raw}</p>
        </div>
    `;
  return gameInfo;
}

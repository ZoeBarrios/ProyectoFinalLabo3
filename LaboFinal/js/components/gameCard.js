export function createGameCard(game) {
  const { ratings } = game;

  const contenedorLista = document.createElement("div");
  contenedorLista.classList.add("contenedorLista");
  contenedorLista.style.display = "none";

  const ulEl = document.createElement("ul");
  ratings.forEach((rating) => {
    const liEl = document.createElement("li");

    /*CODIGO PARA EMOJIS*/
    /*<i class="fa-solid fa-star estrella"></i>*/
    let emoji = ``;

    if (rating.title == "meh") {
      emoji = `😐`;
    } else if (rating.title == "recommended") {
      emoji = `👍`;
    } else if (rating.title == "exceptional") {
      emoji = `😁`;
    } else if (rating.title == "skip") {
      emoji = `🤢`;
    }

    /*  liEl.textContent = `${rating.title} ${rating.percent.toFixed(2)}%`;*/
    liEl.innerHTML = `${emoji} ${rating.title} ${rating.percent.toFixed(
      2
    )}%    `;

    ulEl.appendChild(liEl);
  });

  contenedorLista.appendChild(ulEl);

  const gameEl = document.createElement("div");
  gameEl.classList.add("game");
  gameEl.innerHTML = `
    <div id="card">
    <div class="div">
    <img src="${game.background_image}" alt="${game.name}" class="game-img" />
 
      ${contenedorLista.outerHTML}
      <div>
      <div class="game-info">
        <a href="../html/game.html?id=${game.id}">More info</a>
        <h3>${game.name}</h3>
        <span>${game.released || ""}</span>
        <span><i class="fa-solid fa-star estrella"></i> ${
          game.rating || "0"
        }</span>
      </div>
    </div>
  `;

  return gameEl;
}

const URL = import.meta.env.VITE_API_URL;
const KEY = import.meta.env.VITE_API_KEY;

export async function getGames(pagina) {
  const response = await fetch(
    `${URL}games?page_size=200&page=${pagina}&key=${KEY}`
  );
  const data = await response.json();
  console.log(data);
  return data;
}

function getGame(id) {}

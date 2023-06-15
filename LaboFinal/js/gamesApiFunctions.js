const URL = import.meta.env.VITE_API_URL;
const KEY = import.meta.env.VITE_API_KEY;

export async function getGames(
  next = `${URL}games?page_size=40&page=1&key=${KEY}`
) {
  let response = await fetch(next);
  let data = await response.json();
  let results = data.results;

  return { results, data };
}

function getGame(id) {}

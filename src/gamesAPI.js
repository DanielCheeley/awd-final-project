const API_KEY = "744e07f523884fdf9edf24293f2b0130";
const BASE_URL = "https://api.rawg.io/api";

export async function searchGames(query) {
  const res = await fetch(
    `${BASE_URL}/games?key=${API_KEY}&search=${query}&tags_exclude=sexual-content&ordering=-added`
  );
  const data = await res.json();
  return data.results;
}

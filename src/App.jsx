import { useState, useEffect } from "react";
import "./App.css";
import { searchGames } from "./gamesAPI";
import SearchBar from "./components/SearchBar";
import GameList from "./components/GameList";
import WatchlistCarousel from "./components/WatchlistCarousel";

function App() {
  const [results, setResults] = useState([]);
  const [watchlist, setWatchlist] = useState(() => {
    // Initialize watchlist from localStorage if available
    const saved = localStorage.getItem("watchlist");
    return saved ? JSON.parse(saved) : [];
  });

  // Save watchlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  }, [watchlist]);

  // Filter out NSFW games before rendering not perfect but better than nothing
  const safeGames = results.filter(
    (game) =>
      !game.tags?.some((tag) =>
        tag.name.toLowerCase().includes("nsfw")
      )
  );

  const handleSearch = async (query) => {
    const games = await searchGames(query);
    setResults(games);
  };

  const addToWatchlist = (game) => {
    setWatchlist((prev) =>
      prev.some((g) => g.id === game.id) ? prev : [...prev, game]
    );
  };

  const removeFromWatchlist = (id) => {
    setWatchlist((prev) => prev.filter((game) => game.id !== id));
  };

  const updateWatchlistGame = (updatedGame) => {
  setWatchlist((prev) =>
    prev.map((game) =>
      game.id === updatedGame.id ? updatedGame : game
    )
  );
};



  return (
    <div className="container">
      <h1>Welcome To BlueSky!</h1>
      <em><p id="subtitle">-----A Home For All Your Wishlisted Games-----</p></em>

      <SearchBar onSearch={handleSearch} onClear={() => setResults([])} />

      {safeGames.length > 0 && (
        <GameList games={safeGames} onAdd={addToWatchlist} />
      )}

      {watchlist.length > 0 ? (
        <WatchlistCarousel watchlist={watchlist} onRemove={removeFromWatchlist} onEdit={updateWatchlistGame} />
      ) : (
        <p>Your wishlist is empty. Search and add a game to get started.</p>
      )}

      <footer>&copy; 2026 Daniel Cheeley | BlueSky &nbsp; All Rights Reserved.</footer>
    </div>
  );
}

export default App;

import GameCard from "./GameCard";
import './watchList.css';

function Watchlist({ watchlist, onRemove }) {
  return (
    <div>
      <h2>My Watchlist</h2>
      {watchlist.length === 0 && <p>No games added.</p>}

      <div className="games-grid">
      {watchlist.map((game) => (
        <GameCard
          key={game.id}
          game={game}
          actionText="Remove"
          onAction={() => onRemove(game.id)}
        />
      ))}
      </div>
    </div>
  );
}

export default Watchlist;

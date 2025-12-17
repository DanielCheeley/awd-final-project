import './GameCard.css';

function GameCard({ game, actionText, onAction }) {
  return (
    <div className="game-card">
      {/*game image*/}
      <div className="image-wrapper">
        <img src={game.background_image || "/placeholder.jpg"} alt={game.name} />
      </div>
      {/*game name*/}
      <h3>{game.name}</h3>
      {/*wishlist button*/}
      <button className='wishlistBtn' onClick={() => onAction(game)}>{actionText}</button>
  </div>

  );
}

export default GameCard;

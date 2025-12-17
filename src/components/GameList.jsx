import React, { useRef, useEffect, useState } from "react";
import GameCard from "./GameCard";
import "./gameList.css";

function GameList({ games, onAdd }) {
  const carouselRef = useRef();

  //scroll button viewing state
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);
  
    //update scroll button states based on scroll position
    const updateScrollButtons = () => {
    const el = carouselRef.current;
    if (!el) return;
  
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(
      el.scrollLeft + el.clientWidth < el.scrollWidth - 1
    );
  };
  
  //attach scroll event listener to update button states(using useEffect)
    useEffect(() => {
      const el = carouselRef.current;
      if (!el) return;
  
      updateScrollButtons();
      el.addEventListener("scroll", updateScrollButtons);
  
      return () => el.removeEventListener("scroll", updateScrollButtons);
    }, []);

  const scrollLeft = () => {
    carouselRef.current.scrollBy({ left: -600, behavior: "smooth" });
  };

  const scrollRight = () => {
    carouselRef.current.scrollBy({ left: 600, behavior: "smooth" });
  };

  return (
    <div className="carousel-wrapper">
      <h2>Search Results:</h2>

      {/*left scroll button*/}
      <button disabled={!canScrollLeft} className="scroll-btn left" onClick={scrollLeft}>◀</button>

      <div className="carousel" ref={carouselRef}>
        {games.map((game) => (
          <GameCard
            key={game.id}
            game={game}
            actionText="Add to Watchlist"
            onAction={onAdd}
          />
        ))}
      </div>

      {/*right scroll button*/}
      <button disabled={!canScrollRight} className="scroll-btn right" onClick={scrollRight}>▶</button>
    </div>
  );
}

export default GameList;

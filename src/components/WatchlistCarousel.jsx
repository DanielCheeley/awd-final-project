import React, { useRef, useState, useEffect } from "react";
import "./WatchlistCarousel.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagicWandSparkles, faSave, faTimes } from "@fortawesome/free-solid-svg-icons";

function WatchlistCarousel({ watchlist, onRemove, onEdit }) {
  const carouselRef = useRef();

  //edit state
  const [editingId, setEditingId] = useState(null);
  const [editedGame, setEditedGame] = useState({});

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

  const startEdit = (game) => {
    setEditingId(game.id);

    setEditedGame({
      ...game,
      genreText: game.genres?.map((g) => g.name).join(", ") || "",
    });
  };

  //save edited game details
  const saveEdit = () => {
    const updatedGame = {
      ...editedGame,
      genres: editedGame.genreText
        .split(",")
        .map((g) => ({ name: g.trim() })),
    };

    delete updatedGame.genreText;

    onEdit(updatedGame);
    setEditingId(null);
  };

  return (
    <div className="carousel-wrapper">
      <h2>Your Wishlist:</h2>

      {/*left scroll button*/}
      <button disabled={!canScrollLeft} className="scroll-btn left" onClick={scrollLeft}>◀</button>

      {/*turns watchlist into an array with editable fields*/}
      <div className="carousel" ref={carouselRef}>
        {watchlist.map((game) => {
          const isEditing = editingId === game.id;

          return (
            <div className="watchlist-card" key={game.id}>
              <div className="image-wrapper">
                <img src={game.background_image || "/placeholder.jpg"} alt={game.name} />
              </div>

              <div className="card-content">
                {isEditing ? (
                  <>
                    {/* name editing */}
                    <input
                      value={editedGame.name}
                      onChange={(e) =>
                        setEditedGame({ ...editedGame, name: e.target.value })
                      }
                    />

                    {/* genre editing */}
                    <input
                      placeholder="Genres (comma separated)"
                      value={editedGame.genreText}
                      onChange={(e) =>
                        setEditedGame({
                          ...editedGame,
                          genreText: e.target.value,
                        })
                      }
                    />

                    {/* Date editing */}
                    <input
                      value={editedGame.released || ""}
                      onChange={(e) =>
                        setEditedGame({
                          ...editedGame,
                          released: e.target.value,
                        })
                      }
                    />

                    {/* rating editing */}
                    <input
                      type="number"
                      step="0.1"
                      value={editedGame.rating || ""}
                      onChange={(e) =>
                        setEditedGame({
                          ...editedGame,
                          rating: e.target.value,
                        })
                      }
                    />

                    {/* list added editing */}
                    <input
                      type="number"
                      value={editedGame.added || ""}
                      onChange={(e) =>
                        setEditedGame({
                          ...editedGame,
                          added: e.target.value,
                        })
                      }
                    />

                    <button title="save" className="saveBtn" onClick={saveEdit}>
                      <FontAwesomeIcon icon={faSave} />
                    </button>

                    <button title="cancel" onClick={() => setEditingId(null)}>
                      <FontAwesomeIcon icon={faTimes} />
                    </button>
                  </>
                ) : (
                  <>
                    <h3>{game.name}</h3>

                    {game.genres && (
                      <p>
                        <strong>Genre:</strong>{" "}
                        {game.genres.map((g) => g.name).join(", ")}
                      </p>
                    )}

                    {game.released && (
                      <p><strong>Released:</strong> {game.released}</p>
                    )}

                    {game.rating && (
                      <p><strong>Rating:</strong> {game.rating}</p>
                    )}

                    {game.added && (
                      <p><strong>Added To:</strong> {game.added} User lists</p>
                    )}

                    <button onClick={() => onRemove(game.id)}>Remove</button>

                    <button title="edit" className="editBtn" onClick={() => startEdit(game)}>
                      <FontAwesomeIcon icon={faMagicWandSparkles} />
                    </button>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/*right scroll button*/}
      <button disabled={!canScrollRight} className="scroll-btn right" onClick={scrollRight}>▶</button>
    </div>
  );
}

export default WatchlistCarousel;

import { useState } from "react";
import './searchBar.css';

function SearchBar({ onSearch, onClear }) {
  const [query, setQuery] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (query.trim()) onSearch(query);
  };

  const handleClear = () => {
    setQuery(""); // Clear the input field
    onClear(); // Notify parent to clear results
  }

  return (
    <form onSubmit={submit}>
      <h2>Search For A Game To Add To Your WatchList</h2>
      <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search for games..." />
      <button>Search</button>
      <button onClick={handleClear}>Clear</button>
    </form>
  );
}

export default SearchBar;

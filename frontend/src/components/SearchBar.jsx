import "./SearchBar.css";

function SearchBar({ search, setSearch }) {
  return (
    <div className="search-box">
      <i className="fa-solid fa-magnifying-glass"></i>

      <input
        type="text"
        placeholder="Search courses..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;
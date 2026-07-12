function SearchBar({
  placeholder = "Search...",
  value,
  onChange
}) {
  return (
    <div className="mb-4">
      <div className="input-group">

        <span className="input-group-text">
          🔍
        </span>

        <input
          type="text"
          className="form-control"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />

      </div>
    </div>
  );
}

export default SearchBar;
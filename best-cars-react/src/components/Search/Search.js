import "./Search.css";
import { useState } from "react";

export default function Search({ handleSearchChange }) {
  const [searchText, setSearchText] = useState();

  const handleSearchTextChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleOnSearchButtonClick = () => {
    handleSearchChange(searchText);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearchChange(searchText);
    }
  };

  return (
    <div id="search-container">
      <input
        type="text"
        id="search-car"
        value={searchText}
        onChange={handleSearchTextChange}
        onKeyDown={handleKeyDown}
      />

      <button className="search-button" onClick={handleOnSearchButtonClick}>
        <i className="fas fa-search"></i>
      </button>
    </div>
  );
}

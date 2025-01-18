import "./Search.css";
import { useState } from "react";

export default function Search({ handleSearchChange, text }) {
  const [searchText, setSearchText] = useState(text);

  const handleSearchTextChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleOnSearchButtonClick = () => {
    handleSearchChange("name", searchText);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearchChange("name", searchText);
    }
  };

  return (
    <div id="search-container">
      <input
        type="text"
        id="search-car"
        name="name"
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

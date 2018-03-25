import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
const SearchBar = props => (
  <div className="search-books-bar">
    <Link to="/" className="close-search">
      Close
    </Link>
    <div className="search-books-input-wrapper">
      <input
        type="text"
        placeholder="Search by title or author"
        onChange={event => props.onUpdate(event.target.value)}
        value={props.queryString}
      />
    </div>
  </div>
);
export default SearchBar;

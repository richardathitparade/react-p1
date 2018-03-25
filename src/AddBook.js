import React from "react";
import { Link } from "react-router-dom";
const AddBook = props => (
  <div className="open-search">
    <Link to="/search" className="close-search">
      Add a book
    </Link>
  </div>
);
export default AddBook;

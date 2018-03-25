import React from "react";
import escapeRegExp from "escape-string-regexp";
import sortBy from "sort-by";
import SearchBar from "./SearchBar";
import * as BooksAPI from "./BooksAPI";
import Book from "./Book";
import PropTypes from 'prop-types';
class SearchResults extends React.Component {
  static propTypes = {
    categories: PropTypes.array.isRequired,
    refreshBooks: PropTypes.func.isRequired,
    books: PropTypes.array.isRequired
  }
  render() {
    const books = this.props.books.map(fb => (
      <li key={fb.id}>
        <Book
          categories={this.props.categories}
          id={fb.id}
          refreshBooks={this.props.refreshBooks}
          shelf={fb.shelf?fb.shelf:''}
          url={fb.imageLinks.thumbnail}
          title={fb.title}
          author={fb.authors?fb.authors.join(','):''}
        />
      </li>
    ));
    return (
      <div className="search-books-results">
        <ol className="books-grid">
          {books}
        </ol>
      </div>
    );
  }
}
export default SearchResults;

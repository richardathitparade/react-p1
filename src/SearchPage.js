import React from "react";
import escapeRegExp from "escape-string-regexp";
import sortBy from "sort-by";
import SearchBar from "./SearchBar";
import * as BooksAPI from "./BooksAPI";
import Book from "./Book";
import SearchResults from "./SearchResults";
import PropTypes from 'prop-types';
class SearchPage extends React.Component {
  static propTypes = {
    categories: PropTypes.array.isRequired,
    refreshBooks: PropTypes.func.isRequired,
    refreshSearch: PropTypes.func.isRequired,
    onClick:  PropTypes.func.isRequired,
    books: PropTypes.array.isRequired
  }
  state = {
    query: ""
  };
  updateQuery(s) {
    this.setState({
      query: s
    });
    this.props.refreshSearch(s);
  }
  render() {
    return (
      <div className="search-books">
        <SearchBar
          onClick={this.props.onClick}
          queryString={this.state.query}
          onUpdate={this.updateQuery.bind(this)}
        />
        <SearchResults
          books={this.props.books}
          categories={this.props.categories}
          refreshBooks={this.props.refreshBooks}
        />
      </div>
    );
  }
}
export default SearchPage;

import React from "react";
import sortBy from "sort-by";
import Shelf from "./Shelf";
import AddBook from "./AddBook";
import PropTypes from "prop-types";
class ShelfPage extends React.Component {
  static propTypes = {
    categories: PropTypes.array.isRequired,
    refreshBooks: PropTypes.func.isRequired,
    books: PropTypes.array.isRequired,
    turnOnSearch: PropTypes.func.isRequired
  };
  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <Shelf
            categories={this.props.categories}
            refreshBooks={this.props.refreshBooks}
            books={this.props.books}
            shelf="currentlyReading"
            shelfValue="Currently Reading"
          />
          <Shelf
            categories={this.props.categories}
            refreshBooks={this.props.refreshBooks}
            books={this.props.books}
            shelf="wantToRead"
            shelfValue="Want to Read"
          />
          <Shelf
            categories={this.props.categories}
            refreshBooks={this.props.refreshBooks}
            books={this.props.books}
            shelf="read"
            shelfValue="Read"
          />
        </div>
        <AddBook onClick={this.props.turnOnSearch} />
      </div>
    );
  }
}
export default ShelfPage;

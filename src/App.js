import React from "react";
// import * as BooksAPI from './BooksAPI'
import "./App.css";
import { Route } from "react-router-dom";
import SearchPage from "./SearchPage";
import ShelfPage from "./ShelfPage";
import Book from "./Book";
import * as BooksAPI from "./BooksAPI";
class BooksApp extends React.Component {
  state = {
    showSearchPage: false,
    books: [],
    bookHash: {},
    search_books: [],
    categories: [
      { value: "none", category: "None" },
      { value: "currentlyReading", category: "Currently Reading" },
      { value: "wantToRead", category: "Want to Read" },
      { value: "read", category: "Read" }
    ]
  };
  searchBooks(query) {
    BooksAPI.search(query).then(books => {
      if (books && typeof books.error === "undefined" && books.length > 0) {
        const { bookHash } = this.state;
        const updated_books = books.map(b => {
          if (bookHash[b.id] && bookHash[b.id].shelf) {
            b["shelf"] = bookHash[b.id].shelf;
          }
          return b;
        });
        this.setState({
          search_books: updated_books
        });
      } else {
        this.setState({
          search_books: []
        });
      }
    });
  }
  refreshBooks(id, val) {
    const { books, bookHash, search_books } = this.state;
    let books_ref = books;
    if (typeof bookHash.id === "undefined" && search_books.length > 0) {
      const sb = search_books.filter(fb => {
        if (fb.id === id) {
          return fb;
        }
      });
      books_ref = books.concat(sb);
      bookHash[sb[0].id] = sb[0];
    }
    let filtered_books = books_ref.filter(b => {
      if (b.id === id) {
        b.shelf = val;
        bookHash[b.id].shelf = val;
        BooksAPI.update(b, b.shelf);
      }
      return b;
    });
    this.setState({
      books: filtered_books,
      bookHash: bookHash
    });
  }
  componentDidMount() {
    let { books } = this.state;
    if (books.length === 0) {
      BooksAPI.getAll().then(bookz => {
        const bh = {};
        bookz.map(b => {
          let id_ = b.id;
          bh[id_] = b;
          return { id_: b };
        });
        this.setState({
          books: bookz,
          bookHash: bh
        });
      });
    }
  }
  turnOffSearch() {
    this.setState({
      showSearchPage: false,
      search_books: []
    });
  }
  turnOnSearch() {
    this.setState({
      showSearchPage: true
    });
  }
  render() {
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => (
            <div>
              <ShelfPage
                categories={this.state.categories}
                refreshBooks={this.refreshBooks.bind(this)}
                books={this.state.books}
                turnOnSearch={this.turnOnSearch.bind(this)}
              />
            </div>
          )}
        />
        <Route
          path="/search"
          render={() => (
            <div className="search-books">
              <SearchPage
                books={this.state.search_books}
                refreshSearch={this.searchBooks.bind(this)}
                refreshBooks={this.refreshBooks.bind(this)}
                categories={this.state.categories}
                onClick={this.turnOffSearch.bind(this)}
              />
            </div>
          )}
        />
      </div>
    );
  }
}

export default BooksApp;

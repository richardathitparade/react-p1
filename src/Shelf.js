import React from "react";
import Book from "./Book";
import PropTypes from 'prop-types';
class Shelf extends React.Component {
  static propTypes = {
    categories: PropTypes.array.isRequired,
    refreshBooks: PropTypes.func.isRequired,
    books: PropTypes.array.isRequired
  }
  render() {
    let filtered_books = this.props.books.filter(b => {
      if (b.shelf === this.props.shelf) {
        return b;
      }
    });
    let book_filter_map = {};
    const f_books = filtered_books.filter(f => {
      if(typeof book_filter_map[f.id] === 'undefined') {
        book_filter_map[f.id] = f;
        return f;
      }
    });
    const books = f_books.map(fb => (
      <li id={fb.id} key={fb.id}>
        <Book
          categories={this.props.categories}
          id={fb.id}
          refreshBooks={this.props.refreshBooks}
          shelf={fb.shelf}
          url={fb.imageLinks.thumbnail}
          title={fb.title}
          author={fb.authors?fb.authors.join(" ,"):''}
        />
      </li>
    ));
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.shelfValue}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid" key={this.props.shelf}>
              {books}
          </ol>
        </div>
      </div>
    );

  }
}
export default Shelf;

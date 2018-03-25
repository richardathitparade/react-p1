import React from "react";
import BookSelect from "./BookSelect";
import PropTypes from "prop-types";
class Book extends React.Component {
  static propTypes = {
    categories: PropTypes.array.isRequired,
    refreshBooks: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired
  };
  bookSelect = e => {
    const filtered_category = this.props.categories.filter(f => {
      if (e.target.value === f.value) {
        return f;
      }
    })[0];
    this.props.refreshBooks(this.props.id, filtered_category.value);
  };
  render() {
    const bgi = 'url("' + this.props.url + '")';
    const cat = this.props.categories.filter(f => {
      if (f.value === this.props.shelf) {
        return f;
      }
    })[0];

    return (
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{ width: 128, height: 193, backgroundImage: bgi }}
          />
          <BookSelect
            onChange={this.bookSelect.bind(this)}
            value={cat ? cat.value : "none"}
            categories={this.props.categories}
            category={cat ? cat.category : "None"}
          />
        </div>
        <div className="book-title">{this.props.title}</div>
        <div className="book-authors">{this.props.author}</div>
      </div>
    );
  }
}
export default Book;

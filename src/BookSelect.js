import React from 'react';
import PropTypes from 'prop-types';
class BookSelect extends React.Component {
  static propTypes = {
    categories: PropTypes.array.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    category:  PropTypes.string.isRequired
  }
    render() {
      const opts = this.props.categories.filter(cat => {
          if(cat.value !== this.props.value) {
            return cat;
          }
        });
        const options = opts.map((o) =>
          <option key={o.value} value={o.value}>
            {o.category}
          </option>
        );
        return(<div className="book-shelf-changer">
          <select onChange={this.props.onChange} value={this.props.value}>
            <option value="none" disabled>Move to...</option>
            <option value={this.props.value}>{this.props.category}</option>
            {options}
          </select>
        </div>);
    }
}
export default BookSelect;

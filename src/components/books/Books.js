import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchBooks } from '../../actions/books';

import Book from './Book';

class Books extends Component {

  /*state = {
    visibleNote: null,
  }

  onHeaderClick = (noteId) => {
    return (e) => {
      const visibleNote = this.state.visibleNote === noteId ? null : noteId;
      this.setState({ visibleNote });
    }
  }*/

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchBooks());
  }

  render() {
    
    const { isFetching, books } = this.props;

    if (isFetching) {
      return (
        <p>Sæki bækur..</p>
      );
    }
    console.log(books)
    return (
      <section>
        <h2>Bækur</h2>
        <ul>
          {books.map((book) => {
            console.log('Render', book.id)
            return (
              <Book
                key={book.id}
                title={book.title}
                
              />
            )
          })}
        </ul>
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isFetching: state.books.isFetching,
    books: state.books.books,
    error: state.books.error,
  }
}

export default connect(mapStateToProps)(Books);
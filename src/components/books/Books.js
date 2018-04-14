import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchBooks } from '../../actions/books';
import { NavLink } from 'react-router-dom'

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

  state = { 
    page: 1,
    offset: 0,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchBooks('/books'));
  }

  /*async componentDidUpdate(prevProps, prevState) {
    if (this.props.match.params !== prevProps.match.params) {
      this.setState({ loading: true });

    //const { dispatch } = this.props;
    //dispatch(fetchBooks(`/books?offset=${10 + this.state.offset}`));

      try {
        const books = await this.fetchBooks(`/books?offset=${10 + this.state.offset}`);
        this.setState({ books, loading: false });
      } catch (error) {
        console.error('Error fetching book', error);
        this.setState({ error: true, loading: false });
      }
    }
  }*/



  handleClick = async () => {
    const offset = this.state.offset + 10;
    const page = this.state.page + 1;
    this.setState({ offset, page });
    this.setState({ loading: true });
    const { dispatch } = this.props;
    dispatch(fetchBooks(`/books?offset=${10 + this.state.offset}`));
  }

  render() {
    const { isFetching, books } = this.props;

    if (isFetching) {
      return (
        <p>Sæki bækur..</p>
      );
    }
    

    return (
      <section>
        <h2>Bækur</h2>
        <ul>
          {books.map((book) => (
            <div>
              <h3 key={book.id}>
                <NavLink exact
                  to={`/books/${book.id}`}>
                  {book.title}
                </NavLink>
              </h3>
              <span>Eftir {book.author}</span>
              {book.published && (<span>, gefin út {book.published}</span>)}
            </div>
          ))}
        </ul>
        <span>Síða {this.state.page} </span>
        <button className="book_button" onClick={this.handleClick}>
          <NavLink exact
            to={`/books?offset=${10 + this.state.offset}`}>
            Næsta síða
          </NavLink>
        </button>
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


/*
<Book
                key={book.id}
                title={book.title}
                onClick={(this.onHeaderClick(book.id))}
              />
              */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchBooks } from '../../actions/books';
import { NavLink } from 'react-router-dom';

import Book from './Book';

const queryString = require('query-string');

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
    const query = this.props.location.search;
    console.log(this.props.location.search)
    const parsedQuery = queryString.parse(query);
    console.log(parsedQuery)
    if (query) {
      dispatch(fetchBooks(`/books?search=${parsedQuery.search}`));
    }
    else {
      dispatch(fetchBooks(`/books?offset=${this.state.offset}`));
    }
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
    let offset = this.state.offset + 10;
    const page = this.state.page + 1;
    this.setState({ offset, page });
    this.setState({ loading: true });
    const { dispatch } = this.props;
    offset = this.state.offset;
    console.log(offset)
    dispatch(fetchBooks(`/books?offset=${10 + this.state.offset}`));
  }

  handleClickPrevious = async () => {
    let offset = this.state.offset - 10;
    let page = this.state.page - 1;
    this.setState({ offset, page });
    this.setState({ loading: true });
    const { dispatch } = this.props;
    offset = this.state.offset;
    page = this.state.page;

    console.log(offset, page)

    if (this.state.page === 1) {
      dispatch(fetchBooks(`/books?offset=${this.state.offset}`));
    }
    else {
      dispatch(fetchBooks(`/books?offset=${10 + this.state.offset}`));
    }
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
        {this.state.page > 1 && 
          <button className="button" onClick={this.handleClickPrevious}>
          <NavLink exact
            to={`/books?offset=${this.state.offset - 10}`} className="pageLink">
            Fyrri síða
          </NavLink>
        </button>}
        <span>Síða {this.state.page} </span>
        <button className="button" onClick={this.handleClick}>
          <NavLink exact
            to={`/books?offset=${this.state.offset + 10}`} className="pageLink">
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
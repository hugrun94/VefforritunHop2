import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchBooks } from '../../actions/books';
import { NavLink } from 'react-router-dom';

import Book from './Book';
import './Books.css';

const queryString = require('query-string');

class Books extends Component {

  state = { 
    page: 1,
    offset: 0,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    const query = this.props.location.search;

    const parsedQuery = queryString.parse(query);

    if (query) {
      dispatch(fetchBooks(`/books?search=${parsedQuery.search}`));
    }
    else {
      dispatch(fetchBooks(`/books?offset=${this.state.offset}`));
    }
  }


  handleClick = async () => {
    let offset = this.state.offset + 10;
    const page = this.state.page + 1;

    this.setState({ offset, page });
    this.setState({ loading: true });

    const { dispatch } = this.props;
    offset = this.state.offset;
    dispatch(fetchBooks(`/books?offset=${this.state.offset+10}`));
  }

  handleClickPrevious = async () => {
    let offset = this.state.offset - 10;
    let page = this.state.page - 1;

    this.setState({ offset, page });
    this.setState({ loading: true });

    const { dispatch } = this.props;
    offset = this.state.offset;
    page = this.state.page;


    if (this.state.page === 1) {
      dispatch(fetchBooks(`/books?offset=${this.state.offset}`));
    }
    else {
      dispatch(fetchBooks(`/books?offset=${this.state.offset-10}`));
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
      <section className="wrapper">
        <h2>Bækur</h2><br></br>
        <ul>
          {books.map((book) => (
            <div key={book.id}>
              <h3>
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
            to={`/books?offset=${this.state.offset-10}`} className="pageLink">
            Fyrri síða
          </NavLink>
        </button>}
        <span>Síða {this.state.page} </span>
        <button className="button" onClick={this.handleClick}>
          <NavLink exact className="link_white"
            to={`/books?offset=${this.state.offset+10}`} className="pageLink">
              Næsta síða >
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

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchBooks } from '../../actions/books';
import { NavLink } from 'react-router-dom'


class Search extends Component {

    static propTypes = {        
        match: PropTypes.shape({
          params: PropTypes.shape({
            query: PropTypes.string,
          }),
        }),
      }

    async componentDidMount() {
        const {
            match: {
            params: {
                query = '',
            } = {},
            } = {},
        } = this.props;
        const { dispatch } = this.props;
        dispatch(fetchBooks(`/books?search=${query}`));
    }

  state = { 
    page: 1,
    offset: 0,
  };


  handleClick = async () => {
    const offset = this.state.offset + 10;
    const page = this.state.page + 1;
    this.setState({ offset, page });
    this.setState({ loading: true });
    const { dispatch } = this.props;
    dispatch(fetchBooks(`/books?offset=${10 + this.state.offset}`));
  }

  handleClickPrevious = async () => {
    const offset = this.state.offset - 10;
    const page = this.state.page - 1;
    this.setState({ offset, page });
    this.setState({ loading: true });
    const { dispatch } = this.props;
    dispatch(fetchBooks(`/books?offset=${10 + this.state.offset}`));
  }

  render() {
    const { isFetching, booksResult } = this.props;


    if (isFetching) {
      return (
        <p>Sæki bækur..</p>
      );
    }
    
    return (
      <section>
        <h2>Bækur</h2>
        <ul>
          {booksResult.map((book) => (
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
        </ul><br></br><br></br>
        {this.state.page > 1 && 
          <button className="previous" onClick={this.handleClickPrevious}>
          <NavLink exact
            to={`/books?offset=${10 + this.state.offset}`}>
            Fyrri síða
          </NavLink>
        </button>}
        <span>Síða {this.state.page} </span>
        <button className="button" onClick={this.handleClick}>
          <NavLink exact className="link_white"
            to={`/books?offset=${10 + this.state.offset}`}>
              Næsta síða >
          </NavLink>
        </button>
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isFetching: state.search.isFetching,
    booksResult: state.search.booksResult,
    error: state.search.error,
  }
}

export default connect(mapStateToProps)(Search);
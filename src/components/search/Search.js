import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchBooks } from '../../actions/books';
import { NavLink } from 'react-router-dom'


class Search extends Component {

    static propTypes = {
        //title: PropTypes.string,
        
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
        //dispatch(fetchBooks(`/books?search=${query}`));
    }

  state = { 
    page: 1,
    offset: 0,
  };

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

    console.log('search')

    if (isFetching) {
      return (
        <p>Sæki bækur..</p>
      );
    }
    
    console.log(booksResult)

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
        </ul>
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


/*
<Book
                key={book.id}
                title={book.title}
                onClick={(this.onHeaderClick(book.id))}
              />
              */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchBook } from '../../actions/books';
import { NavLink } from 'react-router-dom';
import { updateReadBooks } from '../../actions/users';

import './Books.css';

//const url = process.env.REACT_APP_SERVICE_URL;

class Book extends Component {
  static propTypes = {
    title: PropTypes.string,
    
    match: PropTypes.shape({
      params: PropTypes.shape({
        book: PropTypes.string,
      }),
    }),
  }

  state = {
    loading: true,
    isRating: false,
  }

  async componentDidMount() {
    const {
      match: {
        params: {
          book = '',
        } = {},
      } = {},
    } = this.props;
    const { dispatch } = this.props;
    dispatch(fetchBook(`/books/${book}`));
  }


  handleClickRead = async () => {
    // Hér á að bætast við að notandi hafi lesið þessa bók
    
    const {readBooks, dispatch}  = this.props;
    let { isRating } = this.state;
    isRating = true;
    this.setState({ isRating });
    dispatch(updateReadBooks())
    // actions -> readBooks.push()
    // gera setstate

    /*const offset = this.state.offset - 10;
    const page = this.state.page - 1;
    this.setState({ offset, page });
    this.setState({ loading: true });
    const { dispatch } = this.props;
    dispatch(fetchBooks(`/books?offset=${10 + this.state.offset}`));*/
  }

  render() {
    const { book, loading, error } = this.props;

    const { isRating } = this.state;

    if (loading) {
      return (<div>Sæki bók</div>);
    }

    if (error) {
      return (<div>Villa við að sækja bók</div>);
    }
    const { title,  } = this.props;
  

    return (
      <section className="book">
        <li className="book">
          <h3 className="book__header">{book.title}</h3>
          <p>Eftir {book.author}</p>
          <p>ISBN13: {book.isbn13}</p>
          <p>{book.categorytitle}</p>
          <p>{book.description}</p>
          <p>{book.pagecount} síður</p>
          <p>Gefin út {book.published}</p>
          <p>Tungumál: {book.language}</p>
        </li>

        <NavLink exact
          to={`/books/${book.id}/edit`}
          params={{book }}>
          Breyta bók
        </NavLink><br></br>
 
        {!isRating && (<button className="button" onClick={this.handleClickRead}>
          Lesin bók
        </button>)}
        
        

        <br></br>
      
        <button className="button">
          <NavLink to="../books">
          Til baka
          </NavLink>
        </button>
      </section>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    isFetching: state.books.isFetching,
    book: state.books.book,
    error: state.books.error,
    isAuthenticated: state.users.isAuthenticated,
    readBooks: state.users.readBooks,
  }
}

export default connect(mapStateToProps)(Book);

// asdf útfæra lesin bók
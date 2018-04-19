import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchBook } from '../../actions/books';
import { NavLink, Route, Redirect } from 'react-router-dom';
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
    markReadDone: false,
    review: '',
    rating: 1,
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name) {
      this.setState({ [name]: value });
    }
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
    let { isRating } = this.state;
    isRating = true;
    this.setState({ isRating });   
  }

  handleRatingChange = (e) => {
    const { rating } = this.state;
    this.setState({ rating: e.target.value });
  }


  handleClickMarkRead = async () => {
    const { dispatch } = this.props;
    let { review, rating, markReadDone } = this.state;
    const { book } = this.props;
    markReadDone = true;
    this.setState({ markReadDone });
    rating = Number(rating);
    dispatch(updateReadBooks(book.id, review, rating));
  }

  handleClickCancel = async () => {    
    let { isRating, markReadDone } = this.state;
    isRating = false;
    this.setState({ isRating });
  }


  render() {
    const { book, loading, error,isAuthenticated } = this.props;
    console.log(isAuthenticated)

    const { isRating, review, rating, markReadDone } = this.state;

    if (loading) {
      return (<div>Sæki bók</div>);
    }

    if (error) {
      return (<div>Villa við að sækja bók</div>);
    }
    const { title,  } = this.props;

    return (
      <section className="wrapper">
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

        {isAuthenticated && (
        <NavLink exact
          to={`/books/${book.id}/edit`}
          params={{book }}>
          Breyta bók
        </NavLink>)}
        <br></br>
 
        {isAuthenticated && !isRating && !markReadDone && (
        <button className="button" onClick={this.handleClickRead}>
          Lesin bók
        </button>
        )}

        <br></br>
        
        {isRating && !markReadDone && (
          <div>
          <form>
            <label htmlFor="review">Um bók:</label>
            <br></br>
            <input id="review" type="text" name="review" value={review} onChange={this.handleInputChange} />
          </form>

          
          <label htmlFor="rating">Einkunn:</label>
            <select id="rating" onChange={this.handleRatingChange} value={rating}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>

            <br></br>

            <button className="book_button" onClick={this.handleClickMarkRead}>
              Vista
            </button>

            <button className="button_delete" onClick={this.handleClickCancel}>
              Hætta við
            </button>
          </div>
        )}

        {markReadDone && (
          <p>Lestur skráður</p>
        )}
        
      
        <button className="button">
          <NavLink className="link_white" to="../books">
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
    isAuthenticated: state.auth.isAuthenticated,
    readBooks: state.users.readBooks,
  }
}

export default connect(mapStateToProps)(Book);
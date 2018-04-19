import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchBook } from '../../actions/books';
import { NavLink, Route, Redirect } from 'react-router-dom';
import { updateReadBooks } from '../../actions/users';

//import './Book.css';

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
    review: '',
    rating: 1,
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;

    console.log('HALLLLLLLLLLO')

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
    let { review, rating } = this.state;
    const { book } = this.props;
    rating = Number(rating);
    dispatch(updateReadBooks(book.id, review, rating));
  }

  handleClickCancel = async () => {    
    let { isRating } = this.state;
    isRating = false;
    this.setState({ isRating });
  }


  render() {
    const { book, loading, error } = this.props;

    const { isRating, review, rating } = this.state;

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
 
        {!isRating && (
        <button className="book_button" onClick={this.handleClickRead}>
          Lesin bók
        </button>
        )}

        <br></br>
        
        {isRating && (
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
            <NavLink to={`/books`}>
              Vista
            </NavLink>
            </button>

            <button className="book_button" onClick={this.handleClickCancel}>
              Hætta við
            </button>
          </div>
        )}

        
      
        <button className="book_button">
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
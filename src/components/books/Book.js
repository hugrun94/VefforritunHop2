import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchBook } from '../../actions/books';
import { NavLink } from 'react-router-dom';


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
    /*try {
      const book = await this.fetchBook();
      this.setState({ book, loading: false });
    } catch (error) {
      console.error('Error fetching book', error);
      this.setState({ error: true, loading: false });
    }*/
  }


  /*fetchBook = async () => {
    const {
      match: {
        params: {
          book = '',
        } = {},
      } = {},
    } = this.props;
    const response = await fetch(`${url}/books/${book}`);
    const data = await response.json();
    return data;
  }*/



  render() {
    const { book, loading, error } = this.props;

    if (loading) {
      return (<div>Sæki bók</div>);
    }

    if (error) {
      return (<div>Villa við að sækja bók</div>);
    }
    const { title,  } = this.props;
    
    //console.log(book)

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
  //console.log(state.books)
  return {
    isFetching: state.books.isFetching,
    book: state.books.book,
    error: state.books.error,
  }
}

export default connect(mapStateToProps)(Book);

// asdf útfæra lesin bók
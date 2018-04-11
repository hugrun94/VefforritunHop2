import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';


//import './Book.css';

const url = process.env.REACT_APP_SERVICE_URL;

export default class Book extends Component {
  static propTypes = {
    title: PropTypes.string,
    
    match: PropTypes.shape({
      params: PropTypes.shape({
        book: PropTypes.string,
      }),
    }),
  }

  state = {
    bookData: null,
    loading: true,
  }

  async componentDidMount() {
    try {
      const bookData = await this.fetchBook();
      this.setState({ bookData, loading: false });
    } catch (error) {
      console.error('Error fetching book', error);
      this.setState({ error: true, loading: false });
    }
  }


  fetchBook = async () => {
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
  }



  render() {
    const { bookData, loading, error } = this.state;

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
          <h3 className="book__header">{bookData.title}</h3>
          <p>Eftir {bookData.author}</p>
          <p>ISBN13: {bookData.isbn13}</p>
          <p>{bookData.categorytitle}</p>
          <p>{bookData.description}</p>
          <p>{bookData.pagecount} síður</p>
          <p>Gefin út {bookData.published}</p>
          <p>Tungumál: {bookData.language}</p>
        </li>

        <NavLink exact
          to={`/books/${bookData.id}/edit`}>
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

// asdf útfæra lesin bók
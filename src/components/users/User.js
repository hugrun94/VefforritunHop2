import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchUser, fetchUserBooks } from '../../actions/users';
import { fetchBooks } from '../../actions/books';

import { NavLink } from 'react-router-dom';

/** 
 * Slóðin er /users/:id
 * 
 * Hér þarf að vera:
 * Nafn notanda og lítil mynd
 * 
 * User hefur: name, picture, readBooks (fylki)
 *  readBooks hefur: title, rating (int), umsögn
 * 
 * "Lesnar bækur" - hér á eftir kemur listi af bókum
 * -Titill bókar
 * -Einkunn og lítil umsögn, nokkur orð
 */

const url = process.env.REACT_APP_SERVICE_URL;

class User extends Component {
  static propTypes = {
    name: PropTypes.string,
    
    match: PropTypes.shape({
      params: PropTypes.shape({
        user: PropTypes.string,
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
          user = '',
        } = {},
      } = {},
    } = this.props;

    const { dispatch } = this.props;
    dispatch(fetchUser(`/users/${user}`));
    dispatch(fetchUserBooks(`/users/${user}/read`));
    dispatch(fetchBooks('/books'));
  }




  render() {
    const { user, readBooks, isFetching, error, books } = this.props;
    // asdf gera þetta allt bara ef isAuthenticated er true!!
    let bookTitles = []
    for (let i = 0; i < readBooks.length; i++) {
      for (let j = 0; j < books.length; j++) {
        if (readBooks[i].book_id === books[j].id) {
          bookTitles.push({ 
            book_id: books[j].id, 
            book_title: books[j].title,
            rating: readBooks[i].rating,
            review: readBooks[i].review, 
          });
          break;
        }
      }
    }

    console.log(readBooks)

    if (isFetching) {
      return (<div>Sæki notanda</div>);
    }

    if (error) {
      return (<div>Villa við að sækja notanda</div>);
    }


    return (
      <section className="user">
      <h3 className="user__header">{user.name}</h3>
      <h3 className="read__books">Lesnar bækur</h3>
        <ul>
          {bookTitles.map((book) => (
            <div>
              <h3 key={book.book_id}>
                <NavLink exact
                    to={`/books/${book.book_id}`}>
                    {book.book_title}
                </NavLink>
              </h3>
              <p>Einkunn: {book.rating}. {book.review}</p>
            </div>
          ))}
        </ul>


        <button className="user_button">
          <NavLink to="../users">
          Til baka í notendur
          </NavLink>
        </button>
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isFetching: state.users.isFetching,
    user: state.users.user,
    error: state.users.error,
    readBooks: state.users.readBooks,
    books: state.books.books,
  }
}

export default connect(mapStateToProps)(User);

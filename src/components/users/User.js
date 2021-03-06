import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchUser, fetchUserBooks } from '../../actions/users';
import { fetchBooks } from '../../actions/books';

import { NavLink } from 'react-router-dom';


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


    if (isFetching) {
      return (<div>Sæki notanda</div>);
    }

    if (error) {
      return (<div>Villa við að sækja notanda</div>);
    }


    return (
      <section className="wrapper">
      <h2 className="user__header">{user.name}</h2><br></br>
      <h2 className="read__books">Lesnar bækur</h2><br></br>
        <ul>
          <li>
          {bookTitles.map((book) => (
            <div >
              <h3 key={book.book_id}>
                <NavLink exact
                    to={`/books/${book.book_id}`}>
                    {book.book_title}
                </NavLink>
              </h3>
              <p>Einkunn: {book.rating}</p>
              <br></br>
              <p>Um bókina: {book.review}</p>
            </div>
          ))}
          </li>
        </ul>


        <button className="button">
        <NavLink className="link_white" to="../users">
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

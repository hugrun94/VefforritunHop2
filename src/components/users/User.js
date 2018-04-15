import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchUser, fetchUserBooks } from '../../actions/users';
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
    
    // asdf hvað er match og params?
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
    console.log('notandi',user)
    const { dispatch } = this.props;
    dispatch(fetchUser(`/users/${user}`));
    dispatch(fetchUserBooks(`/users/${user}/read`));
  }



  render() {
    const { user, readBooks, isFetching, error, books } = this.props;

    console.log(books)

    if (isFetching) {
      return (<div>Sæki notanda</div>);
    }

    if (error) {
      return (<div>Villa við að sækja notanda</div>);
    }

    const { name } = this.props;

    return (
      <section className="user">
      <h3 className="user__header">{user.name}</h3>
      <h3 className="read__books">Lesnar bækur</h3>
        <ul>
          {readBooks.map((book) => (
            <div>
              <h3 key={book.book_id}>
                <NavLink exact
                    to={`/books/${book.id}`}>
                    {book.book_id}
                </NavLink>
              </h3>
            </div>
          ))}
        </ul>
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

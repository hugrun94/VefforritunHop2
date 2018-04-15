import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUser, fetchUserBooks } from '../../actions/users';
import { fetchBooks } from '../../actions/books';
import { NavLink } from 'react-router-dom';

class Profile extends Component {

  handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name) {
      this.setState({ [name]: value });
    }
  }


  async componentDidMount() {

    const { dispatch } = this.props;
    dispatch(fetchUser(`/users/me`));
    dispatch(fetchUserBooks(`/users/me/read`));
    dispatch(fetchBooks('/books'));
  }

  render() {

    const { isAdding, user, errors, readBooks, books } = this.props;

    const userLoggedIn = window.localStorage.getItem('user');
    console.log(userLoggedIn)

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

    return (
      <div>
        <h2>Upplýsingar</h2>

        <form action="../profile">
          <input type="file" name="pic" accept="image/*"/>
          <input type="submit"/>
        </form>

        <form onSubmit="../profile">

          <div>
            <label htmlFor="name">Nafn:</label>
            <input id="name" type="text" name="name" onChange={this.handleInputChange} />
          </div>

          <button disabled={isAdding}>Uppfæra nafn</button>

        </form>

        <form onSubmit={this.handleSubmit}>

          <div>
            <label htmlFor="password">Lykilorð:</label>
            <input id="password" type="text" name="password" onChange={this.handleInputChange} />
          </div>

          <div>
            <label htmlFor="password2">Lykilorð, aftur:</label>
            <input id="password2" type="text" name="password2" onChange={this.handleInputChange} />
          </div>

          <button disabled={isAdding}>Uppfæra lykilorð</button>

        </form>

        <h3>Lesnar bækur</h3>
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

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  //console.log(state.books.book)
  return {
    isAdding: state.users.isAdding,
    user: state.users.user,
    readBooks: state.users.readBooks,
    errors: state.users.errors,
    books: state.books.books,
    isAuthenticated: state.users.isAuthenticated,
  }
}

export default connect(mapStateToProps)(Profile);

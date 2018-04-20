import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUser, fetchUserBooks, deleteReadBooks, addUserPhoto } from '../../actions/users';
import { fetchBooks } from '../../actions/books';
import { editUsername, editPassword } from '../../actions/register';
import { logoutUser } from '../../actions/auth';
import { NavLink } from 'react-router-dom';


class Profile extends Component {

  state = {
    username: '',
    password: '',
    password2: '',
    photo: null,
    deleteRead: false,
  }

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

  handleSubmitName = async (e) => {
    e.preventDefault();

    const { dispatch } = this.props;
    const { username } = this.state; 

    localStorage.setItem('user', username);

    dispatch(editUsername(username));

  }

  handleChange = async (e) => {
    const { files } = e.target;
    this.setState({ 
      photo: files[0],
    })
  }

  handleSubmitPhoto = (e) => {
    e.preventDefault();

    const { photo } = this.state;
    const { dispatch } = this.props;
    dispatch(addUserPhoto(photo));
  }

  handleSubmitPassword = async (e) => {
    e.preventDefault();

    const { dispatch } = this.props;
    const { password, password2 } = this.state;    
    
    if (password === password2) {
      dispatch(editPassword(password));
    }
  }

  handleClickDelete = async (bookId) => {
    const { dispatch } = this.props;
    let { deleteRead } = this.state;

    deleteRead = true;
    this.setState({ deleteRead });
    dispatch(deleteReadBooks(bookId));
  }

  logout = async () => {
    const { dispatch } = this.props;
    dispatch(logoutUser());
  }

  render() {

    const { isAdding, error, readBooks, books } = this.props;
    const { username, photo } = this.state;

    if (error) {
      this.logout();
    }

    let bookTitles = []
    for (let i = 0; i < readBooks.length; i++) {
      for (let j = 0; j < books.length; j++) {
        if (readBooks[i].book_id === books[j].id) {
          bookTitles.push({ 
            book_id: books[j].id, 
            book_title: books[j].title,
            rating: readBooks[i].rating,
            review: readBooks[i].review,
            readBookId: readBooks[i].id, 
          });
          break;
        }
      }
    }

    return (
      <div className="wrapper">
        <h2>Upplýsingar</h2>

        <form onSubmit={this.handleSubmitPhoto}>
          <input type="file" onChange={this.handleChange}/>
          <button disabled={!photo}>Submit</button>

        </form>

        <form className="even_form" onSubmit={this.handleSubmitName}>

          <div>
            <label htmlFor="username">Nafn:</label>
            <input id="username" type="text" name="username" value={username} onChange={this.handleInputChange} />
          </div>

          <button className="button" disabled={isAdding}>Uppfæra nafn</button>

        </form>

        <form className="even_form" onSubmit={this.handleSubmitPassword}>

          <div>
            <label htmlFor="password">Lykilorð:</label>
            <input id="password" type="password" name="password" onChange={this.handleInputChange} />
          </div>

          <div>
            <label htmlFor="password2">Lykilorð, aftur:</label>
            <input id="password2" type="password" name="password2" onChange={this.handleInputChange} />
          </div>

          <button className="button" disabled={isAdding}>Uppfæra lykilorð</button>

        </form>

        <h3>Lesnar bækur</h3>
        <ul>
          {bookTitles.map((book) => (
            
              <li key={book.book_id}>
                <h3>
                  <NavLink exact
                      to={`/books/${book.book_id}`}>
                      {book.book_title}
                  </NavLink>
                </h3>
                <p>Einkunn: {book.rating}</p>
                {book.review && (
                  <p>Um bókina: {book.review}</p>
                )}

                <button className="button_delete" onClick={() => this.handleClickDelete(book.readBookId)}>
                  Eyða
                </button>
              </li>
            
          ))}
        </ul>

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAdding: state.users.isAdding,
    user: state.users.user,
    readBooks: state.users.readBooks,
    photo: state.users.photo,
    error: state.users.error,
    books: state.books.books,
    isAuthenticated: state.users.isAuthenticated,
  }
}

export default connect(mapStateToProps)(Profile);

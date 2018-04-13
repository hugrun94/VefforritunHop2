import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addBook } from '../../actions/books';
import { NavLink } from 'react-router-dom'
//import { recieveLogin } from '../../actions/auth';

class AddBook extends Component {

  handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name) {
      this.setState({ [name]: value });
    }
  }

  handleSubmit = async (e) => {
    e.preventDefault();

    const { dispatch } = this.props;
    const { title, author, descr, ISBN10, ISBN13, category, published, pagecount, language, categorytitle } = this.props;

    let token = localStorage.getItem('user');

    console.log(token)
    //dispatch(recieveLogin(token));
    
    const { isAuthenticated } = this.props;
    console.log(isAuthenticated)

    if (isAuthenticated) {
      dispatch(addBook(title, author, descr, ISBN10, ISBN13, category, published, pagecount, language, categorytitle));
    }
  }

  render() {
    //const { title, author, descr, ISBN10, ISBN13, category, published, pagecount, language, categorytitle } = this.state;
    const { isAdding, book, errors } = this.props;

    //console.log(book)

    if (isAdding) {
      return (
        <p>Skrái bók...</p>
      );
    }

    return (
      <div>
        {/*errors && (
          <ul>{errors.map((error, i) => (
            <li key={i}>
              {error.message}
            </li>
          ))}</ul>
        )*/}

        <form onSubmit={this.handleSubmit}>

          <div>
            <label htmlFor="title">Titill:</label>
            <input id="title" type="text" name="title" value={book.title} onChange={this.handleInputChange} />
          </div>

          <div>
            <label htmlFor="author">Höfundur:</label>
            <input id="author" type="text" name="author" value={book.author} onChange={this.handleInputChange} />
          </div>
          
          <div>
            <label htmlFor="descr">Lýsing:</label>
            <input id="descr" type="text" name="descr" value={book.description} onChange={this.handleInputChange} />
          </div>

          <div>
          <label htmlFor="category">Flokkur:</label>
            <select name="category">
              <option value="fiction">Fiction</option>
              <option value="fantasy">Fantasy</option>
              <option value="computerScience">Computer Science</option>
              <option value="design">Design</option>
              <option value="psychology">Psychology</option>
              <option value="nonfiction">Nonfiction</option>
              <option value="business">Business</option>
              <option value="economics">Economics</option>
              <option value="horror">Horror</option>
              <option value="graphicNovel">Graphic Novel</option>
            </select>
          </div>

          <div>
            <label htmlFor="ISBN10">ISBN10:</label>
            <input id="ISBN10" type="text" name="ISBN10" value={book.isbn10} onChange={this.handleInputChange} />
          </div>

          <div>
            <label htmlFor="ISBN13">ISBN13:</label>
            <input id="ISBN13" type="text" name="ISBN13" value={book.isbn13} onChange={this.handleInputChange} />
          </div>

          <div>
            <label htmlFor="published">Útgefin:</label>
            <input id="published" type="text" name="published" value={book.published} onChange={this.handleInputChange} />
          </div>

          <div>
            <label htmlFor="pagecount">Fjöldi síða:</label>
            <input id="pagecount" type="text" name="pagecount" value={book.pagecount} onChange={this.handleInputChange} />
          </div>

          <div>
            <label htmlFor="language">Tungumál:</label>
            <input id="language" type="text" name="language" value={book.language} onChange={this.handleInputChange} />
          </div>
          

          <button disabled={isAdding}>Vista</button>
        </form>

        <button className="book_button">
          <NavLink to={`../${book.id}`}>
          Til baka
          </NavLink>
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  //console.log(state.books.book)
  return {
    isAdding: state.books.isAdding,
    book: state.books.book,
    errors: state.books.errors,
    isAuthenticated: state.books.isAuthenticated,
  }
}

export default connect(mapStateToProps)(AddBook);
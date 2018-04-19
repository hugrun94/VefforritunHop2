import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addBook, editBook } from '../../actions/books';
import { NavLink } from 'react-router-dom'
//import { recieveLogin } from '../../actions/auth';

class AddBook extends Component {

  state = {
    title: '',
    author: '',
    description: '',
    isbn10: '',
    isbn13: '',
    category: '',
    published: '',
    pagecount: '',
    language: '',
    categorytitle: '',
  }



  handleInputChange = (e) => {

    const { name, value } = e.target;
    this.setState({[name]: value });

  }

  handleSubmit = async (e) => {
    e.preventDefault();

    const { dispatch } = this.props;
    const { title, author, description, category, published, pagecount, language, categorytitle } = this.state;


    const { path } = this.props.match;

    const { book } = this.props.match.params;

    const { isbn10, isbn13 } = this.props.book;

    
    
    let token = localStorage.getItem('user');

    console.log(token)
    //dispatch(recieveLogin(token));
    

    if (path === '/books/new') {
      dispatch(addBook(title, author, description, isbn10, isbn13, 12, published, pagecount, language, categorytitle));
    }else if(path === "/books/:book/edit"){
      console.log(book)
      dispatch(editBook(book, title, author, description, isbn10, isbn13, 12, published, pagecount, language, categorytitle));

    }
  
  }
   /* componentDidMount() {
    const {book} = this.props;

    const { path } = this.props.match;
    
    let { title, author, descr, ISBN10, ISBN13, category, published, pagecount, language, categorytitle } = this.state;
    if(path === "/books/:book/edit" ){
      this.setState({[title]: book.title})
    }

  }*/

  render() {
    //const { title, author, descr, ISBN10, ISBN13, category, published, pagecount, language, categorytitle } = this.state;
    const { isAdding,book, errors } = this.props;
    console.log(book.title)

    //let { title, author, description, isbn10, isbn13, category, published, pagecount, language, categorytitle } = this.state;
    const { 
      title,
      author,
      description,
      isbn10,
      isbn13,
      published,
      pagecount,
      language,
    } = book;


    console.log(this.props.match)
    //console.log(book)

    if (isAdding) {
      return (
        <p>Skrái bók...</p>
      );
    }
    //ASDF ekki harðkóða categories!
    return (
      <div>
        {errors && (
          <ul>{errors.map((error, i) => (
            <li key={i}>
              {error.message}
            </li>
          ))}</ul>
        )}

        <form onSubmit={this.handleSubmit}>

          <div>
            <label htmlFor="title">Titill:</label>
            <input id="title" type="text" name="title" value={this.state.title} onChange={this.handleInputChange} />
          </div>

          <div>
            <label htmlFor="author">Höfundur:</label>
            <input id="author" type="text" name="author" value={this.state.author} onChange={this.handleInputChange} />
          </div>
          
          <div>
            <label htmlFor="description">Lýsing:</label>
            <input id="description" type="text" name="description" value={this.state.description} onChange={this.handleInputChange} />
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
            <label htmlFor="isbn10">ISBN10:</label>
            <input id="isbn10" type="text" name="isbn10" value={isbn10} onChange={this.handleInputChange} />
          </div>

          <div>
            <label htmlFor="isbn13">ISBN13:</label>
            <input id="isbn13" type="text" name="isbn13" value={isbn13} onChange={this.handleInputChange} />
          </div>

          <div>
            <label htmlFor="published">Útgefin:</label>
            <input id="published" type="text" name="published" value={this.state.published} onChange={this.handleInputChange} />
          </div>

          <div>
            <label htmlFor="pagecount">Fjöldi síða:</label>
            <input id="pagecount" type="text" name="pagecount" value={this.state.pagecount} onChange={this.handleInputChange} />
          </div>

          <div>
            <label htmlFor="language">Tungumál:</label>
            <input id="language" type="text" name="language" value={this.state.language} onChange={this.handleInputChange} />
          </div>
          

          <button disabled={isAdding}>Vista</button>
        </form>

        <button className="button"> 
        <NavLink className="link_white" to={`../${book.id}`}>
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
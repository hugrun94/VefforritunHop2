import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addBook, editBook, fetchCategories } from '../../actions/books';
import { NavLink } from 'react-router-dom'

// eslint-disable-next-line
import Button from '../button';

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

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCategories('/categories'));
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({[name]: value });

  }

  handleCategoryChange = (e) => {
    this.setState({ category: e.target.value });
  }

  handleSubmit = async (e) => {
    e.preventDefault();

    const { dispatch } = this.props;
    const { title, author, description, published, pagecount, language, categorytitle } = this.state;


    const { path } = this.props.match;

    if (path === '/books/new') {
      const { isbn10, isbn13 } = this.state;
      dispatch(addBook(title, author, description, isbn10, isbn13, 12, published, pagecount, language, categorytitle));
    }else if(path === "/books/:book/edit"){
      const { book } = this.props.match.params;
      const { isbn10, isbn13 } = this.props.book;
      dispatch(editBook(book, title, author, description, isbn10, isbn13, 12, published, pagecount, language, categorytitle));
    }
  
  }

  render() {
    const { isAdding, book, errors } = this.props;
    const { category } = this.state;
    
    const { 
      isbn10,
      isbn13,
    } = book;

    if (isAdding) {
      return (
        <p>Skrái bók...</p>
      );
    }
    
    return (
      <div className="wrapper">
        {errors && (
          <ul>{errors.map((error, i) => (
            <li key={i}>
              {error.message}
            </li>
          ))}</ul>
        )}

        <form className="even_form" onSubmit={this.handleSubmit}>

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
            <select id="category" onChange={this.handleCategoryChange} value={category}>
              <option value="Comic">Comic</option>  
              <option value="Fantasy">Fantasy</option> 
              <option value="Computer Science">Computer Science</option>               
              <option value="Fiction">Fiction</option>  
              <option value="Psychology">Psychology</option>  
              <option value="Science Fiction">Science Fiction</option>  
              <option value="Business">Business</option>  
              <option value="Nonfiction">Nonfiction</option>  
              <option value="Design">Design</option>  
              <option value="Horror">Horror</option>  
              <option value="Economics">Economics</option>  
              <option value="Graphic Novel">Graphic Novel</option>  
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
          

          <button className="button"disabled={isAdding}>Vista</button>
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
  return {
    isAdding: state.books.isAdding,
    book: state.books.book,
    categories: state.books.categories,
    errors: state.books.errors,
    isAuthenticated: state.auth.isAuthenticated,
  }
}

export default connect(mapStateToProps)(AddBook);
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchBooks } from '../../actions/books';

import { Link, NavLink, Redirect } from 'react-router-dom';

import Button from '../button';

import './Header.css';

const queryString = require('query-string');

class Header extends Component {

  state = {
    query: '',
  }

  onClick = (e) => {
    console.log('leita');
    //<Redirect to={`/books?search=${this.state.query}`} />
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name) {
      this.setState({ [name]: value });
    }
  }

  render() {

    const { query } = this.state;

    console.log(query)

    return (
      <header className="header">
        <h1 className="header__heading"><Link to="/">Bókasafnið</Link></h1>

        {/* ætti samt frekar heima í sér component */}
        <form>
          <input id="search" type="text" name="query" onChange={this.handleInputChange} />
        </form>
        <button className="search_button" onClick={this.onClick}>
          <NavLink exact
            to={`/books?search=${this.state.query}`}>
            Leita
          </NavLink>
        </button>
        

        <Link to="/login">Innskráning</Link>
      </header>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  }
}

export default connect(mapStateToProps)(Header);

/*
<Button onClick={this.onClick}>
          <NavLink to={`/books?search=${this.state.query}`}>
            Leita
          </NavLink>
        </Button>*/
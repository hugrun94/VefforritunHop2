import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchBooks } from '../../actions/books';
import { logoutUser } from '../../actions/auth';

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

  handleLogout = (e) => {
    const { dispatch } = this.props;
    dispatch(logoutUser());
  }

  render() {

    const { query } = this.state;

    const { isAuthenticated } = this.props;
    const user = window.localStorage.getItem('user');
    console.log(JSON.parse(user));
    const parsedUser = JSON.parse(user);


    console.log(query)

    return (
      <header className="header">
        <h1 className="header__heading"><Link to="/">Bókasafnið</Link></h1>

        {/* ætti samt frekar heima í sér component */}
        <form>
          <input id="search" type="text" name="query" onChange={this.handleInputChange} />
        </form>
        <button className="button" onClick={this.onClick}>
          <NavLink exact className="link_white"
            to={`/books?search=${this.state.query}`} className="search">
            Leita
          </NavLink>
        </button>
        
        {isAuthenticated &&
          <div>
            <NavLink exact
            to= '/profile'>
            {parsedUser.name}
          </NavLink>
          <NavLink exact
            to= '/profile'>
            {parsedUser.image}
          </NavLink>
        <button className="button" onClick={this.handleLogout}>Útskrá</button>
        </div>
      }
        {!isAuthenticated &&
        <Link to="/login">Innskráning</Link> }
      </header>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    isAuthenticated: state.auth.isAuthenticated,
  }
}

export default connect(mapStateToProps)(Header);

/*
<Button onClick={this.onClick}>
          <NavLink to={`/books?search=${this.state.query}`}>
            Leita
          </NavLink>
        </Button>*/
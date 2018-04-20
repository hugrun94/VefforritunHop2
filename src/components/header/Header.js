import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchBooks } from '../../actions/books';
import { logoutUser } from '../../actions/auth';

import { Link, NavLink, Redirect, Route } from 'react-router-dom';

import Button from '../button';

import './Header.css';

const queryString = require('query-string');

class Header extends Component {

  state = {
    query: '',
  }

  onClick = (e) => {
    return (
      <div>
      <Route path="/books" render={() => (
        <div>
          <Redirect to={`/books?search=${this.state.query}`}/>
          </div>
      )}/>
      
      </div>
    );

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
    const parsedUser = JSON.parse(user);


    return (
      <header className="header">
        <h1 className="header__heading"><Link className="header_link" to="/">Bókasafnið</Link></h1>

        {/* ætti samt frekar heima í sér component */}
        <div className="search_div">
          <form className="header_form">
            <input id="search" type="text" name="query" onChange={this.handleInputChange} />
          </form>
          <button className="button" onClick={this.onClick}>
            <NavLink exact className="header_link"
              to={`/books?search=${this.state.query}`} className="search">
              Leita
            </NavLink>
          </button>
        </div>
        
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
        <button className="logout_button" onClick={this.handleLogout}>Útskrá</button>
        </div>
      }
        {!isAuthenticated &&
        <Link className="header_link" to="/login">Innskráning</Link> }
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
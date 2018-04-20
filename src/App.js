import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Route, Switch, withRouter } from 'react-router-dom'

import UserRoute from './components/user-route';
import Header from './components/header';
import Home from './routes/home';
import Login from './routes/login';
import Profile from './routes/profile';
import Register from './routes/register/';
import Books from './components/books/Books';
import Book from './components/books/Book';
import AddBook from './components/books/AddBook';
import User from './components/users/User';
import Users from './components/users/Users';
import NotFound from './routes/not-found';

import './App.css';

class App extends Component {

  render() {
    const { isAuthenticated } = this.props; 

    return (
      <main className="main">
        <Helmet defaultTitle="Bókasafnið" titleTemplate="%s – Bókasafnið" />

        <Header />

        <div className="main__content">
          <Switch location={this.props.location}>
            <Route path="/" exact component={Home} />
            <Route path="/login" exact component={Login} />
            <UserRoute path="/profile" isAuthenticated={isAuthenticated} component={Profile} />
            <Route path="/register" exact component={Register} />
            {/* todo fleiri route */}
            <Route path="/books?search=:query" component={Books} />
            <Route exact path="/books" component={Books} />
            <UserRoute path="/books/new" isAuthenticated={isAuthenticated} component={AddBook} />
            <Route exact path="/books/:book" component={Book} />
            <UserRoute exact path="/books/:book/edit" isAuthenticated={isAuthenticated} component={AddBook} />
            <UserRoute path="/users/:user" isAuthenticated={isAuthenticated} component={User} />
            <UserRoute path="/users" isAuthenticated={isAuthenticated} component={Users} />
            
            <Route component={NotFound} />
          </Switch>
        </div>

      </main>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state,
    isAuthenticated: state.auth.isAuthenticated,
    user: state.users.user,
    errors:state.users.errors,
  }
}

export default withRouter(connect(mapStateToProps)(App));
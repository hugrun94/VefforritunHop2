import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginUser, logoutUser } from '../../actions/auth';
import { Link , Redirect, NavLink, Route} from 'react-router-dom';
import { addUser } from '../../actions/register';

import './Register.css';

const user = window.localStorage.getItem('user');

class Register extends Component {
state = {
    username: '',
    password: '',
    name: '',
    validRegister: false,
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name) {
      this.setState({ [name]: value });
    }
  }

  handleSubmit = async (e) => {
    e.preventDefault();

    const { dispatch } = this.props;
    const { username, password, name } = this.state;

    dispatch(addUser(username, password,name));
  }

  render() {
    const { username, password, name} = this.state;
    const { isFetching, isAuthenticated, message, validRegister } = this.props;
    console.log(validRegister)
    if (isFetching) {
      return (
        <p>Skráir notenda <em>{username}</em>...</p>
      );
    }

    if (validRegister) {
      console.log("register")
      return (
        <div>
        <Route exact path="/register" render={() => (
            <Redirect to="/login"/>
        )}/>
        
        </div>
      );
    }

    return (
      <div className="wrapper">
      {!validRegister && message && (
          <ul>{message.map((errors, i) => (
            <li key={i}>
              <p>{errors.message}</p>
            </li>
          ))}</ul>
          )}
      

        <form className="even_form" onSubmit={this.handleSubmit}>

          <div>
            <label htmlFor="username">Notendanafn:</label>
            <input id="username" type="text" name="username" value={username} onChange={this.handleInputChange} />
          </div>

          <div>
            <label htmlFor="password">Lykilorð:</label>
            <input id="password" type="password" name="password" value={password} onChange={this.handleInputChange} />
          </div>

          <div>
            <label htmlFor="name">Fullt nafn:</label>
            <input id="name" type="text" name="name" value={name} onChange={this.handleInputChange} />
          </div>
        <button className="button" onClick={this.handleSubmit}>
            Nýskrá
          
        </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isFetching: state.auth.isFetching,
    isAuthenticated: state.auth.isAuthenticated,
    message: state.register.message,
    validRegister: state.register.validRegister,
  }
}

export default connect(mapStateToProps)(Register);


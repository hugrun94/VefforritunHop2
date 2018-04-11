import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginUser, logoutUser } from '../../actions/auth';
import { Link } from 'react-router-dom';

/* todo sækja actions frá ./actions */

import './Register.css';
import { post } from '../../api';

export const NEWUSER_REQUEST = 'NEWUSER_REQUEST';
export const NEWUSER_ERROR = 'NEWUSER_ERROR';
export const NEWUSER_FAILURE = 'NEWUSER_FAILURE';
export const NEWUSER_SUCCESS = 'NEWUSER_SUCCESS';
const user = window.localStorage.getItem('user');

class Register extends Component {
state = {
    username: '',
    password: '',
    name: '',
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
    const { isFetching, isAuthenticated, message } = this.props;

    if (isFetching) {
      return (
        <p>Skráir notenda <em>{username}</em>...</p>
      );
    }


    return (
      <div>
        {message && (
          <p>{message}</p>
        )}

        <form onSubmit={this.handleSubmit}>

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
        

          <button disabled={isFetching}>Innskrá</button>
        
        </form>
      </div>
    );
  }
}

function requestUser() {
  return {
    type: NEWUSER_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    message: null,
  }
}
  function receiveuser(user) {
  return {
    type: NEWUSER_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    user,
    message: null,
  }
}

function userError(message) {
  return {
    type: NEWUSER_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message
  }
}

const mapStateToProps = (state) => {
  return {
    isFetching: state.auth.isFetching,
    isAuthenticated: state.auth.isAuthenticated,
    message: state.auth.message,
  }
}

export const addUser = (username,password,name) => {
  return async (dispatch) => {
    dispatch(requestUser());
    console.log(user);

    let add;
    try {
      add = await post('/users', {username,password,name});
       } catch (e) {
      return dispatch(userError(e))
    }
    console.log(user.result);
    return dispatch(receiveuser(user.result))

  }
}




/* todo tengja við redux */
export default connect(mapStateToProps)(Register);
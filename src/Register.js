import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginUser, logoutUser } from '../../actions/auth';
import { Link } from 'react-router-dom';

/* todo sækja actions frá ./actions */

import './Register.css';

class Register extends Component {
state = {
    username: '',
    password: '',
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
    const { username, password } = this.state;

    dispatch(loginUser(username, password));
  }

  handleLogout = (e) => {
    const { dispatch } = this.props;
    dispatch(logoutUser());
  }

  render() {
    const { username, password, name} = this.state;
    const { isFetching, isAuthenticated, message } = this.props;

    if (isAuthenticated) {
      return (
        <button onClick={this.handleLogout}>Útskrá</button>
      );
    }

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

        <form className="even_form" onSubmit={this.handleSubmit}>

          <div>
            <label htmlFor="username">Notendanafn:</label>
            <input id="username" type="text" name="username" value={username} onChange={this.handleInputChange} />
          </div>

          <div>
            <label htmlFor="password">Lykilorð:</label>
            <input id="password" type="password" name="password" value={password} onChange={this.handleInputChange} />
          </div>
        

          <button disabled={isFetching}>Innskrá</button>
        
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isFetching: state.auth.isFetching,
    isAuthenticated: state.auth.isAuthenticated,
    message: state.auth.message,
  }
}


/* todo tengja við redux */
export default connect(mapStateToProps)(Register);
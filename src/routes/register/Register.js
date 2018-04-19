import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginUser, logoutUser } from '../../actions/auth';
import { Link , Redirect, NavLink, Route} from 'react-router-dom';
import { addUser } from '../../actions/register';

/* todo sækja actions frá ./actions */

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
    const { username, password, name, validRegister} = this.state;
    const { isFetching, isAuthenticated, message } = this.props;
    console.log(isAuthenticated);

    if (isFetching) {
      return (
        <p>Skráir notenda <em>{username}</em>...</p>
      );
    }

    if (!message && validRegister) {
      return (
        <div>
        <Route exact path="/register" render={() => (
            <Redirect to="/login"/>
        )}/>
        
        </div>
      );
    }

 

    console.log(message)
    return (
      <div>
      {!validRegister && message && (
          <ul>{message.map((errors, i) => (
            <li key={i}>
              <p>{errors.message}</p>
              {console.log(errors.message)}
            </li>
          ))}</ul>
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
  }
}


/* todo tengja við redux */
export default connect(mapStateToProps)(Register);


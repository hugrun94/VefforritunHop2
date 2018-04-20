import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUsers } from '../../actions/users';
import { NavLink, Route, Redirect } from 'react-router-dom'

import User from './User';

class Users extends Component {

    state = {
      page: 1,
      offset: 0,
    }

    componentDidMount(){
      
      const { dispatch, isAuthenticated } = this.props;

      if (isAuthenticated) {
        dispatch(fetchUsers('/users'));
      }
    }

    handleClick = async () => {
      let offset = this.state.offset + 10;
      const page = this.state.page + 1;
      this.setState({ offset, page });
      this.setState({ loading: true });
      const { dispatch } = this.props;
      offset = this.state.offset;
      dispatch(fetchUsers(`/users?offset=${this.state.offset+10}`));
    }
  
    handleClickPrevious = async () => {
      let offset = this.state.offset - 10;
      let page = this.state.page - 1;
      this.setState({ offset, page });
      this.setState({ loading: true });
      const { dispatch } = this.props;
      offset = this.state.offset;
      page = this.state.page;
      dispatch(fetchUsers(`/users?offset=${this.state.offset-10}`));
    }



      render(){
        
        const { isFetching, users, isAuthenticated } = this.props;

        let token = localStorage.getItem('token');

        if (isFetching) {
          return (
            <p>Sæki notendur...</p>
          );
        }

        return (
          <section className="wrapper">
            <h2>Notendur</h2><br></br>
            <ul>
              {users.map((user) => (
                <h3>
                  <li className="li_nobullet" key={user.id}>
                    <NavLink exact
                      to={`/users/${user.id}`}>
                      {user.name}
                    </NavLink><br></br><br></br>
                  </li>
                </h3>
              ))}
            </ul>

            {this.state.page > 1 && 
              <button className="button" onClick={this.handleClickPrevious}>
              <NavLink exact className="link_white"
                to={`/users?offset=${this.state.offset-10}`}>
                  Fyrri síða
              </NavLink>
            </button>}
            <span>Síða {this.state.page} </span>
            <button className="button" onClick={this.handleClick}>
              <NavLink exact className="link_white"
                to={`/users?offset=${this.state.offset+10}`}>
                  Næsta síða >
              </NavLink>
            </button>
          </section>
        );
      }
    
}

const mapStateToProps = (state) => {

  return {
    isFetching: state.users.isFetching,
    users: state.users.users,
    error: state.users.error,
    isAuthenticated: state.users.isAuthenticated,
  }
}

export default connect(mapStateToProps)(Users);

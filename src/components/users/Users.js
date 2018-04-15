import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUsers } from '../../actions/users';
import { NavLink } from 'react-router-dom'

import User from './User';

console.log("HALLO");

class Users extends Component {

    state = {
      page: 1,
      offset: 0,
    }

    componentDidMount(){
      
      const { dispatch, isAuthenticated } = this.props;

      //if (isAuthenticated) {
        dispatch(fetchUsers('/users'));
      //}
    }

    handleClick = async () => {
      const offset = this.state.offset + 10;
      const page = this.state.page + 1;
      this.setState({ offset, page });
      this.setState({ loading: true });
      const { dispatch } = this.props;
      dispatch(fetchUsers(`/users?offset=${10 + this.state.offset}`));
    }
  
    handleClickPrevious = async () => {
      const offset = this.state.offset - 10;
      const page = this.state.page - 1;
      this.setState({ offset, page });
      this.setState({ loading: true });
      const { dispatch } = this.props;
      dispatch(fetchUsers(`/users?offset=${10 + this.state.offset}`));
    }



      render(){
        
        const { isFetching, users, isAuthenticated } = this.props;

        console.log(users)
        let token = localStorage.getItem('token');
        console.log('token hallo', token  )

        if (isFetching) {
          return (
            <p>Sæki notendur...</p>
          );
        }

        console.log("offset: ", this.state.offset)
        console.log("page: ", this.state.page)
        console.log("users: ", users) // asdf fjarlægja
        return (
          <section>
            <h2>Notendur</h2>
            <ul>
              {users.map((user) => (
                <li key={user.id}>
                  <NavLink exact
                    to={`/users/${user.id}`}>
                    {user.name}
                  </NavLink>
                </li>
              ))}
            </ul>

            {this.state.page > 1 && 
              <button className="previous" onClick={this.handleClickPrevious}>
              <NavLink exact
                to={`/users?offset=${10 + this.state.offset}`}>
                Fyrri síða
              </NavLink>
            </button>}
            <span>Síða {this.state.page} </span>
            <button className="book_button" onClick={this.handleClick}>
              <NavLink exact
                to={`/users?offset=${10 + this.state.offset}`}>
                Næsta síða
              </NavLink>
            </button>
          </section>
        );
      }
}

const mapStateToProps = (state) => {
  //console.log(state.users)
  return {
    isFetching: state.users.isFetching,
    users: state.users.users,
    error: state.users.error,
    isAuthenticated: state.users.isAuthenticated,
  }
}

export default connect(mapStateToProps)(Users);

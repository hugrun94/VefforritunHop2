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
  //console.log(state.users)
  return {
    isFetching: state.users.isFetching,
    users: state.users.users,
    error: state.users.error,
    isAuthenticated: state.users.isAuthenticated,
  }
}

export default connect(mapStateToProps)(Users);

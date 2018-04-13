import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUsers } from '../../actions/users';
import { NavLink } from 'react-router-dom'

import User from './User';

class Users extends Component {
    state = {
      page: 1,
      offset: 0,
    }

    componentDidMount(){
        const { dispatch } = this.props;
        dispatch(fetchUsers());
    }

    async componentDidUpdate(prevProps, prevState) {
      if (this.props.match.params !== prevProps.match.params) {
        this.setState({ loading: true });
  
        try {
          const data = await this.fetchData();
          this.setState({ data, loading: false });
        } catch (error) {
          console.error('Error fetching book', error);
          this.setState({ error: true, loading: false });
        }
      }
    }

    onHeaderClick = (userId) => {
        return (e) => {
          
        }
      }

      handleClick = async () => {
        const offset = this.state.offset + 10;
        const page = this.state.page + 1;
        this.setState({ offset, page });
        this.setState({ loading: true });
    
          try {
            const userData = await this.fetchData();
            this.setState({ userData, loading: false });
          } catch (error) {
            console.error('Error fetching book', error);
            this.setState({ error: true, loading: false });
          }
      }

      render(){
        const { isFetching, users } = this.props;

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
              {books.map((user) => (
                <li key={user.id}>
                  <NavLink exact
                    to={`/users/${user.id}`}>
                    {user.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </section>
        );
      }
}
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

/** 
 * Slóðin er /users/:id
 * 
 * Hér þarf að vera:
 * Nafn notanda og lítil mynd
 * 
 * User hefur: name, picture, readBooks (fylki)
 *  readBooks hefur: title, rating (int), umsögn
 * 
 * "Lesnar bækur" - hér á eftir kemur listi af bókum
 * -Titill bókar
 * -Einkunn og lítil umsögn, nokkur orð
 */

const url = process.env.REACT_APP_SERVICE_URL;

export default class User extends Component {
  static propTypes = {
    name: PropTypes.string,
    
    // asdf hvað er match og params?
    match: PropTypes.shape({
      params: PropTypes.shape({
        user: PropTypes.string,
      }),
    }),
  }

  state = {
    userData: null,
    loading: true,
  }

  async componentDidMount() {
    try {
      const userData = await this.fetcUser();
      this.setState({ userData, loading: false });
    } catch (error) {
      console.error('Error fetching user', error);
      this.setState({ error: true, loading: false });
    }
  }


  fetchUser = async () => {
    const {
      match: {
        params: {
          user = '',
        } = {},
      } = {},
    } = this.props;
    const response = await fetch(`${url}/users/${user}`);
    const data = await response.json();
    return data;
  }

  render() {
    const { userData, loading, error } = this.state;

    if (loading) {
      return (<div>Sæki notanda</div>);
    }

    if (error) {
      return (<div>Villa við að sækja notanda</div>);
    }

    const { name } = this.props;

    return (
      <section className="user">
        <li className="user">
          <h3 className="user__header">{userData.name}</h3>
          <p>Einkunn: {userData.rating}</p>
          <p>{userData.description}</p>

        </li>
      </section>
    );
  }
}

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {fetchUser } from '../../actions/users';
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
    loading: true,
  }

  async componentDidMount() {
    const {
      match: {
        params: {
          user = '',
        } = {},
      } = {},
    } = this.props;
    const { dispatch } = this.props;
    dispatch(fetchUser(`/users/${user}`))
    console.log("notandi: ", user)
    /*try {
      const userData = await this.fetcUser();
      this.setState({ userData, loading: false });
    } catch (error) {
      console.error('Error fetching user', error);
      this.setState({ error: true, loading: false });
    }*/
  }


  /*fetchUser = async () => {
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
*/
  render() {
    const { user, loading, error } = this.props;

    if (loading) {
      return (<div>Sæki notanda...</div>);
    }

    if (error) {
      return (<div>Villa við að sækja notanda</div>);
    }

    const { name } = this.props;
// ASDF sækja lesnar bækur úr lista yfir lesnar bækur
    return (
      <section className="user">
        <li className="user">
          <h3 className="user__header">{user.name}</h3>
          <br><h3>Lesnar bækur</h3></br>
          <p>{}</p>}
          <p>Einkunn: {user.rating}</p>
          <p>{user.description}</p>
        </li>

        <button className="user_button">
          <NavLink to="../users">
          Til baka í notendur
          </NavLink>
        </button>
      </section>
    );
  }
}

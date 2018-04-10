import React, { Component } from 'react';
import PropTypes from 'prop-types';

//import './Book.css';

export default class Book extends Component {
  static propTypes = {
    title: PropTypes.string,
    
  }



  render() {
    const { title,  } = this.props;

    return (
      <li className="book">
        <h3 className="book__header">{title}</h3>

      </li>
    );
  }
}
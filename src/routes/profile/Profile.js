import React, { Component } from 'react';
import { connect } from 'react-redux';

export default class Profile extends Component {

  render() {

    const { isAdding, user, errors } = this.props;

    return (
      <div>
        <h2>Upplýsingar</h2>

        <form action="../profile">
          <input type="file" name="pic" accept="image/*"/>
          <input type="submit"/>
        </form>
        <form onSubmit="../profile">

          <div>
            <label htmlFor="name">Nafn:</label>
            <input id="name" type="text" name="name" onChange={this.handleInputChange} />
          </div>

          <button disabled={isAdding}>Uppfæra nafn</button>

        </form>

        <form onSubmit={this.handleSubmit}>

          <div>
            <label htmlFor="password">Lykilorð:</label>
            <input id="password" type="text" name="password" onChange={this.handleInputChange} />
          </div>

          <div>
            <label htmlFor="password2">Lykilorð, aftur:</label>
            <input id="password2" type="text" name="password2" onChange={this.handleInputChange} />
          </div>

        

        



        </form>

        <button className="book_button">

        </button>

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  //console.log(state.books.book)
  return {
    isAdding: state.users.isAdding,
    user: state.users.user,
    errors: state.users.errors,
    isAuthenticated: state.users.isAuthenticated,
  }
}

connect(mapStateToProps)(Profile);

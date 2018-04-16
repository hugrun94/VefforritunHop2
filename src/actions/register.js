import { post, patch } from '../api';
import { Route, Redirect } from 'react-router'
export const NEWUSER_REQUEST = 'NEWUSER_REQUEST';
export const NEWUSER_ERROR = 'NEWUSER_ERROR';
export const NEWUSER_FAILURE = 'NEWUSER_FAILURE';
export const NEWUSER_SUCCESS = 'NEWUSER_SUCCESS';
export const EDIT_USERNAME = 'EDIT_USERNAME';


function requestUser() {
  return {
    type: NEWUSER_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    message: null,
  }
}
  function receiveuser(user) {
  	console.log("hugrun")
  return {
    type: NEWUSER_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    user,
    message: null,
  }
}

function userError(message) {
  return {
    type: NEWUSER_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message
  }
}

function recieveEditUsername(user) {
  return {
    type: EDIT_USERNAME,
    isFetching: false,
    isAuthenticated: true,
    user,
    message: null,
  }
}

export const addUser = (username,password,name) => {
  return async (dispatch) => {
    dispatch(requestUser());
    console.log(user);

    let user;
    try {
      user = await post('/register', {username,password,name});

      console.log(user);

       } catch (e) {
      return dispatch(userError(e))
    }
    console.log(user.result);
    console.log("dfaklæka")
    return dispatch(receiveuser(user.result))

  }
}

export const editUsername = (name) => {
  return async (dispatch) => {
    //dispatch(requestUser());

    try {
      await patch('/users/me', {name});

       } catch (e) {
      return dispatch(userError(e))
    }

  }
}

export const editPassword = (password) => {
  return async (dispatch) => {
    //dispatch(requestUser());

    try {
      await patch('/users/me', {name: null, password});

       } catch (e) {
      return dispatch(userError(e))
    }

  }
}
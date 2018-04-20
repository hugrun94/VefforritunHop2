import { post, patch } from '../api';
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
  return {
    type: NEWUSER_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    user,
    message: null,
    validRegister: true,
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

export const addUser = (username,password,name) => {
  return async (dispatch) => {
    dispatch(requestUser());

    let user;
    try {
      user = await post('/register', {username,password,name});

       } catch (e) {
      return dispatch(userError(e))
    }
    if (user.status >= 400) {
      return dispatch(userError(user.result.errors))
    }
    return dispatch(receiveuser(user.result))

  }
}

export const editUsername = (name) => {
  return async (dispatch) => {
    try {
      await patch('/users/me', {name});

       } catch (e) {
      return dispatch(userError(e))
    }

  }
}

export const editPassword = (password) => {
  return async (dispatch) => {

    try {
      await patch('/users/me', {name: null, password});

       } catch (e) {
      return dispatch(userError(e))
    }

  }
}
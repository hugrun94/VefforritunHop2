import { get, post } from '../api';

export const USERS_REQUEST = 'USERS_REQUEST';
export const USERS_ERROR = 'USERS_ERROR';
export const USERS_SUCCESS = 'USERS_SUCCESS';
export const USER_SUCCESS = 'USER_SUCCESS';
export const USER_READ_REQUEST = 'USER_READ_REQUEST';
export const USER_READ_ERROR = 'USER_READ_ERROR';
export const USER_READ_SUCCESS = 'USER_READ_SUCCESS';

function requestUsers() {
  return {
    type: USERS_REQUEST,
    isFetching: true,
    error: null,
  }
}

function usersError(error) {
  return {
    type: USERS_ERROR,
    isFetching: true,
    users: [],
    error: error,
  }
}

function receiveUsers(users) {
  return {
    type: USERS_SUCCESS,
    isFetching: false,
    users,
    error: null,
  }
}

function receiveUser(user) {
  return {
    type: USER_SUCCESS,
    isFetching: false,
    user,
    error: null,
  }
}

function requestUserBooks() {
  return {
    type: USER_READ_REQUEST,
    isFetching: true,
    error: null,
  }
}

function userBooksError(error) {
  return {
    type: USER_READ_ERROR,
    isFetching: true,
    readBooks: [],
    error: error,
  }
}

function receiveUserBooks(readBooks) {
  return {
    type: USER_READ_SUCCESS,
    isFetching: false,
    readBooks,
    error: null,
  }
}

export const fetchUsers = (endpoint) => {
  return async (dispatch) => {
    dispatch(requestUsers());
    let users;
    try {
      users = await get(endpoint);
      console.log(users)
    } catch (e) {
      return dispatch(usersError(e))
    }
    console.log(users)
    dispatch(receiveUsers(users.result.items));
  }
}

export const fetchUser = (endpoint) => {
  return async (dispatch) => {
    dispatch(requestUsers());
    let users;
    try {
      users = await get(endpoint);
    } catch (e) {
      return dispatch(usersError(e))
    }
    
    dispatch(receiveUser(users.result));
  }
}

export const fetchUserBooks = (endpoint) => {
  return async (dispatch) => {
    dispatch(requestUserBooks());
    let users;
    try {
      users = await get(endpoint);
    } catch (e) {
      return dispatch(userBooksError(e))
    }
    
    dispatch(receiveUserBooks(users.result.items));
  }
}
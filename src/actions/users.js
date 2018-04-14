import { get, post } from '../api';

export const USERS_REQUEST = 'USERS_REQUEST';
export const USERS_ERROR = 'USERS_ERROR';
export const USERS_SUCCESS = 'USERS_SUCCESS';

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

    dispatch(receiveUsers(users.result));
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
    
    dispatch(receiveUsers(users.result));
  }
}
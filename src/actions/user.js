import { get, post } from '../api';

export const USER_REQUEST = 'USER_REQUEST';
export const USER_ERROR = 'USER_ERROR';
export const USER_SUCCESS = 'USER_SUCCESS';

function requestUser() {
  return {
    type: USER_REQUEST,
    isFetching: true,
    error: null,
  }
}

function userError(error) {
  return {
    type: USER_ERROR,
    isFetching: true,
    user: [],
    error: error,
  }
}

function receiveUser(user, limit) {
  return {
    type: USER_SUCCESS,
    isFetching: false,
    user,
    error: null,
  }
}

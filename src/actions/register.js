import { post } from '../api';
export const NEWUSER_REQUEST = 'NEWUSER_REQUEST';
export const NEWUSER_ERROR = 'NEWUSER_ERROR';
export const NEWUSER_FAILURE = 'NEWUSER_FAILURE';
export const NEWUSER_SUCCESS = 'NEWUSER_SUCCESS';



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
    console.log(user);

    let user;
    try {
      user = await post('register', {username,password,name});
          console.log(user);

       } catch (e) {
       	console.log(user.message);
      return dispatch(userError(e))
    }
    console.log(user.result);
    return dispatch(receiveuser(user.result))

  }
}
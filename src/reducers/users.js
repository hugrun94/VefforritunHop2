import { USERS_REQUEST, USERS_ERROR, USERS_SUCCESS, USERS_ADD_REQUEST, USERS_ADD_ERROR, USERS_ADD_SUCCESS } from '../actions/users';

const initialState = {
  isFetching: false,
  users: [],
  user: [],
  error: null,
  errors: [],
  isAuthenticated: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case USERS_REQUEST:
      return {
        ...state,
        isFetching: action.isFetching,
      };

    case USERS_ERROR:
      return {
        ...state,
        isFetching: action.isFetching,
        users: action.users,
        error: action.error,
      };

    case USERS_SUCCESS:
      return {
        ...state,
        isFetching: action.isFetching,
        users: action.users,
        error: action.error,
        isAuthenticated: action.isAuthenticated,
      };

    default:
      return state;
  }
};
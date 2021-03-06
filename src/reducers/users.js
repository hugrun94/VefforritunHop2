import { 
  USERS_REQUEST, 
  USERS_ERROR, 
  USERS_SUCCESS, 
  USER_SUCCESS, 
  USER_READ_REQUEST, 
  USER_READ_ERROR, 
  USER_READ_SUCCESS, 
  USER_READ_UPDATE_SUCCESS,
  USER_PHOTO_REQUEST,
  USER_PHOTO_ERROR,
  USER_PHOTO_SUCCESS,
} from '../actions/users';


const initialState = {
  isFetching: false,
  users: [],
  user: [],
  error: null,
  errors: [],
  photo: null,
  isAuthenticated: false,
  readBooks: [],
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

    case USER_SUCCESS:
    return {
      ...state,
      isFetching: action.isFetching,
      user: action.user,
      error: action.error,
    };

    case USER_READ_REQUEST:
      return {
        ...state,
        isFetching: action.isFetching,
      };

    case USER_READ_ERROR:
      return {
        ...state,
        isFetching: action.isFetching,
        readBooks: action.readBooks,
        error: action.error,
      };

    case USER_READ_SUCCESS:
      return {
        ...state,
        isFetching: action.isFetching,
        readBooks: action.readBooks,
        error: action.error,
        isAuthenticated: action.isAuthenticated,
      };

    case USER_READ_UPDATE_SUCCESS:
      return {
        ...state,
        readBooks: action.readBooks,
        isAuthenticated: action.isAuthenticated,
      }
    
    case USER_PHOTO_REQUEST:
      return {
        ...state,
        isAdding: action.isAdding,
        errors: [],
      };

    case USER_PHOTO_ERROR:
      return {
        ...state,
        isAdding: action.isAdding,
        errors: action.errors,
      };

    case USER_PHOTO_SUCCESS:
      return {
        ...state,
        isFetching: action.isFetching,
        photo: action.photo,
        error: action.error,
      };
    
    default:
      return state;
  }
};
import { NEWUSER_REQUEST, NEWUSER_SUCCESS, NEWUSER_FAILURE, EDIT_USERNAME } from './../actions/register';
const user = JSON.parse(localStorage.getItem('user') || 'null');

const initialState = {
	isFetching: false,
  	isAuthenticated: user ? true : false,
  	user,
    validRegister:false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case NEWUSER_REQUEST:
      return {
        ...state,
        isFetching: action.isFetching,
        isAuthenticated: action.isAuthenticated,
      };
    case NEWUSER_SUCCESS:
      return {
        ...state,
        isFetching: action.isFetching,
        isAuthenticated: action.isAuthenticated,
        user: action.user,
        message: action.message,
        validRegister: action.validRegister,
      };
    case NEWUSER_FAILURE:
      return {
        ...state,
        isFetching: action.isFetching,
        isAuthenticated: action.isAuthenticated,
        message: action.message
      };

    case EDIT_USERNAME:
      return {
        ...state,
        isFetching: action.isFetching,
        isAuthenticated: action.isAuthenticated,
        user: action.user,
        message: action.message,
      };

    default:
      return state;
  }
};
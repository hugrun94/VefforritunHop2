import { NEWUSER_REQUEST, NEWUSER_SUCCESS, NEWUSER_FAILURE, EDIT_USERNAME } from './../actions/register';
const user = JSON.parse(localStorage.getItem('user') || 'null');

const initialState = {
	isFetching: false,
  	isAuthenticated: user ? true : false,
  	user,
};

export default (state = initialState, action) => {
  console.log("rafnar")
  switch (action.type) {

    /* todo setja upp reducer */
    case NEWUSER_REQUEST:
      return {
        ...state,
        isFetching: action.isFetching,
        isAuthenticated: action.isAuthenticated,
      };
    case NEWUSER_SUCCESS:
    console.log(action)
    console.log("fad")
      return {
        ...state,
        isFetching: action.isFetching,
        isAuthenticated: action.isAuthenticated,
        user: action.user,
        message: action.message,
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
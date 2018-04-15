import { SEARCH_REQUEST, SEARCH_ERROR, SEARCH_SUCCESS } from '../actions/search';

const initialState = {
  isFetching: false,
  isAdding: false,
  booksResult: [],
  error: null,
  errors: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_REQUEST:
      return {
        ...state,
        isFetching: action.isFetching,
      };

    case SEARCH_ERROR:
      return {
        ...state,
        isFetching: action.isFetching,
        booksResult: action.booksResult,
        error: action.error,
      };

    case SEARCH_SUCCESS:
      return {
        ...state,
        isFetching: action.isFetching,
        booksResult: action.booksResult,
        error: action.error,
      };

    default:
      return state;
  }
};
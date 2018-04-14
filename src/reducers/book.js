import { BOOK_REQUEST, BOOK_ERROR, BOOK_SUCCESS, BOOK_ADD_REQUEST, BOOK_ADD_ERROR, BOOK_ADD_SUCCESS } from '../actions/book';

const initialState = {
  isFetching: false,
  isAdding: false,
  book: [],
  error: null,
  errors: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case BOOK_REQUEST:
      return {
        ...state,
        isFetching: action.isFetching,
      };

    case BOOK_ERROR:
      return {
        ...state,
        isFetching: action.isFetching,
        book: action.book,
        error: action.error,
      };

    case BOOK_SUCCESS:
      return {
        ...state,
        isFetching: action.isFetching,
        book: action.book,
        error: action.error,
      };

    case BOOK_ADD_REQUEST:
      return {
        ...state,
        isAdding: action.isAdding,
        errors: [],
      };
    case BOOK_ADD_ERROR:
      return {
        ...state,
        isAdding: action.isAdding,
        errors: action.errors,
      };
    case BOOK_ADD_SUCCESS:
      return {
        ...state,
        isAdding: action.isAdding,
        book: [...state.book, action.book],
        error: action.error,
      };

    default:
      return state;
  }
};
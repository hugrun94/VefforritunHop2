import { 
  BOOKS_REQUEST, 
  BOOKS_ERROR, 
  BOOKS_SUCCESS, 
  BOOK_SUCCESS, 
  BOOKS_ADD_REQUEST, 
  BOOKS_ADD_ERROR, 
  BOOKS_ADD_SUCCESS,
  BOOKS_EDIT_REQUEST, 
  BOOKS_EDIT_ERROR, 
  BOOKS_EDIT_SUCCESS,
  BOOK_CATEGORIES_ERROR,
  BOOK_CATEGORIES_REQUEST,
  BOOK_CATEGORIES_SUCCESS,
} from '../actions/books';

const initialState = {
  isFetching: false,
  isAdding: false,
  books: [],
  book: [],
  categories: [],
  error: null,
  errors: [],
  isAuthenticated: false,
  search: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case BOOKS_REQUEST:
      return {
        ...state,
        isFetching: action.isFetching,
      };

    case BOOKS_ERROR:
      return {
        ...state,
        isFetching: action.isFetching,
        books: action.books,
        error: action.error,
      };

    case BOOKS_SUCCESS:
      return {
        ...state,
        isFetching: action.isFetching,
        books: action.books,
        error: action.error,
      };

    case BOOK_SUCCESS:
      return {
        ...state,
        isFetching: action.isFetching,
        book: action.book,
        error: action.error,
      };

    case BOOKS_ADD_REQUEST:
      return {
        ...state,
        isAdding: action.isAdding,
        errors: [],
      };
    case BOOKS_ADD_ERROR:
      return {
        ...state,
        isAdding: action.isAdding,
        errors: action.errors,
        isAuthenticated: action.isAuthenticated,
      };
    case BOOKS_ADD_SUCCESS:
      return {
        ...state,
        isAdding: action.isAdding,
        books: [...state.books, action.book],
        error: action.error,
      };

    case BOOKS_EDIT_REQUEST:
      return {
        ...state,
        isAdding: action.isAdding,
        errors: [],
      };
    case BOOKS_EDIT_ERROR:
      return {
        ...state,
        isAdding: action.isAdding,
        errors: action.errors,
        isAuthenticated: action.isAuthenticated,
      };
    case BOOKS_EDIT_SUCCESS:
      return {
        ...state,
        isAdding: action.isAdding,
        books: [...state.books, action.book],
        error: action.error,
      };
    case BOOK_CATEGORIES_REQUEST:
      return {
        ...state,
        isFetching: action.isFetching,
      };

    case BOOK_CATEGORIES_ERROR:
      return {
        ...state,
        isFetching: action.isFetching,
        categories: action.categories,
        error: action.error,
      };
    case BOOK_CATEGORIES_SUCCESS:
      return {
        ...state,
        isFetching: action.isFetching,
        categories: action.categories,
        error: action.error,
      };

    default:
      return state;
  }
};
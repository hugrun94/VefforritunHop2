import { get, post } from '../api';

export const BOOKS_REQUEST = 'BOOKS_REQUEST';
export const BOOKS_ERROR = 'BOOKS_ERROR';
export const BOOKS_SUCCESS = 'BOOKS_SUCCESS';

function requestBooks() {
  return {
    type: BOOKS_REQUEST,
    isFetching: true,
    error: null,
  }
}

function booksError(error) {
  return {
    type: BOOKS_ERROR,
    isFetching: true,
    books: [],
    error: error,
  }
}

function receiveBooks(books) {
  return {
    type: BOOKS_SUCCESS,
    isFetching: false,
    books,
    error: null,
  }
}



export const BOOKS_ADD_REQUEST = 'BOOKS_ADD_REQUEST';
export const BOOKS_ADD_ERROR = 'BOOKS_ADD_ERROR';
export const BOOKS_ADD_SUCCESS = 'BOOKS_ADD_SUCCESS';

function addingBook(book) {
  return {
    type: BOOKS_ADD_REQUEST,
    isAdding: false,
    errors: null,
  }
}

function addBooksError(errors) {
  return {
    type: BOOKS_ADD_ERROR,
    isAdding: false,
    errors,
  }
}

function receiveAddBook(book) {
  return {
    type: BOOKS_ADD_SUCCESS,
    isAdding: false,
    book,
    errors: null,
  }
}

export const fetchBooks = () => {
  return async (dispatch) => {
    dispatch(requestBooks());
    let books;
    try {
      books = await get('/books');
    } catch (e) {
      return dispatch(booksError(e))
    }

    dispatch(receiveBooks(books.result.items));
  }
}

// asdf passa innskráningu

export const addBook = (title, ISBN13, author, descr, category) => {
  return async (dispatch) => {
    dispatch(addingBook());

    let book;
    try {
      book = await post('/books/new', { title, ISBN13, author, descr, category });
    } catch (e) {
      return dispatch(addBooksError([{ message: e }]))
    }

    if (book.status >= 400) {
      return dispatch(addBooksError(book.result))
    }

    dispatch(receiveAddBook(book.result))
  }
}
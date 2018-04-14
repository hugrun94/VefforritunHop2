import { get, post } from '../api';

export const BOOK_REQUEST = 'BOOK_REQUEST';
export const BOOK_ERROR = 'BOOK_ERROR';
export const BOOK_SUCCESS = 'BOOK_SUCCESS';

function requestBook() {
  return {
    type: BOOK_REQUEST,
    isFetching: true,
    error: null,
  }
}

function bookError(error) {
  return {
    type: BOOK_ERROR,
    isFetching: true,
    book: [],
    error: error,
  }
}

function receiveBook(book, limit) {
  return {
    type: BOOK_SUCCESS,
    isFetching: false,
    book,
    error: null,
  }
}


export const BOOK_ADD_REQUEST = 'BOOK_ADD_REQUEST';
export const BOOK_ADD_ERROR = 'BOOK_ADD_ERROR';
export const BOOK_ADD_SUCCESS = 'BOOK_ADD_SUCCESS';

function addingBook(book) {
  return {
    type: BOOK_ADD_REQUEST,
    isAdding: false,
    errors: null,
  }
}

function addBookError(errors) {
  return {
    type: BOOK_ADD_ERROR,
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

export const fetchBooks = (endpoint) => {
  return async (dispatch) => {
    dispatch(requestBooks());
    let books;
    try {
      books = await get(endpoint);
    } catch (e) {
      return dispatch(booksError(e))
    }

    dispatch(receiveBooks(books.result.items, books.result.limit));
  }
}

// asdf passa innskráningu

export const addBook = (title, author, descr, ISBN10, ISBN13, category, published, pagecount, language, categorytitle) => {
  return async (dispatch) => {
    dispatch(addingBook());

    let book;
    try {
      book = await post('/books', { title, author, descr, ISBN10, ISBN13, category, published, pagecount, language, categorytitle });
    } catch (e) {
      return dispatch(addBooksError([{ message: e }]))
    }

    if (book.status >= 400) {
      return dispatch(addBooksError(book.result))
    }

    dispatch(receiveAddBook(book.result))
  }
}
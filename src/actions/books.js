import { get, post } from '../api';

export const BOOKS_REQUEST = 'BOOKS_REQUEST';
export const BOOKS_ERROR = 'BOOKS_ERROR';
export const BOOKS_SUCCESS = 'BOOKS_SUCCESS';
export const BOOK_SUCCESS = 'BOOK_SUCCESS';

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

function receiveBook(book) {
  return {
    type: BOOK_SUCCESS,
    isFetching: false,
    book,
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

export const fetchBooks = (endpoint) => {
  console.log(endpoint)
  return async (dispatch) => {
    dispatch(requestBooks());
    let books;
    try {
      books = await get(endpoint);
    } catch (e) {
      return dispatch(booksError(e))
    }

    dispatch(receiveBooks(books.result.items));
  }
}

export const fetchBook = (endpoint) => {
  return async (dispatch) => {
    dispatch(requestBooks());
    let books;
    try {
      books = await get(endpoint);
    } catch (e) {
      return dispatch(booksError(e))
    }
    
    dispatch(receiveBook(books.result));
  }
}

// asdf passa innskráningu

export const addBook = (title, author, descr, ISBN10, ISBN13, category, published, pagecount, language, categorytitle) => {
  return async (dispatch) => {
    dispatch(addingBook());
    console.log(title)
    let book;
    try {
      book = await post('/books', { title, author, descr, ISBN10, ISBN13, category, published, pagecount, language, categorytitle });
      console.log(book.result)
    } catch (e) {
      return dispatch(addBooksError([{ message: e }]))
    }

    if (book.status >= 400) {
      return dispatch(addBooksError(book.result.errors))
    }

    dispatch(receiveAddBook(book.result))
  }
}
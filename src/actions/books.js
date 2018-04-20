import { get, post, patch } from '../api';

export const BOOKS_REQUEST = 'BOOKS_REQUEST';
export const BOOKS_ERROR = 'BOOKS_ERROR';
export const BOOKS_SUCCESS = 'BOOKS_SUCCESS';
export const BOOK_SUCCESS = 'BOOK_SUCCESS';
export const BOOK_CATEGORIES_REQUEST = 'BOOK_CATEGORIES_REQUEST';
export const BOOK_CATEGORIES_ERROR = 'BOOK_CATEGORIES_ERROR';
export const BOOK_CATEGORIES_SUCCESS = 'BOOK_CATEGORIES_SUCCESS';

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

function requestCategories() {
  return {
    type: BOOK_CATEGORIES_REQUEST,
    isFetching: true,
    error: null,
  }
}

function categoriesError(error) {
  return {
    type: BOOK_CATEGORIES_ERROR,
    isFetching: true,
    categories: [],
    error: error,
  }
}

function recieveCategories(categories) {
  return {
    type: BOOK_CATEGORIES_SUCCESS,
    isFetching: false,
    categories,
    error: null,
  }
}



export const BOOKS_ADD_REQUEST = 'BOOKS_ADD_REQUEST';
export const BOOKS_ADD_ERROR = 'BOOKS_ADD_ERROR';
export const BOOKS_ADD_SUCCESS = 'BOOKS_ADD_SUCCESS';
export const BOOKS_EDIT_REQUEST = 'BOOKS_EDIT_REQUEST';
export const BOOKS_EDIT_ERROR = 'BOOKS_EDIT_ERROR';
export const BOOKS_EDIT_SUCCESS = 'BOOKS_EDIT_SUCCESS';

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

function editingBook(book) {
  return {
    type: BOOKS_EDIT_REQUEST,
    isAdding: false,
    errors: null,
  }
}

function editBooksError(errors) {
  return {
    type: BOOKS_EDIT_ERROR,
    isAdding: false,
    errors,
  }
}

function receiveEditBook(book) {
  return {
    type: BOOKS_EDIT_SUCCESS,
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
    if (books.status >= 400) {
      return dispatch(booksError(books.result.error))
    }
    dispatch(receiveBook(books.result));
  }
}

export const fetchCategories = (endpoint) => {
  return async (dispatch) => {
    dispatch(requestCategories());
    let categories;
    try {
      categories = await get(endpoint);
    } catch (e) {
      return dispatch(categoriesError(e));
    }
    dispatch(recieveCategories(categories.result.items));
  }
}

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
      return dispatch(addBooksError(book.result.errors))
    }

    dispatch(receiveAddBook(book.result))
  }
}

export const editBook = (id, title, author, descr, ISBN10, ISBN13, category, published, pagecount, language, categorytitle) => {
  return async (dispatch) => {
    dispatch(editingBook());
    let book;
    try {
      book = await patch(`/books/${id}`, { title, author, descr, ISBN10, ISBN13, category, published, pagecount, language, categorytitle });
    } catch (e) {
      return dispatch(editBooksError([{ message: e }]))
    }

    if (book.status >= 400) {
      return dispatch(editBooksError(book.result.errors))
    }

    dispatch(receiveEditBook(book.result))
  }
}
import { get, post } from '../api';

export const BOOKS_REQUEST = 'BOOKS_REQUEST';
export const BOOKS_ERROR = 'BOOKS_ERROR';
export const BOOKS_SUCCESS = 'BOOKS_SUCCESS';

function requestNotes() {
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
    notes,
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
    note,
    errors: null,
  }
}

export const fetchBooks = () => {
  return async (dispatch) => {
    dispatch(requestNotes());

    let notes;
    try {
      notes = await get('/');
    } catch (e) {
      return dispatch(notesError(e))
    }

    dispatch(receiveNotes(notes.result));
  }
}

export const addNote = (title, text, datetime) => {
  return async (dispatch) => {
    dispatch(addingNote());

    let note;
    try {
      note = await post('/', { title, text, datetime });
    } catch (e) {
      return dispatch(addNotesError([{ message: e }]))
    }

    if (note.status >= 400) {
      return dispatch(addNotesError(note.result))
    }

    dispatch(receiveAddNote(note.result))
  }
}
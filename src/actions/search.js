import { get } from '../api';

export const SEARCH_REQUEST = 'SEARCH_REQUEST';
export const SEARCH_ERROR = 'SEARCH_ERROR';
export const SEARCH_SUCCESS = 'SEARCH_SUCCESS';

function requestSearch() {
  return {
    type: SEARCH_REQUEST,
    isFetching: true,
    error: null,
  }
}

function searchError(error) {
  return {
    type: SEARCH_ERROR,
    isFetching: true,
    booksResult: [],
    error: error,
  }
}

function receiveSearch(booksResult) {
  return {
    type: SEARCH_SUCCESS,
    isFetching: false,
    booksResult,
    error: null,
  }
}


export const fetchSearch = (endpoint) => {
  return async (dispatch) => {
    dispatch(requestSearch());
    let booksResult;
    try {
      booksResult = await get(endpoint);
    } catch (e) {
      return dispatch(searchError(e))
    }

    dispatch(receiveSearch(booksResult.result.items));
  }
}


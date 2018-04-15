import { combineReducers } from 'redux'
import auth from './auth'
import books from './books'
import users from './users'
import search from './search'

export default combineReducers({
  auth,
  books,
  users,
  search,
})

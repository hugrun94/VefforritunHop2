import { combineReducers } from 'redux'
import auth from './auth'
import books from './books'
import users from './users'

export default combineReducers({
  auth,
  books,
  users,
})

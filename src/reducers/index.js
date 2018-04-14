import { combineReducers } from 'redux'
import auth from './auth'
import books from './books'
import users from './users'
import user from './user'

export default combineReducers({
  auth,
  books,
  users,
  user,
})

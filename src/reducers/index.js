import { combineReducers } from 'redux'
import auth from './auth'
import books from './books'
import register from './register'
import users from './users'
import search from './search'
import user from './user'

export default combineReducers({
  auth,
  books,
  register,
  users,
  search,
  user,
})

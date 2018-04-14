import { combineReducers } from 'redux'
import auth from './auth'
import books from './books'
import register from './register'

export default combineReducers({
  auth,
  books,
  register,
})

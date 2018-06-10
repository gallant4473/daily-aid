import { combineReducers } from 'redux'
import { authReducer, signupReducer } from './Login/logic'
import { statusReducer } from './Status/logic'
import { modalReducer } from './Modal/logic'
import { getUserReducer, approveReducer, activateReducer } from './Admin/logic'

const rootReducer = combineReducers({
  auth: authReducer,
  status: statusReducer,
  modal: modalReducer,
  signup: signupReducer,
  getUser: getUserReducer,
  approve: approveReducer,
  activate: activateReducer
})

export default rootReducer

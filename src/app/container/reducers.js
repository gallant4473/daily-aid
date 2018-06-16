import { combineReducers } from 'redux'
import { authReducer, signupReducer, forgotPassowrdReducer, checkResetReducer, resetPasswordReducer } from './Login/logic'
import { statusReducer } from './Status/logic'
import { modalReducer } from './Modal/logic'
import { getUserReducer, approveReducer, activateReducer } from './Admin/logic'

const rootReducer = combineReducers({
  auth: authReducer,
  status: statusReducer,
  modal: modalReducer,
  signup: signupReducer,
  forgot: forgotPassowrdReducer,
  checkReset: checkResetReducer,
  resetPassword: resetPasswordReducer,
  getUser: getUserReducer,
  approve: approveReducer,
  activate: activateReducer
})

export default rootReducer

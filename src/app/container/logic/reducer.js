import { combineReducers } from 'redux'
import { loginReducer, logoutReducer } from './login'
import { statusReducer } from './status'
import { signupReducer } from './signup'
import { getBearerReducer } from './bearer'
import { getUserReducer, activateReducer, approveReducer } from './user'

const rootReducer = combineReducers({
  login: loginReducer,
  logout: logoutReducer,
  status: statusReducer,
  signup: signupReducer,
  bearer: getBearerReducer,
  getUser: getUserReducer,
  approve: approveReducer,
  activate: activateReducer
})

export default rootReducer

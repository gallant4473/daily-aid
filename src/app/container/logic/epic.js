import { combineEpics } from 'redux-observable'

import { signupEpic } from './signup'
import { loginEpic, logoutEpic } from './login'
import { getUserEpic, approveEpic, activateEpic } from './user'

const rootEpic = combineEpics(
  loginEpic,
  logoutEpic,
  signupEpic,
  getUserEpic,
  approveEpic,
  activateEpic
)

export default rootEpic

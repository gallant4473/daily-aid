import { combineEpics } from 'redux-observable'

import { loginEpic, logoutEpic, signupEpic } from './Login/logic'
import { approveEpic, activateEpic, getUserEpic } from './Admin/logic'

const rootEpic = combineEpics(
  loginEpic,
  logoutEpic,
  signupEpic,
  approveEpic,
  activateEpic,
  getUserEpic
)

export default rootEpic

import { combineEpics } from 'redux-observable'

import { loginEpic, logoutEpic, signupEpic, forgotPasswordEpic, checkResetEpic, resetPasswordEpic } from './Login/logic'
import { approveEpic, activateEpic, getUserEpic } from './Admin/logic'
import { getAllComplaintEpic, getComplaintEpic, deleteComplaintEpic, editComplaintEpic, addComplaintEpic } from './Complaint/logic'

const rootEpic = combineEpics(
  loginEpic,
  logoutEpic,
  signupEpic,
  forgotPasswordEpic,
  checkResetEpic,
  approveEpic,
  activateEpic,
  getUserEpic,
  resetPasswordEpic,
  getAllComplaintEpic,
  getComplaintEpic,
  deleteComplaintEpic,
  editComplaintEpic,
  addComplaintEpic
)

export default rootEpic

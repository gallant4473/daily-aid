import { combineEpics } from 'redux-observable'

import { loginEpic, logoutEpic, signupEpic, forgotPasswordEpic, checkResetEpic, resetPasswordEpic } from './Login/logic'
import { approveEpic, activateEpic, getUserEpic } from './User/logic'
import { getAllComplaintEpic, getComplaintEpic, deleteComplaintEpic, editComplaintEpic, addComplaintEpic } from './Complaint/logic'
import { getAllAnnouncementEpic, getAnnouncementEpic, deleteAnnouncementEpic, editAnnouncementEpic, addAnnouncementEpic } from './Announcements/logic'

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
  addComplaintEpic,
  getAllAnnouncementEpic,
  getAnnouncementEpic,
  deleteAnnouncementEpic,
  editAnnouncementEpic,
  addAnnouncementEpic
)

export default rootEpic

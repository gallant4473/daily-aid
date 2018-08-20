import { combineReducers } from 'redux'
import { authReducer, signupReducer, forgotPassowrdReducer, checkResetReducer, resetPasswordReducer } from './Login/logic'
import { statusReducer } from './Status/logic'
import { modalReducer } from './Modal/logic'
import { getUserReducer, approveReducer, activateReducer } from './User/logic'
import {
  addComplaintReducer,
  getAllComplaintReducer,
  getComplaintReducer,
  deleteComplaintReducer,
  editComplaintReducer
} from './Complaint/logic'
import { drawerReducer } from './Drawer/logic'
import { getAllAnnouncementReducer, getAnnouncementReducer, editAnnouncementReducer, deleteAnnouncementReducer, addAnnouncementReducer } from './Announcements/logic'

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
  activate: activateReducer,
  addComplaint: addComplaintReducer,
  getAllComplaint: getAllComplaintReducer,
  getComplaint: getComplaintReducer,
  deleteComplaint: deleteComplaintReducer,
  editComplaint: editComplaintReducer,
  drawer: drawerReducer,
  getAllAnnouncement: getAllAnnouncementReducer,
  getAnnouncement: getAnnouncementReducer,
  editAnnouncement: editAnnouncementReducer,
  deleteAnnouncement: deleteAnnouncementReducer,
  addAnnouncement: addAnnouncementReducer
})

export default rootReducer

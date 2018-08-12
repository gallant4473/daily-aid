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
  drawer: drawerReducer
})

export default rootReducer

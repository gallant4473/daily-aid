import { LOGIN_SUCCESS, LOGOUT_SUCCESS } from './login'

export const ERROR = 'ERROR'
export const STATUS_CANCEL = 'STATUS_CANCEL'
const INITAL_STATE = {
  message: '',
  status: '',
  type: '',
  title: ''
}

function setErrorStatus (status) {
  const obj = {
    message: 'Oops! There has been an issue. Re-try in some time.',
    status: 'error',
    type: 400,
    title: 'Error'
  }
  switch (status) {
    case 401:
      obj.message = 'Your current session has expired.'
      obj.type = '401'
      break
    case 403:
      obj.message = "You don't have required permissions, Please contact our adimin"
      obj.type = '403'
      break
    default:
      break
  }
  return obj
}

export function statusReducer (state = INITAL_STATE, action) {
  switch (action.type) {
    case STATUS_CANCEL: {
      return INITAL_STATE
    }
    case ERROR: {
      const obj = setErrorStatus(action.payload.status)
      return obj
    }
    case LOGIN_SUCCESS: {
      return {
        message: 'You are successfully logged in',
        status: 'success',
        type: 'login',
        title: 'Success'
      }
    }
    case LOGOUT_SUCCESS: {
      return {
        message: 'You are successfully logged out',
        status: 'success',
        type: 'logout',
        title: 'Success'
      }
    }
    default:
      return state
  }
}

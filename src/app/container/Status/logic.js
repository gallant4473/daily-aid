import {
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  SIGNUP_SUCCESS,
  FORGOT_PASSWORD_SUCCESS,
  CHECK_RESET_FAILURE,
  RESET_PASSWORD_SUCCESS
} from '../Login/logic'

export const ERROR = 'ERROR'
export const STATUS_CANCEL = 'STATUS_CANCEL'
const INITAL_STATE = {
  message: '',
  status: '',
  type: '',
  title: ''
}

function setErrorStatus (error) {
  const obj = {
    message: error.response.message || 'Oops! There has been an issue. Re-try in some time.',
    status: 'error',
    type: '400',
    title: 'Error'
  }
  switch (error.status) {
    case 401:
      obj.message = error.response.message || 'Your current session has expired.'
      obj.type = '401'
      break
    case 403:
      obj.message = error.response.message || "You don't have required permissions, Please contact our adimin"
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
      const obj = setErrorStatus(action.payload)
      return obj
    }
    case CHECK_RESET_FAILURE: {
      return {
        message: 'The link is expired, please retry forgot password',
        status: 'error',
        type: 'checkReset',
        title: 'Error'
      }
    }
    case LOGIN_SUCCESS: {
      return {
        message: 'You are successfully logged in',
        status: 'success',
        type: 'login',
        title: 'Success'
      }
    }
    case RESET_PASSWORD_SUCCESS: {
      return {
        message: 'Reset password successfull',
        status: 'success',
        type: 'resetPassword',
        title: 'Success'
      }
    }
    case FORGOT_PASSWORD_SUCCESS: {
      return {
        message: 'Please check your email',
        status: 'success',
        type: 'forgot',
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
    case SIGNUP_SUCCESS: {
      return {
        message: 'You are successfully signed up, Please try to login',
        status: 'success',
        type: 'signup',
        title: 'Success'
      }
    }
    default:
      return state
  }
}

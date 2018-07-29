import { Observable } from 'rxjs/Observable'
import { ajax as staticAjax } from 'rxjs/observable/dom/ajax'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import 'rxjs/add/observable/of'
import { getCookie, setCookie, removeCookies, apiCall } from '../../utils'
import { ERROR } from '../Status/logic'

// Constants

const LOGIN = 'LOGIN'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOGIN_FAILURE = 'LOGIN_FAILURE'
const LOGOUT = 'LOGOUT'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
const LOGOUT_FAILURE = 'LOGOUT_FAILURE'
const SIGNUP = 'SIGNUP'
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS'
const SIGNUP_FAILURE = 'SIGNUP_FAILURE'

const FORGOT_PASSWORD = 'FORGOT_PASSWORD'
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS'
const FORGOT_PASSWORD_FAILURE = 'FORGOT_PASSWORD_FAILURE'

const CHECK_RESET = 'CHECK_RESET'
const CHECK_RESET_SUCCESS = 'CHECK_RESET_SUCCESS'
export const CHECK_RESET_FAILURE = 'CHECK_RESET_FAILURE'

const RESET_PASSWORD = 'RESET_PASSWORD'
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS'
const RESET_PASSWORD_FAILURE = 'RESET_PASSWORD_FAILURE'

const INITIAL_STATE = {
  data: [],
  loading: false,
  error: false,
  loggedIn: getCookie('accessToken')
}

// Login action
export const loginAction = payload => ({
  type: LOGIN,
  payload
})

// Logout action
export const logoutAction = payload => ({
  type: LOGOUT,
  payload
})

// Login Success action
const loginSuccess = payload => ({
  type: LOGIN_SUCCESS,
  payload
})

// Logout success action
const logoutSuccess = payload => ({
  type: LOGOUT_SUCCESS,
  payload
})

// Signup action
export const signupAction = payload => ({
  type: SIGNUP,
  payload
})

// Signup Success action
const signupSuccess = payload => ({
  type: SIGNUP_SUCCESS,
  payload
})

// Forgot Password action
export const forgotPasswordAction = payload => ({
  type: FORGOT_PASSWORD,
  payload
})

// Forgot Password Success action
const forgotPasswordSuccess = payload => ({
  type: FORGOT_PASSWORD_SUCCESS,
  payload
})

// Check Reset action
export const checkResetAction = payload => ({
  type: CHECK_RESET,
  payload
})

// Check Reset Success action
const checkResetSuccess = payload => ({
  type: CHECK_RESET_SUCCESS,
  payload
})

// Reset action
export const resetPasswordAction = payload => ({
  type: RESET_PASSWORD,
  payload
})

// Reset Success action
const resetPasswordSuccess = payload => ({
  type: RESET_PASSWORD_SUCCESS,
  payload
})

// Reset Passowrd epic
export const resetPasswordEpic = action$ => action$
  .ofType(RESET_PASSWORD)
  .mergeMap(action => staticAjax(apiCall(`${process.env.apiUrl}auth/reset_password?id=${action.payload.id}`, 'POST', false, action.payload.data))
    .map(response => resetPasswordSuccess(response))
    .catch(error => Observable.of({
      type: RESET_PASSWORD_FAILURE,
      payload: error
    }, {
      type: ERROR,
      payload: error
    })))

// Check Reset epic
export const checkResetEpic = action$ => action$
  .ofType(CHECK_RESET)
  .mergeMap(action => staticAjax(apiCall(`${process.env.apiUrl}auth/reset_password?${action.payload}`, 'GET', false))
    .map(response => checkResetSuccess(response))
    .catch(error => Observable.of({
      type: CHECK_RESET_FAILURE,
      payload: error
    })))

// Forgot Passowrd epic
export const forgotPasswordEpic = action$ => action$
  .ofType(FORGOT_PASSWORD)
  .mergeMap(action => staticAjax(apiCall(`${process.env.apiUrl}auth/forgot_password`, 'POST', false, action.payload))
    .map(response => forgotPasswordSuccess(response))
    .catch(error => Observable.of({
      type: FORGOT_PASSWORD_FAILURE,
      payload: error
    }, {
      type: ERROR,
      payload: error
    })))

// Signup epic
export const signupEpic = action$ => action$
  .ofType(SIGNUP)
  .mergeMap(action => staticAjax(apiCall(`${process.env.apiUrl}auth/register`, 'POST', false, action.payload))
    .map(response => signupSuccess(response))
    .catch(error => Observable.of({
      type: SIGNUP_FAILURE,
      payload: error
    }, {
      type: ERROR,
      payload: error
    })))

// Login epic
export const loginEpic = action$ => action$
  .ofType(LOGIN)
  .mergeMap(action => staticAjax(apiCall(`${process.env.apiUrl}auth/login`, 'POST', false, action.payload))
    .map(response => loginSuccess(response))
    .catch(error => Observable.of({
      type: LOGIN_FAILURE,
      payload: error
    }, {
      type: ERROR,
      payload: error
    })))

// Logout epic
export const logoutEpic = action$ => action$
  .ofType(LOGOUT)
  .mergeMap(action => staticAjax(apiCall(`${process.env.apiUrl}auth/logout`, 'DELETE', true, action.payload))
    .map(response => logoutSuccess(response))
    .catch(error => Observable.of({
      type: LOGOUT_FAILURE,
      payload: error
    }, {
      type: ERROR,
      payload: error
    })))

// Auth reducer updates both login and logout
export function authReducer (state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOGIN: {
      return {
        ...state,
        data: [],
        loading: true,
        error: false,
        loggedIn: false
      }
    }
    case LOGIN_SUCCESS: {
      console.log(action.payload.response)
      const userName = `${action.payload.response.data.user_name}`
      const bearer = `Bearer ${action.payload.response.data.access_token}`
      setCookie(action.payload.response.data.is_admin, 'permissions')
      setCookie(bearer, 'accessToken')
      setCookie(userName, 'userName')
      setCookie(JSON.stringify(action.payload.response.data), 'data')
      return {
        ...state,
        data: action.payload.response,
        loading: false,
        error: false,
        loggedIn: true
      }
    }
    case LOGOUT_SUCCESS: {
      removeCookies()
      return {
        ...state,
        data: action.payload.response,
        loading: false,
        error: false,
        loggedIn: false
      }
    }
    case LOGIN_FAILURE: {
      return {
        ...state,
        data: [],
        loading: false,
        error: true,
        loggedIn: false
      }
    }
    case LOGOUT_FAILURE: {
      return {
        ...state,
        data: [],
        loading: false,
        error: true,
        loggedIn: false
      }
    }
    default:
      return state
  }
}

// Sign up reducer
export function signupReducer (state = INITIAL_STATE, action) {
  switch (action.type) {
    case SIGNUP: {
      return {
        ...state,
        data: [],
        loading: true,
        error: false
      }
    }
    case SIGNUP_SUCCESS: {
      return {
        ...state,
        data: [action.payload.response.data],
        loading: false,
        error: false
      }
    }
    case SIGNUP_FAILURE: {
      return {
        ...state,
        data: [],
        loading: false,
        error: true
      }
    }
    default:
      return state
  }
}

// Forgot Password reducer
export function forgotPassowrdReducer (state = INITIAL_STATE, action) {
  switch (action.type) {
    case FORGOT_PASSWORD: {
      return {
        ...state,
        data: [],
        loading: true,
        error: false
      }
    }
    case FORGOT_PASSWORD_SUCCESS: {
      return {
        ...state,
        data: [action.payload.response.data],
        loading: false,
        error: false
      }
    }
    case FORGOT_PASSWORD_FAILURE: {
      return {
        ...state,
        data: [],
        loading: false,
        error: true
      }
    }
    default:
      return state
  }
}

// Check Reset reducer
export function checkResetReducer (state = INITIAL_STATE, action) {
  switch (action.type) {
    case CHECK_RESET: {
      return {
        ...state,
        data: [],
        loading: true,
        error: false
      }
    }
    case CHECK_RESET_SUCCESS: {
      return {
        ...state,
        data: [action.payload.response.data],
        loading: false,
        error: false
      }
    }
    case CHECK_RESET_FAILURE: {
      return {
        ...state,
        data: [],
        loading: false,
        error: true
      }
    }
    default:
      return state
  }
}

// Reset reducer
export function resetPasswordReducer (state = INITIAL_STATE, action) {
  switch (action.type) {
    case RESET_PASSWORD: {
      return {
        ...state,
        data: [],
        loading: true,
        error: false
      }
    }
    case RESET_PASSWORD_SUCCESS: {
      return {
        ...state,
        data: [action.payload.response.data],
        loading: false,
        error: false
      }
    }
    case RESET_PASSWORD_FAILURE: {
      return {
        ...state,
        data: [],
        loading: false,
        error: true
      }
    }
    default:
      return state
  }
}

import { Observable } from 'rxjs/Observable'
import { ajax as staticAjax } from 'rxjs/observable/dom/ajax'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import 'rxjs/add/observable/of'
import { getAsync, setAsync, removeAsync, apiCall, BASE_URL } from '../utils'
import { ERROR } from './status'

// Constants

const LOGIN = 'LOGIN'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOGIN_FAILURE = 'LOGIN_FAILURE'
const LOGOUT = 'LOGOUT'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
const LOGOUT_FAILURE = 'LOGOUT_FAILURE'
const INITIAL_STATE = {
  data: [],
  loading: false,
  error: false,
  loggedIn: getAsync('auth')
}

// Login action
export const loginAction = payload => ({
  type: LOGIN,
  payload
})

// Logout action
export const logoutAction = payload => {
  return {
    type: LOGOUT,
    payload
  }
}

// Login Success action
const loginSuccess = payload => ({
  type: LOGIN_SUCCESS,
  payload
})

// Logout success action
const logoutSuccess = payload => {
  return {
    type: LOGOUT_SUCCESS,
    payload
  }
}

// Login epic
export const loginEpic = action$ => action$
  .ofType(LOGIN)
  .mergeMap(action => staticAjax(apiCall(`${BASE_URL}api/v0/auth/login`, 'POST', false, action.payload))
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
  .mergeMap(action => staticAjax(apiCall(`${BASE_URL}api/v0/auth/logout`, 'DELETE', true, {}, action.payload))
    .map(response => logoutSuccess(response))
    .catch(error => Observable.of({
      type: LOGOUT_FAILURE,
      payload: error
    }, {
      type: ERROR,
      payload: error
    })))

// Auth reducer updates both login
export function loginReducer (state = INITIAL_STATE, action) {
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
      setAsync('auth', JSON.stringify(action.payload.response.data))
      return {
        ...state,
        data: [action.payload.response.data],
        loading: false,
        error: false,
        loggedIn: true
      }
    }
    case LOGIN_FAILURE: {
      return {
        ...state,
        data: action.payload.status,
        loading: false,
        error: true,
        loggedIn: false
      }
    }
    default:
      return state
  }
}

// Auth reducer updates both login and logout
export function logoutReducer (state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOGOUT: {
      return {
        ...state,
        data: [],
        loading: true,
        error: false,
        loggedIn: false
      }
    }
    case LOGOUT_SUCCESS: {
      removeAsync('auth')
      return {
        ...state,
        data: [action.payload.response],
        loading: false,
        error: false,
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

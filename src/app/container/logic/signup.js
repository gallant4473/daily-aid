import { Observable } from 'rxjs/Observable'
import { ajax as staticAjax } from 'rxjs/observable/dom/ajax'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import 'rxjs/add/observable/of'
import { apiCall, BASE_URL } from '../utils'
import { ERROR } from './status'

// Constants

const SIGNUP = 'SIGNUP'
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS'
const SIGNUP_FAILURE = 'SIGNUP_FAILURE'
const INITIAL_STATE = {
  data: [],
  loading: false,
  error: false
}

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

// Signup epic
export const signupEpic = action$ => action$
  .ofType(SIGNUP)
  .mergeMap(action => staticAjax(apiCall(`${BASE_URL}api/v0/auth/register`, 'POST', false, action.payload))
    .map(response => signupSuccess(response))
    .catch(error => Observable.of({
      type: SIGNUP_FAILURE,
      payload: error
    }, {
      type: ERROR,
      payload: error
    })))

// Auth reducer updates both signup and logout
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

import { Observable } from 'rxjs/Observable'
import { ajax as staticAjax } from 'rxjs/observable/dom/ajax'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import 'rxjs/add/observable/of'
import { apiCall, BASE_URL } from '../utils'
import { ERROR } from './status'

// Constants

const GET_USER = 'GET_USER'
const GET_USER_SUCCESS = 'GET_USER_SUCCESS'
const GET_USER_FAILURE = 'GET_USER_FAILURE'

const APPROVE = 'APPROVE'
const APPROVE_SUCCESS = 'APPROVE_SUCCESS'
const APPROVE_FAILURE = 'APPROVE_FAILURE'

const ACTIVATE = 'ACTIVATE'
const ACTIVATE_SUCCESS = 'ACTIVATE_SUCCESS'
const ACTIVATE_FAILURE = 'ACTIVATE_FAILURE'

const INITIAL_STATE = {
  data: [],
  loading: false,
  error: false
}

const INITIAL_STATUS_STATE = {
  data: false,
  loading: false,
  error: false
}

// get user action
export const getUserAction = payload => ({
  type: GET_USER,
  payload
})

// get user Success action
const getUserSuccess = payload => ({
  type: GET_USER_SUCCESS,
  payload
})

// get user action
export const approveAction = payload => ({
  type: APPROVE,
  payload
})

// get user Success action
const approveSuccess = payload => ({
  type: APPROVE_SUCCESS,
  payload
})

// get user action
export const activateAction = payload => ({
  type: ACTIVATE,
  payload
})

// get user Success action
const activateSuccess = payload => ({
  type: ACTIVATE_SUCCESS,
  payload
})

// get user epic
export const getUserEpic = action$ => action$
  .ofType(GET_USER)
  .mergeMap(action => staticAjax(apiCall(`${BASE_URL}api/v0/dashboard/user_list`, 'GET', true, {}, action.payload))
    .map(response => getUserSuccess(response))
    .catch(error => Observable.of({
      type: GET_USER_FAILURE,
      payload: error
    }, {
      type: ERROR,
      payload: error
    })))

export const approveEpic = action$ => action$
  .ofType(APPROVE)
  .mergeMap(action => staticAjax(apiCall(`${BASE_URL}api/v0/dashboard/approve`, 'POST', true, action.payload.data, action.payload.auth))
    .map(response => approveSuccess(response))
    .catch(error => Observable.of({
      type: APPROVE_FAILURE,
      payload: error
    }, {
      type: ERROR,
      payload: error
    })))

export const activateEpic = action$ => action$
  .ofType(ACTIVATE)
  .mergeMap(action => staticAjax(apiCall(`${BASE_URL}api/v0/dashboard/activate`, 'POST', true, action.payload.data, action.payload.auth))
    .map(response => activateSuccess(response))
    .catch(error => Observable.of({
      type: ACTIVATE_FAILURE,
      payload: error
    }, {
      type: ERROR,
      payload: error
    })))

// Auth reducer updates both getUser and logout
export function getUserReducer (state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_USER: {
      return {
        ...state,
        data: [],
        loading: true,
        error: false
      }
    }
    case GET_USER_SUCCESS: {
      return {
        ...state,
        data: action.payload.response.data,
        loading: false,
        error: false
      }
    }
    case GET_USER_FAILURE: {
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

export function approveReducer (state = INITIAL_STATE, action) {
  switch (action.type) {
    case APPROVE: {
      return {
        ...state,
        data: false,
        loading: true,
        error: false
      }
    }
    case APPROVE_SUCCESS: {
      return {
        ...state,
        data: true,
        loading: false,
        error: false
      }
    }
    case APPROVE_FAILURE: {
      return {
        ...state,
        data: false,
        loading: false,
        error: true
      }
    }
    default:
      return state
  }
}

export function activateReducer (state = INITIAL_STATE, action) {
  switch (action.type) {
    case ACTIVATE: {
      return {
        ...state,
        data: false,
        loading: true,
        error: false
      }
    }
    case ACTIVATE_SUCCESS: {
      return {
        ...state,
        data: true,
        loading: false,
        error: false
      }
    }
    case ACTIVATE_FAILURE: {
      return {
        ...state,
        data: false,
        loading: false,
        error: true
      }
    }
    default:
      return state
  }
}

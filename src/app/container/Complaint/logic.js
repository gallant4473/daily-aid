import { Observable } from 'rxjs/Observable'
import { ajax as staticAjax } from 'rxjs/observable/dom/ajax'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import 'rxjs/add/observable/of'
import { apiCall } from '../../utils'
import { ERROR } from '../Status/logic'

// Constants
const ADD_COMPLAINT = 'ADD_COMPLAINT'
const ADD_COMPLAINT_SUCCESS = 'ADD_COMPLAINT_SUCCESS'
const ADD_COMPLAINT_FAILURE = 'ADD_COMPLAINT_FAILURE'

const EDIT_COMPLAINT = 'EDIT_COMPLAINT'
const EDIT_COMPLAINT_SUCCESS = 'EDIT_COMPLAINT_SUCCESS'
const EDIT_COMPLAINT_FAILURE = 'EDIT_COMPLAINT_FAILURE'

const DELETE_COMPLAINT = 'DELETE_COMPLAINT'
const DELETE_COMPLAINT_SUCCESS = 'DELETE_COMPLAINT_SUCCESS'
const DELETE_COMPLAINT_FAILURE = 'DELETE_COMPLAINT_FAILURE'

const GET_COMPLAINT = 'GET_COMPLAINT'
const GET_COMPLAINT_SUCCESS = 'GET_COMPLAINT_SUCCESS'
const GET_COMPLAINT_FAILURE = 'GET_COMPLAINT_FAILURE'

const GET_ALL_COMPLAINT = 'GET_ALL_COMPLAINT'
const GET_ALL_COMPLAINT_SUCCESS = 'GET_ALL_COMPLAINT_SUCCESS'
const GET_ALL_COMPLAINT_NO_REFRESH = 'GET_ALL_COMPLAINT_NO_REFRESH'
const GET_ALL_COMPLAINT_NO_REFRESH_SUCCESS = 'GET_ALL_COMPLAINT_NO_REFRESH_SUCCESS'
const GET_ALL_COMPLAINT_FAILURE = 'GET_ALL_COMPLAINT_FAILURE'

const INITIAL_STATE = {
  data: {},
  loading: false,
  error: false,
  flag: false
}
const INITIAL_NEW_STATE = {
  data: [],
  loading: false,
  error: false,
  flag: false
}

// Add complaint action
export const addComplaintAction = payload => ({
  type: ADD_COMPLAINT,
  payload
})

// Add complaint Success action
const addComplaintSuccess = payload => ({
  type: ADD_COMPLAINT_SUCCESS,
  payload
})

// Edit complaint action
export const editComplaintAction = payload => ({
  type: EDIT_COMPLAINT,
  payload
})

// Edit complaint Success action
const editComplaintSuccess = payload => ({
  type: EDIT_COMPLAINT_SUCCESS,
  payload
})

// Delete complaint action
export const deleteComplaintAction = payload => ({
  type: DELETE_COMPLAINT,
  payload
})

// Delete complaint Success action
const deleteComplaintSuccess = payload => ({
  type: DELETE_COMPLAINT_SUCCESS,
  payload
})

// Get complaint action
export const getComplaintAction = payload => ({
  type: GET_COMPLAINT,
  payload
})

// Get complaint Success action
const getComplaintSuccess = payload => ({
  type: GET_COMPLAINT_SUCCESS,
  payload
})

// Get All complaint action
export const getAllComplaintAction = payload => ({
  type: GET_ALL_COMPLAINT,
  payload
})

// Get All complaint Success action
const getAllComplaintSuccess = payload => ({
  type: GET_ALL_COMPLAINT_SUCCESS,
  payload
})

// Get All complaint action
export const getAllNoRefreshComplaintAction = payload => ({
  type: GET_ALL_COMPLAINT_NO_REFRESH,
  payload
})

// Get All complaint Success action
const getAllNoRefreshComplaintSuccess = payload => ({
  type: GET_ALL_COMPLAINT_NO_REFRESH_SUCCESS,
  payload
})

// Add complaint epic
export const addComplaintEpic = action$ => action$
  .ofType(ADD_COMPLAINT)
  .mergeMap(action => staticAjax(apiCall(`${process.env.apiUrl}complaints`, 'POST', true, action.payload.data))
    .map(response => addComplaintSuccess(response))
    .catch(error => Observable.of({
      type: ADD_COMPLAINT_FAILURE,
      payload: error
    }, {
      type: ERROR,
      payload: error
    })))

// Edit complaint epic
export const editComplaintEpic = action$ => action$
  .ofType(EDIT_COMPLAINT)
  .mergeMap(action => staticAjax(apiCall(`${process.env.apiUrl}complaints/${action.payload.id}`, 'PUT', true, action.payload.data))
    .map(response => editComplaintSuccess(response))
    .catch(error => Observable.of({
      type: EDIT_COMPLAINT_FAILURE,
      payload: error
    }, {
      type: ERROR,
      payload: error
    })))

// Delete complaint epic
export const deleteComplaintEpic = action$ => action$
  .ofType(DELETE_COMPLAINT)
  .mergeMap(action => staticAjax(apiCall(`${process.env.apiUrl}complaints/${action.payload.id}`, 'DELETE', true, {}))
    .map(response => deleteComplaintSuccess(response))
    .catch(error => Observable.of({
      type: DELETE_COMPLAINT_FAILURE,
      payload: error
    }, {
      type: ERROR,
      payload: error
    })))

// Get complaint epic
export const getComplaintEpic = action$ => action$
  .ofType(GET_COMPLAINT)
  .mergeMap(action => staticAjax(apiCall(`${process.env.apiUrl}complaints/${action.payload.id}`, 'GET', true, {}))
    .map(response => getComplaintSuccess(response))
    .catch(error => Observable.of({
      type: GET_COMPLAINT_FAILURE,
      payload: error
    }, {
      type: ERROR,
      payload: error
    })))

// Get All complaint epic
export const getAllComplaintEpic = action$ => action$
  .ofType(GET_ALL_COMPLAINT)
  .mergeMap(action => staticAjax(apiCall(`${process.env.apiUrl}complaints/list/${action.payload.id ? action.payload.id : ''}`, 'GET', true, {}))
    .map(response => getAllComplaintSuccess(response))
    .catch(error => Observable.of({
      type: GET_ALL_COMPLAINT_FAILURE,
      payload: error
    }, {
      type: ERROR,
      payload: error
    })))

// Get All no refresh complaint epic
export const getAllNoRefreshComplaintEpic = action$ => action$
  .ofType(GET_ALL_COMPLAINT_NO_REFRESH)
  .mergeMap(action => staticAjax(apiCall(`${process.env.apiUrl}complaints/list/${action.payload.id ? action.payload.id : ''}`, 'GET', true, {}))
    .map(response => getAllNoRefreshComplaintSuccess(response))
    .catch(error => Observable.of({
      type: GET_ALL_COMPLAINT_FAILURE,
      payload: error
    }, {
      type: ERROR,
      payload: error
    })))

// Add complaint reducer
export function addComplaintReducer (state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD_COMPLAINT: {
      return {
        ...state,
        data: {},
        loading: true,
        error: false,
        flag: false
      }
    }
    case ADD_COMPLAINT_SUCCESS: {
      return {
        ...state,
        data: action.payload.response,
        loading: false,
        error: false,
        flag: true
      }
    }
    case ADD_COMPLAINT_FAILURE: {
      return {
        ...state,
        data: {},
        loading: false,
        error: true,
        flag: false
      }
    }
    default:
      return state
  }
}

// Edit complaint reducer
export function editComplaintReducer (state = INITIAL_STATE, action) {
  switch (action.type) {
    case EDIT_COMPLAINT: {
      return {
        ...state,
        data: {},
        loading: true,
        error: false,
        flag: false
      }
    }
    case EDIT_COMPLAINT_SUCCESS: {
      return {
        ...state,
        data: action.payload.response,
        loading: false,
        error: false,
        flag: true
      }
    }
    case EDIT_COMPLAINT_FAILURE: {
      return {
        ...state,
        data: {},
        loading: false,
        error: true,
        flag: false
      }
    }
    default:
      return state
  }
}

// Delete complaint reducer
export function deleteComplaintReducer (state = INITIAL_STATE, action) {
  switch (action.type) {
    case DELETE_COMPLAINT: {
      return {
        ...state,
        data: {},
        loading: true,
        error: false,
        flag: false
      }
    }
    case DELETE_COMPLAINT_SUCCESS: {
      return {
        ...state,
        data: action.payload.response,
        loading: false,
        error: false,
        flag: true
      }
    }
    case DELETE_COMPLAINT_FAILURE: {
      return {
        ...state,
        data: {},
        loading: false,
        error: true,
        flag: false
      }
    }
    default:
      return state
  }
}

// get complaint reducer
export function getComplaintReducer (state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_COMPLAINT: {
      return {
        ...state,
        data: {},
        loading: true,
        error: false,
        flag: false
      }
    }
    case GET_COMPLAINT_SUCCESS: {
      return {
        ...state,
        data: action.payload.response.data,
        loading: false,
        error: false,
        flag: true
      }
    }
    case GET_COMPLAINT_FAILURE: {
      return {
        ...state,
        data: {},
        loading: false,
        error: true,
        flag: false
      }
    }
    default:
      return state
  }
}

// get all complaint reducer
export function getAllComplaintReducer (state = INITIAL_NEW_STATE, action) {
  switch (action.type) {
    case GET_ALL_COMPLAINT: {
      return {
        ...state,
        data: [],
        loading: true,
        error: false,
        flag: false
      }
    }
    case GET_ALL_COMPLAINT_SUCCESS: {
      return {
        ...state,
        data: action.payload.response.data,
        loading: false,
        error: false,
        flag: true
      }
    }
    case GET_ALL_COMPLAINT_NO_REFRESH_SUCCESS: {
      return {
        ...state,
        data: action.payload.response.data,
        loading: false,
        error: false,
        flag: true
      }
    }
    case GET_ALL_COMPLAINT_FAILURE: {
      return {
        ...state,
        data: [],
        loading: false,
        error: true,
        flag: false
      }
    }
    default:
      return state
  }
}

import { Observable } from 'rxjs/Observable'
import { ajax as staticAjax } from 'rxjs/observable/dom/ajax'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import 'rxjs/add/observable/of'
import { apiCall } from '../../utils'
import { ERROR } from '../Status/logic'

// Constants
const ADD_ANNOUNCEMENT = 'ADD_ANNOUNCEMENT'
const ADD_ANNOUNCEMENT_SUCCESS = 'ADD_ANNOUNCEMENT_SUCCESS'
const ADD_ANNOUNCEMENT_FAILURE = 'ADD_ANNOUNCEMENT_FAILURE'

const EDIT_ANNOUNCEMENT = 'EDIT_ANNOUNCEMENT'
const EDIT_ANNOUNCEMENT_SUCCESS = 'EDIT_ANNOUNCEMENT_SUCCESS'
const EDIT_ANNOUNCEMENT_FAILURE = 'EDIT_ANNOUNCEMENT_FAILURE'

const DELETE_ANNOUNCEMENT = 'DELETE_ANNOUNCEMENT'
const DELETE_ANNOUNCEMENT_SUCCESS = 'DELETE_ANNOUNCEMENT_SUCCESS'
const DELETE_ANNOUNCEMENT_FAILURE = 'DELETE_ANNOUNCEMENT_FAILURE'

const GET_ANNOUNCEMENT = 'GET_ANNOUNCEMENT'
const GET_ANNOUNCEMENT_SUCCESS = 'GET_ANNOUNCEMENT_SUCCESS'
const GET_ANNOUNCEMENT_FAILURE = 'GET_ANNOUNCEMENT_FAILURE'

const GET_ALL_ANNOUNCEMENT = 'GET_ALL_ANNOUNCEMENT'
const GET_ALL_ANNOUNCEMENT_SUCCESS = 'GET_ALL_ANNOUNCEMENT_SUCCESS'
const GET_ALL_ANNOUNCEMENT_FAILURE = 'GET_ALL_ANNOUNCEMENT_FAILURE'

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

// Add announcement action
export const addAnnouncementAction = payload => ({
  type: ADD_ANNOUNCEMENT,
  payload
})

// Add announcement Success action
const addAnnouncementSuccess = payload => ({
  type: ADD_ANNOUNCEMENT_SUCCESS,
  payload
})

// Edit announcement action
export const editAnnouncementAction = payload => ({
  type: EDIT_ANNOUNCEMENT,
  payload
})

// Edit announcement Success action
const editAnnouncementSuccess = payload => ({
  type: EDIT_ANNOUNCEMENT_SUCCESS,
  payload
})

// Delete announcement action
export const deleteAnnouncementAction = payload => ({
  type: DELETE_ANNOUNCEMENT,
  payload
})

// Delete announcement Success action
const deleteAnnouncementSuccess = payload => ({
  type: DELETE_ANNOUNCEMENT_SUCCESS,
  payload
})

// Get announcement action
export const getAnnouncementAction = payload => ({
  type: GET_ANNOUNCEMENT,
  payload
})

// Get announcement Success action
const getAnnouncementSuccess = payload => ({
  type: GET_ANNOUNCEMENT_SUCCESS,
  payload
})

// Get All announcement action
export const getAllAnnouncementAction = payload => ({
  type: GET_ALL_ANNOUNCEMENT,
  payload
})

// Get All announcement Success action
const getAllAnnouncementSuccess = payload => ({
  type: GET_ALL_ANNOUNCEMENT_SUCCESS,
  payload
})

// Add announcement epic
export const addAnnouncementEpic = action$ => action$
  .ofType(ADD_ANNOUNCEMENT)
  .mergeMap(action => staticAjax(apiCall(`${process.env.apiUrl}announcements`, 'POST', true, action.payload.data))
    .map(response => addAnnouncementSuccess(response))
    .catch(error => Observable.of({
      type: ADD_ANNOUNCEMENT_FAILURE,
      payload: error
    }, {
      type: ERROR,
      payload: error
    })))

// Edit announcement epic
export const editAnnouncementEpic = action$ => action$
  .ofType(EDIT_ANNOUNCEMENT)
  .mergeMap(action => staticAjax(apiCall(`${process.env.apiUrl}announcements/${action.payload.id}`, 'PUT', true, action.payload.data))
    .map(response => editAnnouncementSuccess(response))
    .catch(error => Observable.of({
      type: EDIT_ANNOUNCEMENT_FAILURE,
      payload: error
    }, {
      type: ERROR,
      payload: error
    })))

// Delete announcement epic
export const deleteAnnouncementEpic = action$ => action$
  .ofType(DELETE_ANNOUNCEMENT)
  .mergeMap(action => staticAjax(apiCall(`${process.env.apiUrl}announcements/${action.payload.id}`, 'DELETE', true, {}))
    .map(response => deleteAnnouncementSuccess(response))
    .catch(error => Observable.of({
      type: DELETE_ANNOUNCEMENT_FAILURE,
      payload: error
    }, {
      type: ERROR,
      payload: error
    })))

// Get announcement epic
export const getAnnouncementEpic = action$ => action$
  .ofType(GET_ANNOUNCEMENT)
  .mergeMap(action => staticAjax(apiCall(`${process.env.apiUrl}announcements/${action.payload.id}`, 'GET', true, {}))
    .map(response => getAnnouncementSuccess(response))
    .catch(error => Observable.of({
      type: GET_ANNOUNCEMENT_FAILURE,
      payload: error
    }, {
      type: ERROR,
      payload: error
    })))

// Get All announcement epic
export const getAllAnnouncementEpic = action$ => action$
  .ofType(GET_ALL_ANNOUNCEMENT)
  .mergeMap(() => staticAjax(apiCall(`${process.env.apiUrl}announcements/list`, 'GET', true, {}))
    .map(response => getAllAnnouncementSuccess(response))
    .catch(error => Observable.of({
      type: GET_ALL_ANNOUNCEMENT_FAILURE,
      payload: error
    }, {
      type: ERROR,
      payload: error
    })))

// Add announcement reducer
export function addAnnouncementReducer (state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD_ANNOUNCEMENT: {
      return {
        ...state,
        data: {},
        loading: true,
        error: false,
        flag: false
      }
    }
    case ADD_ANNOUNCEMENT_SUCCESS: {
      return {
        ...state,
        data: action.payload.response,
        loading: false,
        error: false,
        flag: true
      }
    }
    case ADD_ANNOUNCEMENT_FAILURE: {
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

// Edit announcement reducer
export function editAnnouncementReducer (state = INITIAL_STATE, action) {
  switch (action.type) {
    case EDIT_ANNOUNCEMENT: {
      return {
        ...state,
        data: {},
        loading: true,
        error: false,
        flag: false
      }
    }
    case EDIT_ANNOUNCEMENT_SUCCESS: {
      return {
        ...state,
        data: action.payload.response,
        loading: false,
        error: false,
        flag: true
      }
    }
    case EDIT_ANNOUNCEMENT_FAILURE: {
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

// Delete announcement reducer
export function deleteAnnouncementReducer (state = INITIAL_STATE, action) {
  switch (action.type) {
    case DELETE_ANNOUNCEMENT: {
      return {
        ...state,
        data: {},
        loading: true,
        error: false,
        flag: false
      }
    }
    case DELETE_ANNOUNCEMENT_SUCCESS: {
      return {
        ...state,
        data: action.payload.response,
        loading: false,
        error: false,
        flag: true
      }
    }
    case DELETE_ANNOUNCEMENT_FAILURE: {
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

// get announcement reducer
export function getAnnouncementReducer (state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_ANNOUNCEMENT: {
      return {
        ...state,
        data: {},
        loading: true,
        error: false,
        flag: false
      }
    }
    case GET_ANNOUNCEMENT_SUCCESS: {
      return {
        ...state,
        data: action.payload.response.data,
        loading: false,
        error: false,
        flag: true
      }
    }
    case GET_ANNOUNCEMENT_FAILURE: {
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

// get all announcement reducer
export function getAllAnnouncementReducer (state = INITIAL_NEW_STATE, action) {
  switch (action.type) {
    case GET_ALL_ANNOUNCEMENT: {
      return {
        ...state,
        data: [],
        loading: true,
        error: false,
        flag: false
      }
    }
    case GET_ALL_ANNOUNCEMENT_SUCCESS: {
      return {
        ...state,
        data: action.payload.response.data,
        loading: false,
        error: false,
        flag: true
      }
    }
    case GET_ALL_ANNOUNCEMENT_FAILURE: {
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

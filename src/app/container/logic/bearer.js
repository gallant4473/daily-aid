import { LOGIN_SUCCESS } from './login'
const BEARER = 'BEARER'
const INITIAL_STATE = {
  access_token: ''
}

export const getBearerAction = (payload) => {
  return {
    type: BEARER,
    payload
  }
}

export function getBearerReducer (state = INITIAL_STATE, action) {
  switch (action.type) {
    case BEARER: {
      return action.payload
    }
    case LOGIN_SUCCESS: {
      return action.payload.response.data
    }
    default:
      return state
  }
}

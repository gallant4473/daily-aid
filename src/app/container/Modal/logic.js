const MODAL = 'MODAL'
const MODAL_CLOSE = 'MODAL_CLOSE'
const INITIAL_STATE = {
  type: '',
  open: false,
  dialog: false,
  size: 'large'
}

export const modalAction = payload => ({
  type: MODAL,
  payload
})

export const modalCloseAction = () => ({
  type: MODAL_CLOSE,
  payload: INITIAL_STATE
})

export const modalReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MODAL: {
      return {
        ...state,
        ...action.payload
      }
    }
    case MODAL_CLOSE: {
      return {
        ...state,
        ...action.payload
      }
    }
    default:
      return state
  }
}

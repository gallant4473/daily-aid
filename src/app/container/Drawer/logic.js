const DRAWER = 'DRAWER'

export const drawerAction = payload => ({
  type: DRAWER,
  payload
})

const STATE = {
  type: '',
  position: 'left',
  noOverlay: false,
  open: false
}
export function drawerReducer (state = STATE, action) {
  switch (action.type) {
    case DRAWER:
      return {
        type: action.payload.type ? action.payload.type : '',
        position: action.payload.position ? action.payload.position : 'left',
        noOverlay: action.payload.noOverlay ? action.payload.noOverlay : false,
        open: action.payload.open ? action.payload.open : false
      }
    default:
      return state
  }
}

import { actionTypes } from './actions';

export const initialState = {
  menuOpened: false
}

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.TOGGLE_MENU:
      return {
        ...state, 
        menuOpened: action.value
      }
    default:
      return state;
  }
}
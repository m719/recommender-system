import { Reducer } from 'redux'
import { UsersActionTypes,UsersState } from './types'

// Type-safe initialState!
export const initialState: UsersState = {
  id: ''
}

// Thanks to Redux 4's much simpler typings, we can take away a lot of typings on the reducer side,
// everything will remain type-safe.
const reducer: Reducer<UsersState> = (state = initialState, action) => {
  switch (action.type) {
    case UsersActionTypes.SET_USER_ID: {
      return { ...state, id: action.payload }
    }
    default: {
      return state
    }
  }
}

// Instead of using default export, we use named exports. That way we can group these exports
// inside the `index.js` folder.
export { reducer as usersReducer }
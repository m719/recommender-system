
import { action } from 'typesafe-actions'
import { UsersActionTypes } from './types'

export const setUserId = (id: any) => action(UsersActionTypes.SET_USER_ID, id)
import { SET_CASE_DATA } from './actionTypes'

export const setCaseData = cases => ({
  type: SET_CASE_DATA,
  payload: {
    cases
  }
})
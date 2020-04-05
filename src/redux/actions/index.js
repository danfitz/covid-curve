import { SET_CASES, GET_CASES, SET_HEALTH_UNIT, SET_HEALTH_UNITS } from './actionTypes'

export const setCases = cases => ({
  type: SET_CASES,
  payload: {
    cases
  }
})

export const getCases = () => ({
  type: GET_CASES
})

export const setHealthUnit = healthUnit => ({
  type: SET_HEALTH_UNIT,
  payload: {
    healthUnit
  }
})

export const setHealthUnits = healthUnits => ({
  type: SET_HEALTH_UNITS,
  payload: {
    healthUnits
  }
})
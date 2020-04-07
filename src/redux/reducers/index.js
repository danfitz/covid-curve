import { combineReducers } from 'redux'
import { SET_CASES, SET_HEALTH_UNIT, SET_HEALTH_UNITS } from '../actions/actionTypes'
import { includeGrowthFactors } from '../../utils'

const cases = (state=[], action) => {
  switch (action.type) {
    case SET_CASES:
      const { cases } = action.payload
      return includeGrowthFactors(cases, 'total')
    default:
      return state
  }
}

const healthUnit = (state='All', action) => {
  switch (action.type) {
    case SET_HEALTH_UNIT:
      const { healthUnit } = action.payload
      return healthUnit
    default:
      return state
  }
}

const healthUnits = (state=[], action) => {
  switch (action.type) {
    case SET_HEALTH_UNITS:
      const { healthUnits } = action.payload
      return healthUnits
    default:
      return state
  }
}

const rootReducer = combineReducers({
  cases,
  healthUnit,
  healthUnits
})

export default rootReducer
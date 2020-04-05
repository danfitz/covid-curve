import { combineReducers } from 'redux'
import { SET_CASE_DATA } from '../actions/actionTypes'
import moment from 'moment'

const initialState = []

const cases = (state=initialState, action) => {
  switch (action.type) {
    case SET_CASE_DATA:
      const { cases } = action.payload
      const mappedCases = cases.map(c => ({
        date: moment(c['Reported Date']).format('MMM D'),
        total: c['Total Cases'],
        positive: c['Confirmed Positive'],
        deceased: c['Deaths'],
        resolved: c['Resolved']
      }))

      return mappedCases
    default:
      return state
  }
}

const rootReducer = combineReducers({
  cases
})

export default rootReducer
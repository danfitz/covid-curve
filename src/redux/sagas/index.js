import { all } from 'redux-saga/effects'
import getHealthUnits from './getHealthUnits'
import getCasesSaga from './getCasesSaga'

export default function* rootSaga() {
  yield all([
    getHealthUnits(),
    getCasesSaga()
  ])
}
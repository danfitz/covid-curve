import { all } from 'redux-saga/effects'
import getCaseData from './getCaseData'

export default function* rootSaga() {
  yield all([
    getCaseData()
  ])
}
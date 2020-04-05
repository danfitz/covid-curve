import { call, put, select, takeLatest } from 'redux-saga/effects'
// import axios from 'axios'
import { db } from '../../firebase'
import { setCases } from '../actions'
import { GET_CASES } from '../actions/actionTypes'

export function* getCases() {
  try {
    const healthUnit = yield select(state => state.healthUnit)
    const ref = db.collection('cases').doc(healthUnit)

    const doc = yield call([ref, ref.get])
    const { cases } = doc.data()
    
    yield put(setCases(cases))
  } catch (error) {
    console.error(error.message)
  }
}

export default function* getCasesSaga() {
  yield takeLatest(GET_CASES, getCases)
}
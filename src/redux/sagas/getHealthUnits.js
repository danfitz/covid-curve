import { call, put } from 'redux-saga/effects'
// import axios from 'axios'
import { db } from '../../firebase'
import { setHealthUnits } from '../actions'

export default function* getHealthUnits() {
  try {
    const ref = db.collection('metadata').doc('options')

    const doc = yield call([ref, ref.get])
    const { healthUnits } = doc.data()
    
    yield put(setHealthUnits(healthUnits))
  } catch (error) {
    console.error(error.message)
  }
}
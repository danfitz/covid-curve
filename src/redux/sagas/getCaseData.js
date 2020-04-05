import { call, put } from 'redux-saga/effects'
import axios from 'axios'
import { setCaseData } from '../actions'

const proxy = 'https://cors-anywhere.herokuapp.com/'
const endpoint = 'https://data.ontario.ca/api/3/action/datastore_search?resource_id=ed270bb8-340b-41f9-a7c6-e8ef587e6d11'

function* getCaseData() {
  try {
    const response = yield call(
      axios,
      {
        method: 'get',
        url: proxy + endpoint
      }
    )

    yield put(setCaseData(response.data.result.records))
  } catch (error) {
    console.error(error.message)
  }
}

export default getCaseData
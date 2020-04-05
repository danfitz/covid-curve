import { call, put } from 'redux-saga/effects'
import axios from 'axios'
import { setCaseData } from '../actions'

const proxy = 'https://cors-anywhere.herokuapp.com/'
const endpoint = 'https://data.ontario.ca/api/3/action/datastore_search?resource_id=ed270bb8-340b-41f9-a7c6-e8ef587e6d11&limit=100000'

const endpoint2 = 'https://data.ontario.ca/api/3/action/datastore_search?resource_id=455fd63b-603d-4608-8216-7d8647f43350&limit=1000000'

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

    const response2 = yield call(
      axios,
      {
        method: 'get',
        url: proxy + endpoint2
      }
    )

    console.log(response2)
    const data = parseResponse(response2.data.result.records)
    console.log(Object.keys(data).length)
  } catch (error) {
    console.error(error.message)
  }
}

function parseResponse(response) {
  return response.reduce((acc, cur) => {
    const city = cur['Reporting_PHU_City']
    const date = cur['ACCURATE_EPISODE_DATE']
    const outcome = cur['OUTCOME1']

    if (!acc[city]) acc[city] = []

    const lastDay = acc[city][acc[city].length - 1]
    
    let newDay
    if (lastDay) {
      newDay = { ...lastDay, date }
    } else {
      newDay = {
        date,
        total: 0,
        positive: 0,
        resolved: 0,
        deceased: 0
      }
    }

    newDay.total++

    switch (outcome) {
      case 'Not Resolved':
        newDay.positive++
        break
      case 'Resolved':
        newDay.resolved++
        break
      case 'Fatal':
        newDay.deceased++
        break
      default:
        break
    }

    if (lastDay && lastDay.date === date) {
      acc[city][acc[city].length - 1] = newDay
    } else {
      acc[city].push(newDay)
    }

    return acc
  }, {})
}

export default getCaseData
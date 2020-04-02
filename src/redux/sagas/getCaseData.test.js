import getCaseData from './getCaseData'
import { call, put } from 'redux-saga/effects'
import axios from 'axios'
import { setCaseData } from '../actions'

const proxy = 'https://cors-anywhere.herokuapp.com/'
const endpoint = 'https://data.ontario.ca/api/3/action/datastore_search?resource_id=ed270bb8-340b-41f9-a7c6-e8ef587e6d11'

describe('generator for getCaseData', () => {
  const gen = getCaseData()

  test('makes GET request at proxied endpoint', () => {
    expect(gen.next().value)
      .toEqual(
        call(axios, {
          method: 'get',
          url: proxy + endpoint
        })
      )
  })

  test('executes setCaseData action with response data as argument', () => {
    const dummyResponse = {
      data: {
        result: {
          records: [
            { date: '2020-03-01', positive: 1000, deceased: 50, resolved: 100 }
          ]
        }
      }
    }

    expect(gen.next(dummyResponse).value)
      .toEqual(put(setCaseData(dummyResponse.data.result.records)))
  })

  test('generator completes', () => {
    expect(gen.next())
      .toEqual({
        done: true,
        value: undefined
      })
  })
})
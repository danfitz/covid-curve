import { getCases } from './getCasesSaga'
import { call, put } from 'redux-saga/effects'
import axios from 'axios'
import { setCases } from '../actions'

describe('generator for getCases', () => {
  const gen = getCases()

  test('selects current health unit', () => {
    expect(gen.next().value)
  })

  test('makes GET request at proxied endpoint', () => {
    expect(gen.next().value)
      .toEqual(
        call(axios, {
          method: 'get',
          url: proxy + endpoint
        })
      )
  })

  test('executes setCases action with response data as argument', () => {
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
      .toEqual(put(setCases(dummyResponse.data.result.records)))
  })

  test('generator completes', () => {
    expect(gen.next())
      .toEqual({
        done: true,
        value: undefined
      })
  })
})
import getHealthUnits from './getHealthUnits'
import { call, put } from 'redux-saga/effects'
import { db } from '../../firebase'
import { setHealthUnits } from '../actions'

describe('generator for getHealthUnits', () => {
  const gen = getHealthUnits()

  test('makes GET request to Firestore for health units options', () => {
    const ref = db.collection('metadata').doc('options')

    expect(gen.next().value)
      .toEqual(
        call([ref, ref.get])
      )
  })

  test('executes setHealthUnits action, passing healthUnits as argument', () => {
    const dummyDoc = {
      data: () => ({
        healthUnits: ['All', 'Peel Public Health', 'Toronto Public Health']
      })
    }

    expect(gen.next(dummyDoc).value)
      .toEqual(
        put(setHealthUnits(dummyDoc.data().healthUnits))
      )
  })

  test('generator completes', () => {
    expect(gen.next())
      .toEqual({
        done: true,
        value: undefined
      })
  })
})
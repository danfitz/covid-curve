import { unitGetter, getCases } from './getCasesSaga'
import { call, put, select } from 'redux-saga/effects'
import { db } from '../../firebase'
import { setCases } from '../actions'

describe('generator for getCases', () => {
  const gen = getCases()
  const healthUnit = 'Toronto Public Health'

  test('selects current health unit', () => {
    expect(gen.next().value)
      .toMatchObject(
        select(unitGetter)
      )
  })

  test('makes GET request for Firestore data at healthUnit doc', () => {
    const ref = db.collection('cases').doc(healthUnit)
    expect(gen.next(healthUnit).value)
      .toEqual(
        call([ref, ref.get])
      )
  })

  test('executes setCases action with cases from doc.data() as argument', () => {
    const dummyDoc = {
      data: () => ({
        cases: [
          { date: 'Mar 23', total: 1, positive: 1, resolved: 0, deceased: 0 },
          { date: 'Mar 24', total: 3, positive: 1, resolved: 1, deceased: 1 }
        ]
      })
    }

    expect(gen.next(dummyDoc).value)
      .toEqual(
        put(setCases(dummyDoc.data().cases))
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
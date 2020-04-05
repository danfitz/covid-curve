const functions = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp()
const db = admin.firestore()
const axios = require('axios')
const moment = require('moment')

const endpoint1 = 'https://data.ontario.ca/api/3/action/datastore_search?resource_id=ed270bb8-340b-41f9-a7c6-e8ef587e6d11&limit=100000'
const endpoint2 = 'https://data.ontario.ca/api/3/action/datastore_search?resource_id=455fd63b-603d-4608-8216-7d8647f43350&limit=1000000'

const sortByDate = (data, dateKey) => {
  return data.sort((a, b) => moment(a[dateKey]).valueOf() - moment(b[dateKey]).valueOf())
}

const cleanAllCases = cases => {
  return sortByDate(cases, 'Reported Date')
    .map(c => ({
      date: moment(c['Reported Date']).format('MMM D'),
      total: c['Total Cases'],
      positive: c['Confirmed Positive'],
      deceased: c['Deaths'],
      resolved: c['Resolved']
    }))
}

const organizeCasesByHealthUnit = cases => {
  return sortByDate(cases, 'ACCURATE_EPISODE_DATE')
    .reduce((acc, cur) => {
      const healthUnit = cur['Reporting_PHU']
      const date = moment(cur['ACCURATE_EPISODE_DATE']).format('MMM D')
      const outcome = cur['OUTCOME1']

      if (!acc[healthUnit]) acc[healthUnit] = []

      const lastDay = acc[healthUnit][acc[healthUnit].length - 1]
      
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
        acc[healthUnit][acc[healthUnit].length - 1] = newDay
      } else {
        acc[healthUnit].push(newDay)
      }

      return acc
    }, {})
}

exports.ontarioRunner = functions.pubsub.schedule('every 60 minutes')
  .timeZone('America/New_York')
  .onRun(async context => {
    try {
      const response1 = await axios({
        method: 'get',
        url: endpoint1
      })

      const response2 = await axios({
        method: 'get',
        url: endpoint2
      })

      const allCases = cleanAllCases(response1.data.result.records)
      const casesByHealthUnit = organizeCasesByHealthUnit(response2.data.result.records)

      const batch = db.batch()

      const ref = db.collection('cases').doc('All')
      batch.set(ref, { cases: allCases })

      Object.keys(casesByHealthUnit).forEach(unit => {
        const ref = db.collection('cases').doc(unit)
        batch.set(ref, { cases: casesByHealthUnit[unit] })
      })

      const healthUnits = Object.keys(casesByHealthUnit).sort()
      healthUnits.unshift('All')
      const metaRef = db.collection('metadata').doc('options')
      batch.update(metaRef, { healthUnits })

      return batch.commit()
    } catch (error) {
      console.log(error)
    }
  })
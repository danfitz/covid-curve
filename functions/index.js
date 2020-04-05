const functions = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp()
const db = admin.firestore()
const axios = require('axios')
const moment = require('moment')

// const proxy = 'https://cors-anywhere.herokuapp.com/'
const endpoint1 = 'https://data.ontario.ca/api/3/action/datastore_search?resource_id=ed270bb8-340b-41f9-a7c6-e8ef587e6d11&limit=100000'
const endpoint2 = 'https://data.ontario.ca/api/3/action/datastore_search?resource_id=455fd63b-603d-4608-8216-7d8647f43350&limit=1000000'

const cleanAllCases = cases => {
  return cases.map(c => ({
    date: moment(c['Reported Date']).format('MMM D'),
    total: c['Total Cases'],
    positive: c['Confirmed Positive'],
    deceased: c['Deaths'],
    resolved: c['Resolved']
  }))

}

const organizeCasesByCity = cases => {
  return cases.reduce((acc, cur) => {
    const city = cur['Reporting_PHU_City']
    const date = moment(cur['ACCURATE_EPISODE_DATE']).format('MMM D')
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

exports.ontarioRunner = functions.pubsub.schedule('* * * * *')
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
      const casesByCity = organizeCasesByCity(response2.data.result.records)

      const batch = db.batch()

      const ref = db.collection('cases').doc('all')
      batch.set(ref, { cases: allCases })

      Object.keys(casesByCity).forEach(city => {
        const ref = db.collection('cases').doc(city)
        batch.set(ref, { cases: casesByCity[city] })
      })

      return batch.commit()
    } catch (error) {
      console.log(error)
    }
  })
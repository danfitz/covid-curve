import React from 'react'
import { connect } from 'react-redux'
import CaseLineChart from '../components/CaseLineChart'

const ChartsView = ({ cases }) => {
  return (
    <>
      <h1>COVID-19 Curve for Ontario</h1>
      <CaseLineChart cases={cases}  />
    </>
  )
}

const mapStateToProps = state => ({ cases: state.cases })

const ConnectedChartsView = connect(
  mapStateToProps
)(ChartsView)

export default ConnectedChartsView

import React from 'react'
import { LineChart, Line, XAxis, YAxis, Legend, CartesianGrid, Tooltip, Label } from 'recharts'

const CaseLineChart = ({ cases }) => (
  <LineChart width={800} height={400} data={cases}>
    <Line type='monotone' dataKey='positive' stroke='#ffc405' />
    <Line type='monotone' dataKey='dead' stroke='red' />
    <Line type='monotone' dataKey='resolved' stroke='green' />
    <XAxis dataKey='date'>
      <Label value='Date' offset={-5} position='insideBottom' />
    </XAxis>
    <YAxis>
      <Label value="Number of cases" offset={10} angle={-90} position='insideLeft' />
    </YAxis>
    <Legend verticalAlign='top' />
    <Tooltip />
    <CartesianGrid strokeDasharray="3 3" />
  </LineChart>
)


export default CaseLineChart
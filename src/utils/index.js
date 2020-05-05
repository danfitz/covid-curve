export const includeGrowthFactors = (data, dataKey) => {
  const newData = []

  for (let i = 0; i < data.length; i++) {
    const newDatum = { ...data[i] }

    // Start at 3rd item
    if (i >= 2) {
      const todaysChange = data[i][dataKey] - data[i - 1][dataKey]
      const yesterdaysChange = data[i - 1][dataKey] - data[i - 2][dataKey]
      const growthFactor = todaysChange / yesterdaysChange

      if (isFinite(growthFactor)) {
        newDatum.growthFactor = parseFloat(growthFactor.toFixed(2))
      }
    }

    newData.push(newDatum)
  }

  return newData
}

export const calcMedian = (key, cases) => {
  if (cases.length === 0) return undefined

  cases = [...cases] // To prevent mutation of sort

  const sortedCases = cases.sort((a, b) => a[key] - b[key])

  let median

  if (sortedCases.length % 2 !== 0) {
    const middleCase = sortedCases[Math.floor(sortedCases.length / 2)]
    median = middleCase[key]
  } else {
    const middleLeftCase = sortedCases[(sortedCases.length / 2) - 1]
    const middleRightCase = sortedCases[sortedCases.length / 2]
    median = (middleLeftCase[key] + middleRightCase[key]) / 2
  }

  return median.toFixed(2)
}
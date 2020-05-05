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

export const calcMedianGrowthFactor = cases => {
  if (cases.length === 0) return undefined

  const sortedCases = cases.sort((a, b) => a.growthFactor - b.growthFactor)
  console.log(sortedCases)

  let medianGrowthFactor

  if (sortedCases.length % 2 !== 0) {
    const middleCase = sortedCases[Math.floor(sortedCases.length / 2)]
    medianGrowthFactor = middleCase.growthFactor
  } else {
    const middleLeftCase = sortedCases[(sortedCases.length / 2) - 1]
    const middleRightCase = sortedCases[sortedCases.length / 2]
    medianGrowthFactor = (middleLeftCase.growthFactor + middleRightCase.growthFactor) / 2
  }

  return medianGrowthFactor.toFixed(2)
}
export const includeGrowthFactors = (data, dataKey) => {
  const newData = []
  
  for (let i = 0; i < data.length; i++) {
    const newDatum = { ...data[i] }

    // Start at 3rd item
    if (i >= 2) {
      const todaysChange = data[i][dataKey] - data[i-1][dataKey]
      const yesterdaysChange = data[i-1][dataKey] - data[i-2][dataKey]
      const growthFactor = todaysChange / yesterdaysChange
  
      if (isFinite(growthFactor)) {
        newDatum.growthFactor = parseFloat(growthFactor.toFixed(2))
      }
    }
    
    newData.push(newDatum)
  }

  return newData
}
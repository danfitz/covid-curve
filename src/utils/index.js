export const includeGrowthFactors = (data, dataKey) => {
  const newData = []
  
  for (let i = 0; i < data.length; i++) {
    const newDatum = { ...data[i] }

    if (i !== 0) {
      const growthFactor = data[i][dataKey] / data[i-1][dataKey]
  
      if (isFinite(growthFactor)) {
        newDatum.growthFactor = parseFloat(growthFactor.toFixed(2))
      }
    }
    
    newData.push(newDatum)
  }

  return newData
}
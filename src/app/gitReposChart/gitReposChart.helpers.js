export const sortChartDataByType = (condition, property, array, amount) =>
  array.sort((a, b) =>
    condition === 'asc' ? b[property] - a[property] : a[property] - b[property]
  ).slice(0, amount)

export const sortChartData = (condition, property, array) =>
  array.sort((a, b) =>
    condition === 'asc' ? b[property] - a[property] : a[property] - b[property]
  )

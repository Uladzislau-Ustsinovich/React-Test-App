import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState, useCallback } from 'react'
import { fetchMembers } from '../GitReposTable/redux/action'
import { ChartView } from '../Shareable/ChartView/ChartView'
import { Loader } from '../Shareable/Loader/Loader'
import { GitReposChartWrapper } from './GitReposChart.styled'
import { Select } from '../Shareable/Select/Select'
import { gitReposDataSelector } from '../GitReposTable/redux/gitReposTable.selectors'

const selectCategories = ['forks', 'watchers', 'issues'] // Y AXIS

export const GitReposChart = () => {
  const dispatch = useDispatch()
  const [isLoading, setLoading] = useState(false)
  const [topAmount, setTopAmount] = useState(0)
  const [chartData, setChartData] = useState([])
  const [axisSelect, setAxisSelect] = useState('forks')
  const [sorting, setSorting] = useState('asc')

  const data = useSelector(gitReposDataSelector)

  const memoizedOptionChangeHandler = useCallback(() => {
    sorting === 'asc'
      ? setChartData(data.sort((a, b) => b[axisSelect] - a[axisSelect]).slice(0, topAmount))
      : setChartData(data.sort((a, b) => a[axisSelect] - b[axisSelect]).slice(0, topAmount))
  }, [topAmount, axisSelect, data, sorting])

  useEffect(() => {
    if (!data.length) {
      setLoading(true)
      dispatch(fetchMembers()).then(() => {
        setLoading(false)
        setTopAmount(data.length)
      })
    }
  }, [data.length, dispatch])

  useEffect(() => {
    if (data.length >= 10) setTopAmount(10)
    else setTopAmount(data.length)
    memoizedOptionChangeHandler()
  }, [data.length, topAmount, axisSelect, sorting, memoizedOptionChangeHandler])

  const options = React.useMemo(
    () =>
      selectCategories.map((i, ind) => (
        <option value={i} key={ind}>
          {i.toUpperCase()}
        </option>
      )),
    []
  )

  if (isLoading) {
    return <Loader />
  }

  return (
    <GitReposChartWrapper>
      <Select setHandler={setAxisSelect}>{options}</Select>
      <Select setHandler={setSorting}>
        <option value="asc">Top {topAmount} ascending</option>
        <option value="desc">Top {topAmount} descending</option>
      </Select>
      <ChartView chartData={chartData} valueField={axisSelect} argumentField={'name'} />
    </GitReposChartWrapper>
  )
}

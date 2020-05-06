import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState, useCallback } from 'react'
import { fetchMembers } from '../gitReposTable/state/gitReposTable.action'
import { Chart } from '../../components/chart/Chart'
import { Loader } from '../../components/loader/Loader'
import { GitReposChartWrapper } from './gitReposChart.styled'
import { Select } from '../../components/select/Select'
import { gitReposDataSelector } from '../gitReposTable/state/gitReposTable.selectors'
import { CHART_VISUALIZATION_TYPE } from './gitReposChart.constants'
import {sortChartDataByType} from "./gitReposChart.helpers";

export const GitReposChart = () => {
  const dispatch = useDispatch()
  const [isLoading, setLoading] = useState(false)
  const [topAmount, setTopAmount] = useState(0)
  const [chartData, setChartData] = useState([])
  const [axisSelect, setAxisSelect] = useState('forks')
  const [sortCondition, setSortCondition] = useState('asc')

  const data = useSelector(gitReposDataSelector)

  const optionChangeHandler = useCallback(() => {
    setChartData(sortChartDataByType(sortCondition, axisSelect, data, topAmount))
  }, [topAmount, axisSelect, data, sortCondition])

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
    optionChangeHandler()
  }, [data.length, topAmount, axisSelect, sortCondition, optionChangeHandler])

  const axisOptions = React.useMemo(
    () =>
      CHART_VISUALIZATION_TYPE.map(i => ({
        title: i.toUpperCase(),
        value: i
      })),
    []
  )

  const amountOptions = [
    { title: `Top ${topAmount} ascending`, value: 'asc' },
    { title: `Top ${topAmount} descending`, value: 'desc' }
  ]

  if (isLoading) {
    return <Loader />
  }

  return (
    <GitReposChartWrapper>
      <Select setHandler={setAxisSelect} optionsArray={axisOptions} />
      <Select setHandler={setSortCondition} optionsArray={amountOptions}>
        <option value="asc">Top {topAmount} ascending</option>
        <option value="desc">Top {topAmount} descending</option>
      </Select>
      <Chart chartData={chartData} valueField={axisSelect} argumentField={'name'} />
    </GitReposChartWrapper>
  )
}

import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState, useCallback } from 'react'
import { fetchMembers } from '../gitRepos/state/gitRepos.action'
import { Chart } from '../../components/chart/Chart'
import { Loader } from '../../components/loader/Loader'
import { GitReposChartWrapper } from './gitReposChart.styled'
import { Select } from '../../components/select/Select'
import { gitReposDataSelector } from '../gitRepos/state/gitRepos.selectors'
import { CHART_ARGUMENT_FIELD, CHART_VISUALIZATION_TYPES } from './gitReposChart.constants'
import { sortChartData } from './gitReposChart.helpers'

export const GitReposChart = () => {
  const [topAmount, setTopAmount] = useState(0)
  const [chartData, setChartData] = useState([])
  const [axisSelect, setAxisSelect] = useState('forks')
  const [sortCondition, setSortCondition] = useState('asc')

  const data = useSelector(gitReposDataSelector)

  useEffect(() => {
    data.length >= 10 ? setTopAmount(10) : setTopAmount(data.length)
    setChartData(sortChartData(sortCondition, axisSelect, data).slice(0, topAmount))
  }, [data, topAmount, axisSelect, sortCondition])

  const amountOptions = [
    { title: `Top ${topAmount} ascending`, value: 'asc' },
    { title: `Top ${topAmount} descending`, value: 'desc' }
  ]

  return (
    <GitReposChartWrapper>
      <Select setHandler={setAxisSelect} optionsArray={CHART_VISUALIZATION_TYPES} />
      <Select setHandler={setSortCondition} optionsArray={amountOptions} />
      <Chart chartData={chartData} valueField={axisSelect} argumentField={CHART_ARGUMENT_FIELD} />
    </GitReposChartWrapper>
  )
}

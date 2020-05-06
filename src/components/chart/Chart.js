import * as React from 'react'
import Paper from '@material-ui/core/Paper'
import {
  Chart as ChartMaterialUi,
  BarSeries,
  Title,
  ArgumentAxis,
  ValueAxis,
  Tooltip
} from '@devexpress/dx-react-chart-material-ui'

import { Animation, EventTracker } from '@devexpress/dx-react-chart'
import { ChartDemoStyle } from './chart.styled'

export const Chart = ({ chartData, valueField, argumentField }) => {
  return (
    <ChartDemoStyle>
      <Paper style={{ background: 'inherit' }}>
        <ChartMaterialUi data={chartData}>
          <ArgumentAxis />
          <ValueAxis />
          <BarSeries
            style={{ fill: 'inherit' }}
            valueField={valueField}
            argumentField={argumentField}
          />
          <Title text="Chart" />
          <Animation />
          <EventTracker />
          <Tooltip />
        </ChartMaterialUi>
      </Paper>
    </ChartDemoStyle>
  )
}

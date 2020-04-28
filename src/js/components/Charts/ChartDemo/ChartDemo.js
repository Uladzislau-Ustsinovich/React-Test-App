import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import {
    Chart,
    BarSeries,
    Title,
    ArgumentAxis,
    ValueAxis,
    Tooltip,
} from '@devexpress/dx-react-chart-material-ui';

import {Animation, EventTracker} from '@devexpress/dx-react-chart';


export const ChartDemo = ({chartData, valueField, argumentField}) =>{

    return (
        <div>
            <Paper>
                <Chart data={chartData}>
                    <ArgumentAxis/>
                    <ValueAxis/>
                    <BarSeries
                        valueField={valueField}
                        argumentField={argumentField}
                    />
                    <Title text="Chart"/>
                    <Animation/>
                    <EventTracker/>
                    <Tooltip/>
                </Chart>
            </Paper>
        </div>
    )
}
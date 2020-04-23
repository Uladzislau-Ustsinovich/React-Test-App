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

import {EventTracker} from '@devexpress/dx-react-chart';
import {connect} from "react-redux";

class Charts extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: this.props.data.map(i=> {
                return {
                    name: i.name,
                    forks: i.forks
                }
            }).filter(i=> i.forks>1000),
        };
    }

    render() {
        console.log(this.state)
        const {data: chartData} = this.state;

        return (
            <Paper>
                <Chart data={chartData}>
                    <ArgumentAxis/>
                    <ValueAxis/>

                    <BarSeries
                        valueField="forks"
                        argumentField="name"
                    />
                    <Title
                        text=".!."
                    />
                    <EventTracker/>
                    <Tooltip/>
                </Chart>
            </Paper>
        );
    }
}

function mapStateToProps(state) {
    return {
        data: state.data.data
    }
}

export default connect(mapStateToProps)(Charts)
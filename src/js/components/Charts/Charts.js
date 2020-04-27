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
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {fetchMembers} from "../../redux/action";
import {useState} from "react";
import {useRef} from "react";

const selectCategories = ['forks', 'watchers', 'issues'];

export const Charts = () => {
    const dispatch = useDispatch();
    const [isLoading, setLoading] = useState(false);
    const [topAmount, setTopAmount] = useState(0);
    const [chartData, setChartData] = useState([]);

    const axisSelect = useRef("forks");
    const sorting = useRef("asc");

    const data = useSelector(state => state.gitRepos.data);

    useEffect(() => {
        if (!data.length) {
            setLoading(true);
            dispatch(fetchMembers());
            setLoading(false);
        }
        if (data.length >= 10)
            setTopAmount(10);
        else
            setTopAmount(data.length);
        }, [data.length]);


    const optionChangeHandler = () => {
        let xValue = axisSelect.current.value;
        let sortOption = sorting.current.value;
        console.log(sortOption)
        let sortAndFilter;
        sortOption === 'asc' ? sortAndFilter = data.sort((a, b) => b[xValue] - a[xValue]).slice(0, topAmount) :
            sortAndFilter = data.sort((a, b) => a[xValue] - b[xValue]).slice(0, topAmount);
        setChartData(sortAndFilter.map(i => {
            return {
                name: i.name,
                [xValue]: i[xValue]
            }
        }));
    };

    let options = selectCategories.map((i, ind) => <option value={i} key={ind}>{i.toUpperCase()}</option>);

    if (isLoading) {
        return <h2>Loading</h2>
    }

    return (
        <>
            <select ref={axisSelect} onChange={optionChangeHandler}>
                {chartData.length ? '' :
                    <option>Make your choice</option>
                }
                {options}
            </select>
            <select ref={sorting} onChange={optionChangeHandler}>
                <option value="asc">Top {topAmount} ascending</option>
                <option value="desc">Top {topAmount} descending</option>
            </select>
            <Paper>
                <Chart data={chartData}>
                    <ArgumentAxis/>
                    <ValueAxis/>
                    <BarSeries
                        valueField={axisSelect.current.value}
                        argumentField="name"
                    />
                    <Title text="Chart"/>
                    <Animation/>
                    <EventTracker/>
                    <Tooltip/>
                </Chart>
            </Paper>
        </>
    );
};

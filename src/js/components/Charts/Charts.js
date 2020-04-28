import * as React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {fetchMembers} from "../../redux/action";
import {useState} from "react";
import {useRef} from "react";
import {ChartDemo} from "./ChartDemo/ChartDemo";

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
        <div>
            <select ref={axisSelect} onChange={optionChangeHandler}>
                {chartData.length ? '' :
                    <option>Make your choice</option>
                }
                {options}
            </select>
            {chartData.length ?
                <select ref={sorting} onChange={optionChangeHandler}>
                    <option value="asc">Top {topAmount} ascending</option>
                    <option value="desc">Top {topAmount} descending</option>
                </select>
                : ''
            }
            <ChartDemo
                chartData={chartData}
                valueField={axisSelect.current.value}
                argumentField={"name"}
            />
        </div>
    );
};

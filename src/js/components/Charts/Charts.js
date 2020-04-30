import * as React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {fetchMembers} from "../../redux/action";
import {useState} from "react";
import {useRef} from "react";
import {ChartDemo} from "./ChartDemo/ChartDemo";
import {Loader} from "../Loader/Loader";

const selectCategories = ['forks', 'watchers', 'issues']; // Y AXIS

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
        let amount;
        if (data.length >= 10) {
            setTopAmount(10);
            amount = 10;
        } else {
            setTopAmount(data.length);
            amount = data.length;
        }
        optionChangeHandler(amount);
    }, [data.length, optionChangeHandler]);


    const optionChangeHandler = (amount) => {
        let xValue = axisSelect.current.value;
        let sortOption = sorting.current.value;
        let sortAndFilter;
        sortOption === "asc" ? sortAndFilter = data.sort((a, b) => b[xValue] - a[xValue]).slice(0, amount) :
            sortAndFilter = data.sort((a, b) => a[xValue] - b[xValue]).slice(0, amount);
        setChartData(sortAndFilter.map(i => {
            return {
                name: i.name,
                [xValue]: i[xValue]
            }
        }));
    };

    let options = selectCategories.map((i, ind) => <option value={i} key={ind}>{i.toUpperCase()}</option>);

    if (isLoading) {
        return <Loader/>
    }

    return (
        <div>
            <select ref={axisSelect} onChange={()=>optionChangeHandler(topAmount)}>
                {options}
            </select>
            <select ref={sorting} onChange={()=>optionChangeHandler(topAmount)}>
                <option value="asc">Top {topAmount} ascending</option>
                <option value="desc">Top {topAmount} descending</option>
            </select>
            <ChartDemo
                chartData={chartData}
                valueField={axisSelect.current.value}
                argumentField={"name"}
            />
        </div>
    );
};

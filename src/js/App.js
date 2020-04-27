import React from 'react'
import {Table} from "./components/Table/Table";
import {Switch, Route} from 'react-router-dom';
import {Header} from "./components/Header/Header";
import {Charts} from "./components/Charts/Charts";

function App() {
    return (
        <>
            <Header/>
            <Switch>
                <Route exact path="/" render={() => <Table/>}/>
                <Route path='/Chart' render={() => <Charts/>}/>
            </Switch>
        </>
    )
}

export default App

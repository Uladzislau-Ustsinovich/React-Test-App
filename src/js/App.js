import React, {useEffect} from 'react'
import {Table} from "./components/Table/Table";
import {Switch, Route} from 'react-router-dom';
import {Header} from "./components/Header/Header";
import {Charts} from "./components/Charts/Charts";
import {ThemeProvider} from "styled-components";
import {lightTheme, darkTheme} from "./theme/theme";
import {GlobalStyles} from "./theme/global";
import {useDispatch, useSelector} from "react-redux";
import {setTheme} from "./theme/action";
import {
    CSSTransition,
    TransitionGroup
} from 'react-transition-group'
import "./App.less"

function App() {
    const dispatch = useDispatch();
    const theme = useSelector(state => state.theme.themeCondition);

    useEffect(() => {
        const localTheme = window.localStorage.getItem('theme');
        localTheme && dispatch(setTheme(localTheme));
    }, []);

    return (
        <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
            <div>
                <GlobalStyles/>
                <Header/>
                <div className="App">

                    <Route render={({location}) => (
                        <TransitionGroup>
                            <CSSTransition
                                key={location.key}
                                classNames="fade"
                                timeout={1000}>
                                <Switch location = {location}>
                                    <Route exact path="/" component={Table}/>
                                    <Route path="/Chart" component={Charts}/>
                                </Switch>
                            </CSSTransition>
                        </TransitionGroup>
                    )}/>

                </div>
            </div>
        </ThemeProvider>
    )
}

export default App

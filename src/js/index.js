import React from "react";
import ReactDOM from "react-dom";
import App from "./App.js";
import {store} from "./redux/rootReducer";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <App/>
        </Provider>
    </BrowserRouter>,
    document.getElementById("root"));
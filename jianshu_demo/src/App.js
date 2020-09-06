import React from 'react';
import Header from './common/header'
import {Provider} from 'react-redux'
import store from './store'
import {BrowserRouter, Route} from "react-router-dom";
import Home from "./pages/home";
import Detail from "./pages/detail/loadable";
import Login from "./pages/login";
import Writer from "./pages/writer";

function App () {
    return (

        <Provider store={store}>
            <BrowserRouter>
                <div>
                    <Header/>
                    <Route path="/" exact component={Home}/>
                    <Route path="/login" exact component={Login}/>
                    <Route path="/writer" exact component={Writer}/>
                    <Route path="/detail/:id" exact component={Detail}/>
                </div>
            </BrowserRouter>
        </Provider>
    );
}

export default App;

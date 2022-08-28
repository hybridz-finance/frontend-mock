import React from 'react';
import { Router, Switch, Route } from "react-router-dom";

import './App.css';
import { GlobalStateProvider } from "./components/context/GlobalStateProvider";
import Home from "./components/Home";
import Collections from "./components/Collections";
import Art from "./components/Art";
import history from './history';
//import Sell from "./components/sell/Sell";
//import Buy from "./components/buy/Buy";


function App() {
  return (
    <GlobalStateProvider>
        <Router history={history}>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/collections" exact component={Collections} />
                <Route path="/collections/art" exact component={Art} />


            </Switch>
        </Router>    
    </GlobalStateProvider>
  );
}

export default App;

import React, { useState, useCallback } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import './App.css';
import MainNavigation from "./Shared/Components/Navigation/MainNavigation";
import Accueil from "./Page/Accueil/Accueil"
import Auth from "./users/Pages/Auth"
import NewStage from "./Page/Stages/Pages/NewStage";
import Stages from "./Page/Stages/Pages/ListeStage";
import TestNav from "./Page/test/testNav";
import Footer from './Shared/Components/Footer/Footer';

const App = () =>{
  let routes;

routes = (
  <Switch>
    <Route path="/" exact>
      <Accueil/>
    </Route>
    <Route path="/Stage/liste" exact>
      <Stages />
    </Route>
    <Route path="/Auth" exact>
      <Auth />
    </Route>
    <Route path="/Stage/new" exact>
      <NewStage />
    </Route>
    <Redirect to="/"/>
  </Switch>
);

  return (
    <div className="App">
      <div>
      <Router>
        <MainNavigation/>
        <main>{routes}</main>
      </Router>
      </div>
    </div>
  );
}

export default App;

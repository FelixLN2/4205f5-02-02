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
import TestNav from "./Page/test/testNav";
import Footer from './Shared/Components/Footer/Footer';

const App = () =>{
  let routes;

routes = (
  <Switch>
    <Route path="/" exact>
      <Accueil/>
    </Route>
    <Route path="/testNav" exact>
      <TestNav />
    </Route>
    <Route path="/Auth" exact>
      <Auth />
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
      <Footer/>
    </div>
  );
}

export default App;

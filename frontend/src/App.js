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
import  { AuthContext } from "./Shared/context/auth-context";
const App = () =>{
  const [isLoggedIn = false, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState("");
  const [typeCompte, setTypeCompte] = useState("");

  const login = useCallback((userId, typeCompte) => {
    setIsLoggedIn(true);
    setUserId(userId);
    setTypeCompte(typeCompte);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUserId(null);
    setTypeCompte(null);
  }, []);

  let routes;
  
  routes = (
    <Switch>
      <Route path="/" exact>
        <Accueil />
      </Route>
      <Route path="/Auth" exact>
        <Auth />
      </Route>
      <Route path="/Stage/liste" exact>
        <Stages />
      </Route>
      <Route path="/Stage/new" exact>
        <NewStage />
      </Route>
      <Redirect to="/" />
    </Switch>
  );

  return (
    <div className="App">
      <div>
      <AuthContext.Provider
          value={{
            isLoggedIn: isLoggedIn,
            userId: userId,
            typeCompte: typeCompte,
            login: login,
            logout: logout,
          }}
        >
      <Router>
        <MainNavigation/>
        <main>{routes}</main>
      </Router>
      </AuthContext.Provider>
      </div>
      <Footer />
    </div>
  );
}

export default App;

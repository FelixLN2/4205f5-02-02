import React, { useState, useCallback } from "react";
import logo from './logo.svg';

import './App.css';
import Accueil from "./Page/Accueil/Accueil"
import Footer from './Shared/Components/Footer/Footer';

const App = () =>{
  return (
    <div className="App">
      <Accueil/>
      <Footer/>
    </div>
  );
}

export default App;

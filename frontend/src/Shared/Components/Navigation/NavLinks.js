import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom'

import './NavLinks.css'

import { AuthContext } from '../../../Shared/context/auth-context';

function NavLinks(props){

    const auth = useContext(AuthContext);
    
    //Si connecté
    if (auth.isLoggedIn){
        //Si employeur
        if (auth.typeCompte === "Employeur"){
            return <ul className="nav-links">
                <li>
                    <NavLink to="/Stage/liste">Stages</NavLink>
                </li>
                <li>
                    <NavLink to="/Stage/new">Ajouter stage</NavLink>
                </li>
            </ul>
        } 
        //Si Etudiant
        else{
            return <ul className="nav-links">
                <li>
                    <NavLink to="/Stage/liste">Stages</NavLink>
                </li>
            </ul>
        }
    }
    //Si pas connecté
    else{
        return <ul className="nav-links">
                <li>
                    <NavLink to="/Auth">Connexion/Inscription</NavLink>
                </li>
            </ul>
    }
};

export default NavLinks;
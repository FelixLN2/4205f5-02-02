import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom'
import './NavLinks.css'

import { AuthContext } from '../../../Shared/context/auth-context';

function NavLinks(props){

    const auth = useContext(AuthContext);
    
    //Si  l'utilisateur est connecté la fonction va le trier le type d'utilisateur pour lui afficher seulement les choses qui est supposé à acceder.
    //sinon il a juste accès à connexion
    if (auth.isLoggedIn){
        //const { isLoggedIn, logout } = AuthContext();

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
                <li>
                    <NavLink to="/Stage/ListePostuler">Stages postuler</NavLink>
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
import React, { useContext } from 'react';
import { NavLink, useHistory } from 'react-router-dom'
import './NavLinks.css'

import { AuthContext } from '../../../Shared/context/auth-context';

function NavLinks(props){

    const auth = useContext(AuthContext);
    const history = useHistory();

    const handleLogout = () => {
        auth.logout();
        history.push('/4205f5-02-02/Auth'); // Redirige vers la page de connexion après la déconnexion
    };
    
    //Si  l'utilisateur est connecté la fonction va le trier le type d'utilisateur pour lui afficher seulement les choses qui est supposé à acceder.
    //sinon il a juste accès à connexion
    if (auth.isLoggedIn){
        //const { isLoggedIn, logout } = AuthContext();

        //Si employeur
        if (auth.typeCompte === "Employeur"){
            return <ul className="nav-links">
                <li>
                    <NavLink to="/4205f5-02-02/Stage/liste">Stages</NavLink>
                </li>
                <li>
                    <NavLink to="/4205f5-02-02/Stage/new">Ajouter stage</NavLink>
                </li>
                <li>
                    <button onClick={handleLogout}>Déconnexion</button>
                </li>
            </ul>
        } 
        //Si Etudiant
        else{
            return <ul className="nav-links">
                <li>
                    <NavLink to="/4205f5-02-02/Stage/liste">Stages</NavLink>
                </li>
                <li>
                    <NavLink to="/4205f5-02-02/Stage/ListePostuler">Stages postulés</NavLink>
                </li>
                <li>
                    <button onClick={handleLogout}>Déconnexion</button>
                </li>
            </ul>
        }
    }
    //Si pas connecté
    else{
        return <ul className="nav-links">
                <li>
                    <NavLink to="/4205f5-02-02/Auth">Connexion/Inscription</NavLink>
                </li>
            </ul>
    }
};

export default NavLinks;
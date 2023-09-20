import React from "react";
import { NavLink } from 'react-router-dom'

import './NavLinks.css'

function NavLinks(props){
    return <ul className="nav-links">
    <li>
        <NavLink to="/Stage/liste">Stage</NavLink>
    </li>
    <li>
        <NavLink to="/Stage/new">Ajouter stage</NavLink>
    </li>
    <li>
        <NavLink to="/Auth">Connexion/Inscription</NavLink>
    </li>
    </ul>
};

export default NavLinks;
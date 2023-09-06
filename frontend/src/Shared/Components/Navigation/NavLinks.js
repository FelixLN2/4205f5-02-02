import React from "react";
import { NavLink } from 'react-router-dom'

import './NavLinks.css'

function NavLinks(props){
    return <ul className="nav-links">
    <li>
        <NavLink to="/Stages">Stages</NavLink>
    </li>
    <li>
        <NavLink to="/Inscription">Inscription</NavLink>
    </li>
    <li>
        <NavLink to="/Connexion">Connexion</NavLink>
    </li>
    </ul>
};

export default NavLinks;
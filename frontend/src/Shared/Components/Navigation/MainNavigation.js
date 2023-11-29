import React, { useState } from "react";
import { Link } from "react-router-dom";
import MainHeader from "./MainHeader";
import NavLinks from "./NavLinks";

function MainNavigation(props){
return (
    <React.Fragment>
        <MainHeader>
            <h1>
                <Link to="/4205f5-02-02/">College Montmorency</Link>
            </h1>
            <nav>
                <NavLinks/>
            </nav>
        </MainHeader>
    </React.Fragment>
);
}

export default MainNavigation;

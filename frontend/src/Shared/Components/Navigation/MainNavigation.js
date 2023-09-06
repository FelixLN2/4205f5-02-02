import React, { useState } from "react";
import { Link } from "react-router-dom";
import MainHeader from "./MainHeader";
import NavLinks from "./NavLinks";

function MainNavigation(props){
return (
    <React.Fragment>
        <MainHeader>
            <h1>
                <Link to="/">College Momo</Link>
            </h1>
            <nav>

            </nav>
        </MainHeader>
    </React.Fragment>
);
}

export default MainNavigation;

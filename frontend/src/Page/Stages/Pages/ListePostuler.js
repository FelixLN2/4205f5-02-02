import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHttpClient } from "../../../Shared/hooks/http-hook";
import { AuthContext } from "../../../Shared/context/auth-context";
import Card from "../../../Shared/Components/UIElements/Card";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const ListePostuler = () => {
  return (
    <React.Fragment>
        <div>
            <h1>Liste de stage postuler</h1>
        </div>
    </React.Fragment>
  );
};

export default ListePostuler;

import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Card from "../../../Shared/Components/UIElements/Card";
import { useHttpClient } from "../../../Shared/hooks/http-hook";
import { AuthContext } from '../../../Shared/context/auth-context';

const StageItem = (props) => {
  const { error, sendRequest, clearError } = useHttpClient();
  const auth = useContext(AuthContext);

  const itemURL = '/Stages/$'

  //Si Employeur
  if (auth.typeCompte === "Employeur"){
    return (
        <Link to={`/4205f5-02-02/Stage/DescStage/${props.id}`}>
        <li className="stage-item">
          <Card className="stage-item__content">
            <div className="stage-item__info">
              <h1>{props.titre}</h1>
              <h4>Description: {props.description}</h4>
            </div>
          </Card>
        </li>
        </Link>
    );
  }
  //Si Etudiant
  else{
    return (
      <Link to={`/4205f5-02-02/Stage/DescStage/${props.id}`}>
        <li className="stage-item">
          <Card className="stage-item__content">
            <div className="stage-item__info">
              <h1>{props.titre}</h1>
              <h4>Description: {props.description}</h4>
              <h4>Courriel: {props.courriel}</h4>
             
            </div>
          </Card>
        </li>
        </Link>
    );
  }
  
};

export default StageItem;
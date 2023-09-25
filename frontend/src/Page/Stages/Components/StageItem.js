import React, { useState } from "react";
import Card from "../../../Shared/Components/UIElements/Card";
import { useHttpClient } from "../../../Shared/hooks/http-hook";

const StageItem = (props) => {
  const { error, sendRequest, clearError } = useHttpClient();

  return (
    <React.Fragment>
      <li className="stage-item">
        <Card className="stage-item__content">
          <div className="stage-item__info">
            <h1>{props.titre}</h1>
            <h4>Description: {props.description}</h4>
            <h3>Employeur</h3>
            <h4>Nom: {props.nom}</h4>
            <h4>Prenom: {props.prenom}</h4>
            <h4>Courriel: {props.courriel}</h4>
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
};

export default StageItem;
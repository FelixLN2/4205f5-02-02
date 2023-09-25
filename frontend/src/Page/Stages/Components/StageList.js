import React, { useState, useEffect, useContext } from "react";
import { useHttpClient } from '../../../Shared/hooks/http-hook';
import Card from "../../../Shared/Components/UIElements/Card";
import StageItem from "./StageItem";
import { AuthContext } from '../../../Shared/context/auth-context';

const StageList = (props) => {
  const { error, sendRequest, clearError } = useHttpClient();
  const auth = useContext(AuthContext);

  if (props.items.length === 0) {
    return (
      <div className="center">
        <Card>
          <h2>Aucun stage trouvé</h2>
        </Card>
      </div>
    );
  }

  //Si employeur
  if (auth.typeCompte === "Employeur"){
    return (
      <ul className="user-list">
        {props.items.map((stage) => 
        (
          <StageItem
            key={stage.id}
            id={stage.id}
            titre={stage.titre}
            description={stage.description}
          />
        ))}
      </ul>
    );
  }
  //Si Etudiant
  else{
    return (
      <ul className="user-list">
        {props.items.map((stage) => 
        (
          <StageItem
            key={stage.id}
            id={stage.id}
            titre={stage.titre}
            description={stage.description}
            // Ajoutez les données de l'employeur correspondant ici
            nom={stage.employeur.nom}
            prenom={stage.employeur.prenom}
            courriel={stage.employeur.courriel}
          />
        ))}
      </ul>
    );
  }
  
};


export default StageList
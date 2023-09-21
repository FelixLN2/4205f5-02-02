import React, { useState, useEffect } from "react";
import { useHttpClient } from '../../../Shared/hooks/http-hook';
import Card from "../../../Shared/Components/UIElements/Card";
import StageItem from "./StageItem";

const StageList = (props) => {
  const { error, sendRequest, clearError } = useHttpClient();
  const [employeur, setEmployeur] = useState([]);

  useEffect(() => {
    const fetchEmployeur = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/employeurs/stages/${props.id}`
        );
        setEmployeur(responseData.employeur);
      } catch (err) {
        // Gérer les erreurs de requête si nécessaire
      }
    };

    fetchEmployeur();
  }, [sendRequest, props.id]);

  if (props.items.length === 0) {
    return (
      <div className="center">
        <Card>
          <h2>Aucun stage trouvé</h2>
        </Card>
      </div>
    );
  }

  return (
    <ul className="user-list">
      {props.items.map((stage) => (
        <StageItem
          key={stage.id}
          id={stage.id}
          titre={stage.titre}
          description={stage.description}
          // Ajoutez les données de l'employeur correspondant ici
          nom={employeur.nom}
          prenom={employeur.prenom}
          courriel={employeur.courriel}
        />
      ))}
    </ul>
  );
};


export default StageList
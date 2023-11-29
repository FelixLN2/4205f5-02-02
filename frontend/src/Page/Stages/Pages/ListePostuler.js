import React, { useContext, useEffect, useState } from "react";
import { useHttpClient } from "../../../Shared/hooks/http-hook";
import StageList from "../Components/StageList";
import { AuthContext } from "../../../Shared/context/auth-context";

const ListePostuler = () => {
  const { error, sendRequest, clearError } = useHttpClient();
  const [stages, setStages] = useState([]);
  const auth = useContext(AuthContext);

  useEffect(() => {
    const recupererStages = async () => {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + "/etudiants/stagesPostules/" + auth.userId
        );
        // Récupérez les stages
        const stagesData = responseData.stages;
        // Initialisez un tableau pour stocker les stages avec employeur
        const stagesAvecEmployeur = [];

        for (const stage of stagesData) {
          // Récupérez l'employeur correspondant à chaque stage
          const employeurResponse = await sendRequest(
            process.env.REACT_APP_BACKEND_URL +
              "/employeurs/" +
              stage.employeur_id
          );
          // Ajoutez l'objet employeur au stage
          stage.employeur = employeurResponse.employeur;
          // Ajoutez le stage mis à jour à la liste
          stagesAvecEmployeur.push(stage);
        }

        // Mettez à jour l'état avec les stages incluant les employeurs
        setStages(stagesAvecEmployeur);
      } catch (err) {
        console.log(err);
        alert("Erreur lors de la connexion" + err);
      }
    };
    recupererStages();
  }, [sendRequest]);

  return (
    <React.Fragment>
       <div>
            <h1>Liste des stages auxquels vous avez postulé</h1>
        </div>
      {stages && <StageList items={stages} />}
       
    </React.Fragment>
  );
};

export default ListePostuler;

import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHttpClient } from "../../../Shared/hooks/http-hook";
import { AuthContext } from "../../../Shared/context/auth-context";
import Card from "../../../Shared/Components/UIElements/Card";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

//asdf
const DescStage = () => {
  const { id } = useParams();
  const { error, sendRequest, clearError } = useHttpClient();
  const [stageData, setStageData] = useState([]);
  const [employeur, setEmployeur] = useState([]);
  const [listeEtudiants, setListeEtudiants] = useState([{}]);
  const auth = useContext(AuthContext);

  useEffect(() => {
    const fetchStageData = async () => {
      //Si Employeur
      if (auth.typeCompte === "Employeur") {
        try {
          const url = `${process.env.REACT_APP_BACKEND_URL}/etudiants/stages/${id}`;
          const responseData = await sendRequest(url);
          const stage = responseData.stage;

          // Récupérez les etudiants ayant postulé 
          const employeurResponse = await sendRequest(process.env.REACT_APP_BACKEND_URL + "/employeurs/" + stage.employeur_id);

          setStageData(responseData.stage);
        } catch (err) {
          console.error(err);
        }
      }
      //Si Etudiant
      else {
        try {
          const url = `${process.env.REACT_APP_BACKEND_URL}/etudiants/stages/${id}`;
          const responseData = await sendRequest(url);
          const stage = responseData.stage;
          
          // Récupérez l'employeur correspondant au stage
          const employeurResponse = await sendRequest(process.env.REACT_APP_BACKEND_URL + "/employeurs/" + stage.employeur_id);
          
          
          setEmployeur(employeurResponse.employeur);         
          setStageData(stage);

        } catch (err) {
          console.error(err);
        }
      }
    };

    fetchStageData();
  }, [sendRequest, id]);

  //Si Employeur
  if (auth.typeCompte === "Employeur") {
    return (
      <React.Fragment>
        <div>
          <h1>Détails du stage</h1>
          <p>Titre: {stageData.titre}</p>
          <p>Nom de l'entreprise:: {stageData.nom_entreprise}</p>
          <p>Description: {stageData.description}</p>
          <p>Debut: {stageData.debut}</p>
          <p>Fin: {stageData.fin}</p>
          <p>Payant: {stageData.payant}</p>
          <p>Modalite: {stageData.modalite}</p>
          <p>Status: {stageData.status}</p>

          {/* <p>Courriel: {stageData.courriel}</p>
        <p>Employeur</p>
        <p>Nom: {stageData.nom}</p>
        <p>Prenom: {stageData.prenom}</p> */}
        </div>
        <Link to={`/Stage/modifierStages/${id}`}>
          <button>Modifier</button>
        </Link>
      </React.Fragment>
    );
  }
  //Si Etudiant
  else if (auth.typeCompte === "Etudiant"){
    return (
      <div>
          <h1>Détails du stage</h1>
          <p>Titre: {stageData.titre}</p>
          <p>Nom de l'entreprise: {stageData.nom_entreprise}</p>
          <p>Description: {stageData.description}</p>
          <p>Debut: {stageData.debut}</p>
          <p>Fin: {stageData.fin}</p>
          <p>Payant: {stageData.payant}</p>
          <p>Modalite: {stageData.modalite}</p>
          <p>Status: {stageData.status}</p>
          <br/>
          <h2>Employeur</h2>
          <p>Nom complet: {employeur.prenom} {employeur.nom}</p>
          <p>Courriel: {employeur.courriel}</p>
          <p>Téléphone: {employeur.telephone}</p>


        {/* <p>Courriel: {stageData.courriel}</p>
        <p>Employeur</p>
        <p>Nom: {stageData.nom}</p>
        <p>Prenom: {stageData.prenom}</p> */}
      </div>
    );
  }
};

export default DescStage;

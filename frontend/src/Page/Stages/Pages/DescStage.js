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
  const [stageData, setStageData] = useState({});
  const [listeEtudiants, setListeEtudiants] = useState([{}]);
  const auth = useContext(AuthContext);

  useEffect(() => {
    const fetchStageData = async () => {
      //Si Employeur
      if (auth.typeCompte === "Employeur") {
        try {
          const url = `${process.env.REACT_APP_BACKEND_URL}/etudiants/stages/${id}`;
          const responseData = await sendRequest(url);
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
          setStageData(responseData.stage);
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
          <h1>Stage Details</h1>
          <p>Title: {stageData.identifiant}</p>

          {/* <p>Courriel: {stageData.courriel}</p>
        <p>Employeur</p>
        <p>Nom: {stageData.nom}</p>
        <p>Prenom: {stageData.prenom}</p> */}
        </div>
        <Link to="/Stage/Modifier">
          <button>Modifier</button>
        </Link>
      </React.Fragment>
    );
  }
  //Si Etudiant
  else {
    return (
      <div>
        <h1>Stage Details</h1>
        <p>Title: {stageData.titre}</p>
        <p>Description: {stageData.description}</p>
        {/* <p>Courriel: {stageData.courriel}</p>
        <p>Employeur</p>
        <p>Nom: {stageData.nom}</p>
        <p>Prenom: {stageData.prenom}</p> */}
      </div>
    );
  }
};

export default DescStage;

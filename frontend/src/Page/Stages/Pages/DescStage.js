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
  const [etudiant, setEtudiant] = useState([]);
  const [listeEtudiants, setListeEtudiants] = useState([{}]);
  const auth = useContext(AuthContext);

  useEffect(() => {
    const fetchStageData = async () => {
      //Si Employeur
      if (auth.typeCompte === "Employeur") {
        try {
          const url = `${process.env.REACT_APP_BACKEND_URL}/etudiants/stages/${id}`;
          const responseData = await sendRequest(url);

          const etudiants = await sendRequest(process.env.REACT_APP_BACKEND_URL + "/employeurs/etudiantsinscrits/" + id);

          setListeEtudiants(etudiants.etudiantsInscrits);
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
    console.log(stageData);
    return (
      <React.Fragment>
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
          
          <h3>Étudiants ayant postulé</h3>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <table style={{ borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th style={{ border: "1px solid #000" }}>Nom complet</th>
                  <th style={{ border: "1px solid #000" }}>Téléphone</th>
                  <th style={{ border: "1px solid #000" }}>Adresse courriel</th>
                </tr>
              </thead>
              <tbody>
                {listeEtudiants.map((etudiant, index) => (
                  <tr key={index}>
                    <td style={{ border: "1px solid #000" }}>{etudiant.prenom} {etudiant.nom}</td>
                    <td style={{ border: "1px solid #000" }}>{etudiant.telephone}</td>
                    <td style={{ border: "1px solid #000" }}>{etudiant.courriel}</td>
                    {/* Ajoutez d'autres données de colonne ici */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>


          {/* <p>Courriel: {stageData.courriel}</p>
        <p>Employeur</p>
        <p>Nom: {stageData.nom}</p>
        <p>Prenom: {stageData.prenom}</p> */}
        </div>
        <br/><br/>
        <Link to={`/4205f5-02-02/Stage/modifierStages/${id}`}>
          <button>Modifier</button>
        </Link>
        <Link to={`/4205f5-02-02/Stage/deleteStages/${id}`}>
        <button>Supprimer</button>
        </Link>
      </React.Fragment>
    );
  }
  //Si Etudiant
  else {
    return (
      <React.Fragment>
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
          {/* <p>Status: {stageData.status}</p>
          <p>Employeur_id: {stageData.employeur_id}</p> */}
          <br/>
          <h2>Employeur</h2>
          <p>Nom complet: {employeur.prenom} {employeur.nom}</p>
          <p>Courriel: {employeur.courriel}</p>
          <p>Téléphone: {employeur.telephone}</p>
          

        

            
          <Link to={`/4205f5-02-02/Stage/Postuler/${id}`}>
          <button >Postuler</button>
          </Link>

          <Link to={`/4205f5-02-02/Stage/Retirer/${id}`}>
          <button >Retirer ma candidature</button>
          </Link>

        {/* <p>Courriel: {stageData.courriel}</p>
        <p>Employeur</p>
        <p>Nom: {stageData.nom}</p>
        <p>Prenom: {stageData.prenom}</p> */}
      </div>
      </React.Fragment>
    );

   
  }
 
};

export default DescStage;

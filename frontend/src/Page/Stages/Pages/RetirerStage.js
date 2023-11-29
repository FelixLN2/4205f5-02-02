import React, { useContext, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useHttpClient } from "../../../Shared/hooks/http-hook";
import { AuthContext } from "../../../Shared/context/auth-context";

const RetirerStage = () => {
  const { id } = useParams();
  const { sendRequest } = useHttpClient();
  const auth = useContext(AuthContext);
  const history = useHistory();
  const [alertMessage, setAlertMessage] = useState("");

  const handleRemove = async () => {
    try {

      const response = await sendRequest(
        process.env.REACT_APP_BACKEND_URL + `/etudiants/${auth.userId}/Retirer/${id}`,
        'PATCH',
        null,
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );

      
      if (response) {
        alert("Étudiant a retiré sa candidature !")
        //setAlertMessage("Étudiant a retiré sa candidature !");
      }
      /*setTimeout(() => {
        history.push(`/Stage/listePostuler`);
      }, 3000);*/
    } catch (error) {
      console.error(error);
      alert("Une erreur s'est produite lors du retrait de la candidature.")
      //setAlertMessage("Une erreur s'est produite lors du retrait de la candidature.");
    }
  };

  return (
    <div>
      <p>Voulez-vous vraiment retirer votre candidature?</p>
      {alertMessage && <p>{alertMessage}</p>}
      <button onClick={handleRemove}>Retirer candidature</button>
    </div>
  );
};

export default RetirerStage;

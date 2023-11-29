import React, { useContext, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useHttpClient } from "../../../Shared/hooks/http-hook";
import { AuthContext } from "../../../Shared/context/auth-context";

const AddStage = () => {
  const { id } = useParams();
  const { sendRequest } = useHttpClient();
  const auth = useContext(AuthContext);
  const history = useHistory();
  const [alertMessage, setAlertMessage] = useState("");

  const handleAdd = async () => {
    try {
      const response = await sendRequest(
        process.env.REACT_APP_BACKEND_URL + `/etudiants/${auth.userId}/${id}`,
        'PATCH',
        null,
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      if (response) {
        setAlertMessage("Étudiant a postulé avec succès au stage!");
      }
      setTimeout(() => {
        history.push(`/Stage/liste`);
      }, 3000);
    } catch (error) {
      console.error(error);
      setAlertMessage("Une erreur s'est produite lors de la postulation.");
    }
  };

  return (
    <div>
      <p>Voulez-vous vraiment postuler au stage?</p>
      {alertMessage && <p>{alertMessage}</p>}
      <button onClick={handleAdd}>Postuler</button>
    </div>
  );
};

export default AddStage;

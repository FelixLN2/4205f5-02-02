import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useHttpClient } from "../../../Shared/hooks/http-hook";
import { AuthContext } from "../../../Shared/context/auth-context";


const AddStage = () => {
    const { id } = useParams();
    const { sendRequest } = useHttpClient();
    const auth = useContext(AuthContext);

      const history = useHistory();
      const handleAdd = async () => {
        try {
          await sendRequest(
            process.env.REACT_APP_BACKEND_URL + `/etudiants/${auth.userId}/${id}`,
            'PATCH',
            null,
            {
              Authorization: `Bearer ${auth.token}`,
            }
          );
          history.push(`/Stage/liste`);
        } catch (error) {

        }
      };
    
      return (
        <div>
          <p>Voulez vous vraiment postuler au stage?</p>
          <button onClick={handleAdd}>Postuler</button>
        </div>
      );
    };

export default AddStage;
import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useHttpClient } from "../../../Shared/hooks/http-hook";
import { AuthContext } from "../../../Shared/context/auth-context";


const DeleteStage = () => {
    const { id } = useParams();
    const { error, sendRequest, clearError } = useHttpClient();
    const [stageData, setStageData] = useState([]);
    const auth = useContext(AuthContext);
    useEffect(() => {
        const fetchStageData = async () => {
          try {
            const responseData = await sendRequest(
              process.env.REACT_APP_BACKEND_URL + `/employeurs/stages/deleteStage/${id}`);
            setStageData(responseData.stage);
          } catch (error) {
          }
        };
        fetchStageData();
      }, [id, sendRequest]);

      const history = useHistory();
      const handleDelete = async () => {
        try {
          await sendRequest(
            process.env.REACT_APP_BACKEND_URL + `/employeurs/stages/deleteStage/${id}`,
            'DELETE',
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
          <p>Voulez vous vraiment effacer le stage?</p>
          <button onClick={handleDelete}>Effacer</button>
        </div>
      );
    };

export default DeleteStage;
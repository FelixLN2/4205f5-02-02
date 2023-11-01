import React, { useContext, useEffect, useState } from "react";
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
              `employeurs/deleteStage/stages/${id}`
            );
            setStageData(responseData.stage);
          } catch (err) {
            console.error(err);

            // Handle error, e.g., redirect to an error page
          }
        };
        fetchStageData();
      }, [id, sendRequest]);

      const handleDelete = async () => {
        try {
          await sendRequest(
            `employeurs/deleteStage/stages/${id}`,
            'DELETE',
            null,
            {
              Authorization: `Bearer ${auth.token}`,
            }
          );
    
          // Redirect to a success page or the list of stages
          //history.push('/success');
        } catch (err) {
            console.error(err);

          // Handle error, e.g., display an error message
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
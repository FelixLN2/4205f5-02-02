import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Input from "../../../Shared/Components/FormElements/Input";
import Button from "../../../Shared/Components/FormElements/Button";
import { useForm } from "../../../Shared/hooks/form-hook";
import { useHttpClient } from "../../../Shared/hooks/http-hook";
import { useParams } from "react-router-dom";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../../Shared/util/validators";
import "./StageForm.css";
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
          } catch (error) {
            //console.error(err);

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
        } catch (error) {
           // console.error(err);

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
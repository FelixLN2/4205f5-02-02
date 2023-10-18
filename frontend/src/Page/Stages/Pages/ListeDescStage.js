import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHttpClient } from "../../../Shared/hooks/http-hook";
import { AuthContext } from '../../../Shared/context/auth-context';
import Card from "../../../Shared/Components/UIElements/Card";

const ListeDescStage = () => {
  const { id } = useParams();
  const { error, sendRequest, clearError } = useHttpClient();
  const [stageData, setStageData] = useState({});
  const auth = useContext(AuthContext);

  useEffect(() => {
    const fetchStageData = async () => {
      try {
        const url = `${process.env.REACT_APP_BACKEND_URL}/etudiants/stages/${id}`;
        const responseData = await sendRequest(url);
        setStageData(responseData.stage);
      } catch (err) {
        console.error(err);
      }
    };

    fetchStageData();
  }, [sendRequest, id]);

  return (
    <div>
      <h1>Stage Details</h1>
      <p>Title: {stageData.titre}</p>
      <p>Description: {stageData.description}</p>
    </div>
  );
};

export default ListeDescStage;

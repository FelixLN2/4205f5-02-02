import React, { useState, useEffect } from "react";
import { useHttpClient } from '../../../Shared/hooks/http-hook';
import StageList from "../Components/StageList";

const EmployeurStage = () => {
    const {error, sendRequest, clearError} = useHttpClient();
    const [stages, setStages] = useState([])






    
}


export default EmployeurStage;
import React, { useState, useEffect } from "react";
import { useHttpClient } from '../../../Shared/hooks/http-hook';
import StageList from "../Components/StageList";

const Stages = () => {
    const {error, sendRequest, clearError} = useHttpClient();
    const [stages, setStages] = useState([])

    useEffect(() => {
        const recupererStages = async () => {
            try {
                const responseData = await sendRequest("http://localhost:5000/api/stages");

                setStages(responseData.stages);
            }catch(err){

            }
        }
        recupererStages();
    }, [sendRequest]);

    return (
        <React.Fragment>
            {stages && <StageList items={stages}/>}
        </React.Fragment>
    )
}

export default Stages;
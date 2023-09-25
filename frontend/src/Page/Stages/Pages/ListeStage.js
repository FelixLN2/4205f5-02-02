import React, { useState, useEffect } from "react";
import { useHttpClient } from '../../../Shared/hooks/http-hook';
import StageList from "../Components/StageList";

const Stages = () => {
    const {error, sendRequest, clearError} = useHttpClient();
    const [stages, setStages] = useState([])

    useEffect(() => {
        const recupererStages = async () => {
            try {
                const responseData = await sendRequest(process.env.REACT_APP_BACKEND_URL + "/etudiants/stages");
                // Récupérez les stages
                const stagesData = responseData.stages;
                // Initialisez un tableau pour stocker les stages avec employeur
                const stagesAvecEmployeur = [];

                for (const stage of stagesData) {
                    // Récupérez l'employeur correspondant à chaque stage
                    const employeurResponse = await sendRequest(
                        process.env.REACT_APP_BACKEND_URL + "/employeurs/" + stage.employeur_id
                    );
                    // Ajoutez l'objet employeur au stage
                    stage.employeur = employeurResponse.employeur;
                    // Ajoutez le stage mis à jour à la liste
                    stagesAvecEmployeur.push(stage);
                }

                // Mettez à jour l'état avec les stages incluant les employeurs
                setStages(stagesAvecEmployeur);
            } catch (err) {
                console.log(err);
                alert("Erreur lors de la connexion" + err);
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
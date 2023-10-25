import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import Input from "../../../Shared/Components/FormElements/Input";
import Button from "../../../Shared/Components/FormElements/Button";
import { useForm } from "../../../Shared/hooks/form-hook";
import { useHttpClient } from "../../../Shared/hooks/http-hook";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../../Shared/util/validators";
import "./StageForm.css";
import { AuthContext } from "../../../Shared/context/auth-context";

const NewStage = () => {
  const auth = useContext(AuthContext);

  const { error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      titre: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      courriel: {
        value: "",
        isValid: false,
      },
      nom_entreprise: {
        value: "",
        isValid: false,
      },
      dateDebut: {
        value: "",
        isValid: false,
      },
      dateFin: {
        value: "",
        isValid: false,
      },
      stagePayant: {
        value: "",
        isValid: false,
      },
      modalite: {
        value: "",
        isValid: false,
      },
      status: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const history = useHistory();

  const placeSubmitHandler = async (event) => {
    event.preventDefault();
    console.log(formState.inputs);
    try {
      const responseData = await sendRequest(
        // process.env.REACT_APP_BACKEND_URL + "/stage/",
        // "POST",
        process.env.REACT_APP_BACKEND_URL + "/employeurs/stages",
        "POST",
        JSON.stringify({
          titre: formState.inputs.titre.value,
          description: formState.inputs.description.value,
          employeur_id: auth.userId,
          debut: formState.inputs.debut.value,
          fin: formState.inputs.fin.value,
          payant: formState.inputs.payant.value,
          modalite: formState.inputs.modalite.value,
          status: formState.inputs.status.value,
          nom_entreprise: formState.inputs.nom_entreprise.value,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      console.log(responseData);
      history.push("/Stage/liste");
    } catch (err) {
      //history.push("/Contact")
    }
  };

  return (
    <React.Fragment>
      <form className="place-form" onSubmit={placeSubmitHandler}>
        <Input
          id="titre"
          element="input"
          type="text"
          label="Titre du poste"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Entrez un titre de poste valide."
          onInput={inputHandler}
        />
        <Input
          id="description"
          element="textarea"
          type="text"
          label="Description du poste"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Entrez un description valide."
          onInput={inputHandler}
        />
        <Input
          id="courriel"
          element="input"
          type="text"
          label="Courriel"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Entrez un Courriel valide."
          onInput={inputHandler}
        />
        <Input
          id="nom_entreprise"
          element="input"
          type="text"
          label="Nom entreprise"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Entrez un nom d'entreprise valide."
          onInput={inputHandler}
        />
        <Input
          id="debut"
          element="input"
          type="text"
          label="date du début du stage (Année-mois-jours)"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Entrez une date du début du stage valide."
          onInput={inputHandler}
        />
        <Input
          id="fin"
          element="input"
          type="text"
          label="date du fin du stage (Année-mois-jours)"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Entrez une date de fin du stage valide."
          onInput={inputHandler}
        />
        <Input
          id="payant"
          element="input"
          type="text"
          label="stage payant (oui ou non)"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Entrez une réponse valide."
          onInput={inputHandler}
        />
        <Input
          id="modalite"
          element="input"
          type="text"
          label="modalite du stage(distance , présentiel ou hybride)"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Entrez une réponse valide."
          onInput={inputHandler}
        />
        <Input
          id="status"
          element="input"
          type="text"
          label="status du stage(ouvert ou fermé)"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Entrez une réponse valide."
          onInput={inputHandler}
        />
        <Button type="submit" disabled={!formState.isValid}>
          Ajouter Stage
        </Button>
      </form>
    </React.Fragment>
  );
};

export default NewStage;

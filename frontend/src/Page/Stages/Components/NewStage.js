import React from "react";
import { useHistory } from "react-router-dom";
import Input from "../../../Shared/Components/FormElements/Input";
import Button from "../../../Shared/Components/FormElements/Button";
import { useForm } from "../../../Shared/hooks/form-hook";
import { useHttpClient } from "../../../Shared/hooks/http-hook";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
  VALIDATOR_EMAIL,
  VALIDATOR_TELEPHONE,
} from "../../../Shared/util/validators"
import "./StageForm.css"

const NewStage = () => {
  const { error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      prenom: {
        value: "",
        isValid: false,
      },
      nom: {
        value: "",
        isValid: false,
      },
      telephone: {
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
      departement: {
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
          process.env.REACT_APP_BACKEND_URL + "/stages/",
          "POST",
          JSON.stringify({
            prenom: formState.inputs.prenom.value,
            nom: formState.inputs.nom.value,
            telephone: formState.inputs.telephone.value,
            courriel: formState.inputs.courriel.value,
            nom_entreprise: formState.inputs.nom_entreprise.value,
            identifiant: formState.inputs.identifiant.value,
            mdp: formState.inputs.mdp.value,
            departement: formState.inputs.departement.value,
          }),
          {
            "Content-Type": "application/json",
          }
        );
        console.log(responseData);
        //history.push("/Stage/liste");
      } catch (err) {
        //history.push("/Contact")
      }
  };

  return (
    <React.Fragment>
      <form className="place-form" onSubmit={placeSubmitHandler}>
        <Input
          id="prenom"
          element="input"
          type="text"
          label="Prenom du responsable"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Entrez un prenom valide."
          onInput={inputHandler}
        />
        <Input
          id="nom"
          element="input"
          type="text"
          label="Nom du responsable"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Entrez un nom valide."
          onInput={inputHandler}
        />
        <Input
          id="telephone"
          element="input"
          type="text"
          label="Numero telephone du responsable (###-###-####)"
          validators={[VALIDATOR_REQUIRE(),VALIDATOR_TELEPHONE()]}
          errorText="Entrez un numero telephone valide."
          onInput={inputHandler}
        />
        <Input
          id="courriel"
          element="input"
          type="text"
          label="Courriel du responsable"
          validators={[VALIDATOR_REQUIRE(),VALIDATOR_EMAIL()]}
          errorText="Entrez un courriel valide."
          onInput={inputHandler}
        />
        <Input
          id="nom_entreprise"
          element="input"
          type="text"
          label="Nom de l'entreprise"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Entrez le nom de l'entreprise valide."
          onInput={inputHandler}
        />
        <Input
          id="departement"
          element="input"
          type="text"
          label="Nom du departement"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Entrez le nom du departement valide."
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


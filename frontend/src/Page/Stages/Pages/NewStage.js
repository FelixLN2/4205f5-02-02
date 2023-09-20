import React from "react";
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

const NewStage = () => {
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
     /*  employeur_id: {
        value: "",
        isValid: false,
      }, */
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
          sendRequest("http://localhost:5000/api/employeurs/stages"),
          JSON.stringify({
            titre: formState.inputs.titre.value,
            description: formState.inputs.description.value,
            employeur_id: formState.inputs.employeur_id.value,
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
        <Button type="submit" disabled={!formState.isValid}>
          Ajouter Stage
        </Button>
      </form>
    </React.Fragment>
  );
};

export default NewStage;


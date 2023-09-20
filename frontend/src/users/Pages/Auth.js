import React, { useState, useContext } from "react";
import { AuthContext } from "../../Shared/context/auth-context";
import { useHttpClient } from "../../Shared/hooks/http-hook";
import { useForm } from "../../Shared/hooks/form-hook";
import Card from "../../Shared/Components/UIElements/Card";
import Button from "../../Shared/Components/FormElements/Button";
import Input from "../../Shared/Components/FormElements/Input";
import { useHistory } from "react-router-dom";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
  VALIDATOR_EMAIL,
} from "../../Shared/util/validators";
import "./Auth.css";



const Auth = () => {
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const { sendRequest } = useHttpClient();
  const [formState, inputHandler, setFormData] = useForm(
    {
      typeCompte: {
        value: "",
        isValid: false,
      },

      numAdmission: {
        value:"",
        isValid: false,
      },

      prenom: {
        value:"",
        isValid: false,
      },
      nom: {
        value:"",
        isValid: false,
      },
      telephone: {
        value:"",
        isValid: false,
      },
      identifiant: {
        value:"",
        isValid: false,
      },

      nom_entreprise: {
        value:"",
        isValid: false,
      },
      departement: {
        value:"",
        isValid: false,
      },

      courriel: {
        value: "",
        isValid: false,
      },

      mdp: {
        value: "",
        isValid: false,
      },
    },
    false
  );
  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          nom: undefined,
        },
        formState.inputs.typeCompte.isValid &&
          formState.inputs.courriel.isValid &&
          formState.inputs.mdp.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          nom: {
            value: "",
            isValid: false,
          },
        },
        false
      );
    }
    setIsLoginMode((prevMode) => !prevMode);
  };
  const history = useHistory();

  const authSubmitHandler = async (event) => {
    event.preventDefault();
    let alertMessage = "";
    if (isLoginMode) {
      try {
        const reponseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + "/users/connexion",
          "POST",
          JSON.stringify({
            typeCompte: formState.inputs.typeCompte.value,
            courriel: formState.inputs.courriel.value,
            mdp: formState.inputs.mdp.value,
          }),
          {
            "Content-type": "application/json",
          }
        );
        console.log(reponseData);
        auth.login(reponseData.user.id);
        alertMessage = "Connexion réussie!";
        history.push(process.env.REACT_APP_BACKEND_URL);
      } catch (err) {
        console.log(err);
        alertMessage = "Erreur lors de la connexion.";
      }
    } else {
      try {

        if (formState.inputs.typeCompte.value === "Etudiant"){
            console.log("pipipoopoo");
        }
        const reponseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + "/etudiants/",
          "POST",
          JSON.stringify({
            typeCompte: formState.inputs.typeCompte.value,
            nom: formState.inputs.nom.value,
            courriel: formState.inputs.courriel.value,
            mdp: formState.inputs.mdp.value,
          }),
          {
            "Content-Type": "application/json",
          }
        );
        console.log(reponseData);
        auth.login(reponseData.user.id);
        alertMessage = "Inscription réussie!";
        history.push(process.env.REACT_APP_BACKEND_URL);
      } catch (err) {
        console.log(err);
        alertMessage = "Erreur lors de la inscription.";
      }
    }
    alert(alertMessage);
  };

  return (
    <React.Fragment>
      <Card className="authentication">
        <h2>Connexion requise</h2>
        <hr />
        <form onSubmit={authSubmitHandler}>
          <Input
            id="typeCompte"
            element="select2"
            type="text"
            label="Type de compte"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Choissisez le type de compte"
            onInput={inputHandler}
          />
          {!isLoginMode && (
            <Input
              id="nom"
              element="input"
              type="text"
              label="Votre nom"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Entrez un nom valide"
              onInput={inputHandler}
            />
          )}
          <Input
            id="courriel"
            element="input"
            type="text"
            label="Votre courriel"
            validators={[VALIDATOR_EMAIL()]}
            errorText="Entrez un courriel valide"
            onInput={inputHandler}
          />
          <Input
            id="mdp"
            element="input"
            type="text"
            label="Password"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Entrez un mdp valide, au moins 5 caracteres"
            onInput={inputHandler}
          />
          <Button type="submit" disabled={!formState.isValid}>
            {isLoginMode ? "Connexion" : "Inscription"}
          </Button>
        </form>
        <Button inverse onClick={switchModeHandler}>
          Changer pour {isLoginMode ? "Inscription" : "Connexion"}
        </Button>
      </Card>
    </React.Fragment>
  );
};

export default Auth;

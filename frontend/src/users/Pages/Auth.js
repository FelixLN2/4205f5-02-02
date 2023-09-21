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

  const initialFormState = {
    typeCompte: {
      value: "",
      isValid: false,
    },
    //Common
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
    mdp: {
      value: "",
      isValid: false,
    },
    //Etudiants
    numAdmission: {
      value: "",
      isValid: false,
    },
    //Employeur
    identifiant: {
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
  };

  const [formState, inputHandler, setFormData] = useForm(
    initialFormState,
    false
  );

  const switchModeHandler = () => {
    setIsLoginMode((prevMode) => !prevMode);
    setFormData(initialFormState, false);
  };

  const history = useHistory();

  const authSubmitHandler = async (event) => {
    event.preventDefault();
    let alertMessage = "";
    if (isLoginMode) {
      // Code pour connexion
      if(formState.inputs.typeCompte.value === "Etudiant"){
        try {
          //etudiant
          const reponseData = await sendRequest(
            "http://localhost:5000/api/etudiants/" + formState.inputs.numAdmission.value + "/" + formState.inputs.mdp.value,
            "GET"
          );
          console.log(reponseData);
          auth.login(reponseData.numAdmission);
          alertMessage = "Connexion réussie!";
          history.push(process.env.REACT_APP_BACKEND_URL);
        } catch (err) {
          console.log(err);
          alertMessage = "Erreur lors de la connexion" + err;
        }
      } else {
        try {
          //Employeurs
          const reponseData = await sendRequest(
            "http://localhost:5000/api/employeurs/" + formState.inputs.identifiant.value + "/" + formState.inputs.mdp.value,
            "GET"
          );
          console.log(reponseData);
          auth.login(reponseData.identifiant);
          alertMessage = "Connexion réussie!";
          history.push(process.env.REACT_APP_BACKEND_URL);
        } catch (err) {
          console.log(err);
          alertMessage = "Erreur lors de la connexion." + err;
        }
      }
    } else {
      // Code pour inscription
      if(formState.inputs.typeCompte.value === "Etudiant"){
        try {
          //etudiant
          const reponseData = await sendRequest(
            "http://localhost:5000/api/auth/",
            "POST",
            JSON.stringify({
              numAdmission: formState.inputs.numAdmission.value,
              prenom: formState.inputs.prenom.value,
              nom: formState.inputs.nom.value,
              telephone: formState.inputs.telephone.value,
              courriel: formState.inputs.courriel.value,
              mdp: formState.inputs.mdp.value,
              Compte: formState.inputs.typeCompte.value,
            }),
            {
              "Content-Type": "application/json",
            }
          );
          console.log(reponseData);
          auth.login(reponseData.numAdmission);
          alertMessage = "Inscription réussie!";
          history.push(process.env.REACT_APP_BACKEND_URL);
        } catch (err) {
          console.log(err);
          alertMessage = "Erreur lors de l'inscription." + err;
        }
      } else {
        try {
          //Employeurs
          const reponseData = await sendRequest(
            "http://localhost:5000/api/auth/",
            "POST",
            JSON.stringify({
              identifiant: formState.inputs.identifiant.value,
              prenom: formState.inputs.prenom.value,
              nom: formState.inputs.nom.value,
              telephone: formState.inputs.telephone.value,
              courriel: formState.inputs.courriel.value,
              nom_entreprise: formState.inputs.nom_entreprise.value,
              mdp: formState.inputs.mdp.value,
              departement: formState.inputs.departement.value,
              Compte: formState.inputs.typeCompte.value,
            }),
            {
              "Content-type": "application/json",
            }
          );
          console.log(reponseData);
          auth.login(reponseData.identifiant);
          alertMessage = "Inscription réussie!";
          history.push(process.env.REACT_APP_BACKEND_URL);
        } catch (err) {
          console.log(err);
          alertMessage = "Erreur lors de l'inscription." + err;
        }
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
            errorText="Choisissez le type de compte"
            onInput={inputHandler}
          />
          {!isLoginMode && (
            <>
              {formState.inputs.typeCompte.value === "Employeur" && (
                initialFormState.numAdmission.isValid = true,
                initialFormState.prenom.isValid = true,
                initialFormState.nom.isValid = true,
                initialFormState.telephone.isValid = true,
                <>
                  <Input
                    id="nom_entreprise"
                    element="input"
                    type="text"
                    label="Nom de l'entreprise"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Entrez un nom d'entreprise valide"
                    onInput={inputHandler}
                  />
                  <Input
                    id="departement"
                    element="input"
                    type="text"
                    label="Département"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Entrez un département valide"
                    onInput={inputHandler}
                  />
                </>
              )}
              <Input
                id="prenom"
                element="input"
                type="text"
                label="Votre prénom"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Entrez un prénom valide"
                onInput={inputHandler}
              />
              <Input
                id="nom"
                element="input"
                type="text"
                label="Votre nom"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Entrez un nom valide"
                onInput={inputHandler}
              />
              <Input
                id="telephone"
                element="input"
                type="text"
                label="Votre numéro de telephone"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Entrez un num valide"
                onInput={inputHandler}
              />
              <Input
                id="courriel"
                element="input"
                type="text"
                label="Votre courriel"
                validators={[VALIDATOR_EMAIL()]}
                errorText="Entrez un courriel valide"
                onInput={inputHandler}
              />
            </>
            
          )}

          {formState.inputs.typeCompte.value === "Etudiant" && (
            initialFormState.identifiant.isValid = true,
            initialFormState.nom_entreprise.isValid = true,
            initialFormState.departement.isValid = true,
            <>
              <Input
                id="numAdmission"
                element="input"
                type="text"
                label="Numéro d'admission"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Entrez un numéro d'admission valide"
                onInput={inputHandler}
              />
            </>
          )}
          {formState.inputs.typeCompte.value === "Employeur" && (
            initialFormState.identifiant.isValid = true,
            initialFormState.nom_entreprise.isValid = true,
            initialFormState.departement.isValid = true,
            <>
              <Input
                id="identifiant"
                element="input"
                type="text"
                label="Identifiant"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Entrez un identifiant valide"
                onInput={inputHandler}
              />
            </>
          )}
          
          <Input
            id="mdp"
            element="input"
            type="text"
            label="Password"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Entrez un mot de passe valide, au moins 5 caractères"
            onInput={inputHandler}
          />
          <Button type="submit">
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

import React, { useContext } from "react";
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

//teaadsfasdfas
//asdf

const UpdateStage = (props) => {
    const { id } = useParams();
    const { error, sendRequest, clearError } = useHttpClient();
    const auth = useContext(AuthContext);
    const [formState, inputHandler] = useForm(
        {
            titre: {
              value: props.titre,
              isValid: false,
            },
            description: {
              value: props.description,
              isValid: false,
            },
            nom_entreprise: {
              value: props.nom_entreprise,
              isValid: false,
            },
            debut: {
              value: props.debut,
              isValid: false,
            },
            fin: {
              value: props.fin,
              isValid: false,
            },
            payant: {
              value: props.payant,
              isValid: false,
            },
            modalite: {
              value: props.modalite,
              isValid: false,
            },
            status: {
              value: props.status,
              isValid: false,
            },
          },
          false
          );
          const history = useHistory();
          
          const placeSubmitHandler = async (event) => {
            event.preventDefault();
            console.log(formState.inputs);
            console.log(process.env.REACT_APP_BACKEND_URL);
       
            try {
              const url = `${process.env.REACT_APP_BACKEND_URL}/employeurs/stages/modifierStages/${id}`;
              const responseData = await sendRequest(
                url,
                "PATCH",
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
              history.push(`/Stage/liste`);
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
                  defaultValue={props.titre}
                />
                <Input
                  id="description"
                  element="textarea"
                  type="text"
                  label="Description du poste"
                  validators={[VALIDATOR_REQUIRE()]}
                  errorText="Entrez un description valide."
                  onInput={inputHandler}
                  defaultValue={props.description}
                />
                <Input
                  id="nom_entreprise"
                  element="input"
                  type="text"
                  label="Nom entreprise"
                  validators={[VALIDATOR_REQUIRE()]}
                  errorText="Entrez un nom d'entreprise valide."
                  onInput={inputHandler}
                  defaultValue={props.nom_entreprise}
                />
                <Input
                  id="debut"
                  element="input"
                  type="text"
                  label="date du début du stage (Année-mois-jours)"
                  validators={[VALIDATOR_REQUIRE()]}
                  errorText="Entrez une date du début du stage valide."
                  onInput={inputHandler}
                  defaultValue={props.debut}
                />
                <Input
                  id="fin"
                  element="input"
                  type="text"
                  label="date du fin du stage (Année-mois-jours)"
                  validators={[VALIDATOR_REQUIRE()]}
                  errorText="Entrez une date de fin du stage valide."
                  onInput={inputHandler}
                  defaultValue={props.fin}
                />
                <Input
                  id="payant"
                  element="input"
                  type="text"
                  label="stage payant (oui ou non)"
                  validators={[VALIDATOR_REQUIRE()]}
                  errorText="Entrez une réponse valide."
                  onInput={inputHandler}
                  defaultValue={props.payant}
                />
                <Input
                  id="modalite"
                  element="input"
                  type="text"
                  label="modalite du stage(distance , présentiel ou hybride)"
                  validators={[VALIDATOR_REQUIRE()]}
                  errorText="Entrez une réponse valide."
                  onInput={inputHandler}
                  defaultValue={props.modalite}
                />
                
                <Input
                  id="status"
                  element="input"
                  type="text"
                  label="status du stage(ouvert ou fermé)"
                  validators={[VALIDATOR_REQUIRE()]}
                  errorText="Entrez une réponse valide."
                  onInput={inputHandler}
                  defaultValue={props.status}
                />
                <Button type="submit" disabled={!formState.isValid}>
                  Enregistrer les modifications
                </Button>
              </form>
            </React.Fragment>
        
        );
    };
    
export default UpdateStage;
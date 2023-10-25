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

const UpdateStage = (props) => {
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
            courriel: {
              value: props.courriel,
              isValid: false,
            },
            nom_entreprise: {
              value: props.nom_entreprise,
              isValid: false,
            },
            dateDebut: {
              value: props.dateDebut,
              isValid: false,
            },
            dateFin: {
              value: props.dateFin,
              isValid: false,
            },
            stagePayant: {
              value: props.stagePayant,
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
                  initialValue={formState.inputs.titre.value}
                />
                <Input
                  id="description"
                  element="textarea"
                  type="text"
                  label="Description du poste"
                  validators={[VALIDATOR_REQUIRE()]}
                  errorText="Entrez un description valide."
                  onInput={inputHandler}
                  initialValue={formState.inputs.description.value}

                />
                <Input
                  id="courriel"
                  element="input"
                  type="text"
                  label="Courriel"
                  validators={[VALIDATOR_REQUIRE()]}
                  errorText="Entrez un Courriel valide."
                  onInput={inputHandler}
                  initialValue={formState.inputs.courriel.value}

                />
                <Input
                  id="nom_entreprise"
                  element="input"
                  type="text"
                  label="Nom entreprise"
                  validators={[VALIDATOR_REQUIRE()]}
                  errorText="Entrez un nom d'entreprise valide."
                  onInput={inputHandler}
                  initialValue={formState.inputs.nom_entreprise.value}

                />
                <Input
                  id="debut"
                  element="input"
                  type="text"
                  label="date du début du stage (Année-mois-jours)"
                  validators={[VALIDATOR_REQUIRE()]}
                  errorText="Entrez une date du début du stage valide."
                  onInput={inputHandler}
                  initialValue={formState.inputs.debut.value}

                />
                <Input
                  id="fin"
                  element="input"
                  type="text"
                  label="date du fin du stage (Année-mois-jours)"
                  validators={[VALIDATOR_REQUIRE()]}
                  errorText="Entrez une date de fin du stage valide."
                  onInput={inputHandler}
                  initialValue={formState.inputs.fin.value}

                />
                <Input
                  id="payant"
                  element="input"
                  type="text"
                  label="stage payant (oui ou non)"
                  validators={[VALIDATOR_REQUIRE()]}
                  errorText="Entrez une réponse valide."
                  onInput={inputHandler}
                  initialValue={formState.inputs.payant.value}

                />
                <Input
                  id="modalite"
                  element="input"
                  type="text"
                  label="modalite du stage(distance , présentiel ou hybride)"
                  validators={[VALIDATOR_REQUIRE()]}
                  errorText="Entrez une réponse valide."
                  onInput={inputHandler}
                  initialValue={formState.inputs.modalite.value}

                />
                <Input
                  id="status"
                  element="input"
                  type="text"
                  label="status du stage(ouvert ou fermé)"
                  validators={[VALIDATOR_REQUIRE()]}
                  errorText="Entrez une réponse valide."
                  onInput={inputHandler}
                  initialValue={formState.inputs.status.value}
                />
                <Button type="submit" disabled={!formState.isValid}>
                  Enregistrer les modifications
                </Button>
              </form>
            </React.Fragment>
        
        );
    };
    
export default UpdateStage;
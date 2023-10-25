const express = require("express");

const controleursEmployeur = require("../controleurs/employeurs-controleurs")
const controleursStage = require("../controleurs/stages-controleurs")
const router = express.Router();

router.get("/employeurs", controleursEmployeur.getEmployeurs);

router.get("/stages/:identifiant", controleursStage.getStagesEmployeurById);

router.get("/:identifiant/:mdp", controleursEmployeur.verifMdp);

router.get("/:identifiant", controleursEmployeur.getEmployeurById);

router.post('/', controleursEmployeur.creerEmployeur);

router.post('/stages', controleursStage.creerStage);

router.delete("/stages/deleteStage/:stageId", controleursStage.supprimerStage);

//router.patch('/:numAdmission', controleursEtudiant.updateEtudiant);

//router.delete('/:numAdmission', controleursEtudiant.supprimerEtudiant);

module.exports = router;
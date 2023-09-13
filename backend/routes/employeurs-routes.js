const express = require("express");

const controleursEmployeur = require("../controleurs/employeurs-controleurs")
const controleursStage = require("../controleurs/stages-controleurs")
const router = express.Router();

router.get("/employeurs", controleursEmployeur.getEmployeurs);

router.get("/:identifiant", controleursEmployeur.getEmployeurById);

router.post('/', controleursEmployeur.creerEmployeur);

router.get("/stages/:identifiant", controleursStage.getStagesEmployeur);

router.post('/stages', controleursStage.creerStage);

//router.patch('/:numAdmission', controleursEtudiant.updateEtudiant);

//router.delete('/:numAdmission', controleursEtudiant.supprimerEtudiant);

module.exports = router;
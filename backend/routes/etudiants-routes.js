const express = require("express");

const controleursEtudiant = require("../controleurs/etudiants-controleurs")
const controleursStage = require("../controleurs/stages-controleurs")
const router = express.Router();

router.get("/etudiants", controleursEtudiant.getEtudiants);

router.get("/stages", controleursStage.getStagesEtudiant);

router.get("/stages/:stageId", controleursStage.getStageById);

router.get("/:numAdmission", controleursEtudiant.getEtudiantById);

router.post('/', controleursEtudiant.creerEtudiant);


router.patch("/:numAdmission/:stageId", controleursStage.addEtudiant);

//router.patch('/:numAdmission', controleursEtudiant.updateEtudiant);

//router.delete('/:numAdmission', controleursEtudiant.supprimerEtudiant);

module.exports = router;
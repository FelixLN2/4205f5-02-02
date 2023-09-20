const express = require("express");

const controleursAuth = require("../controleurs/auth-controleurs")
const router = express.Router();


router.post("/", controleursAuth.creerUser);

//router.get("/:identifiant", controleursStage.getStageById);

//router.post('/', controleursStage.creerStage);

//router.patch('/:numAdmission', controleursEtudiant.updateEtudiant);

//router.delete('/:numAdmission', controleursEtudiant.supprimerEtudiant);

module.exports = router;
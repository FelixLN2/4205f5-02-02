const express = require("express");

const controleursEtudiant = require("../controlleurs/etudiants-controlleurs")
const router = express.Router();

//router.get("/etudiants", controleursEtudiant.getEtudiants);

router.get("/:numAdmission", controleursEtudiant.getEtudiantById);

router.post('/', controleursEtudiant.creerEtudiant);

//router.patch('/:numAdmission', controleursEtudiant.updateEtudiant);

//router.delete('/:numAdmission', controleursEtudiant.supprimerEtudiant);

module.exports = router;
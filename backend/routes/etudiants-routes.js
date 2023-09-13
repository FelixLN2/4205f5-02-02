const express = require("express");

const controleursEtudiant = require("../controleurs/etudiants-controleurs")
const router = express.Router();

//router.get("/etudiants", controleursEtudiant.getEtudiants);

router.get("/:numAdmission", controleursEtudiant.getEtudiantById);

router.post('/', controleursEtudiant.creerEtudiant);

//router.patch('/:numAdmission', controleursEtudiant.updateEtudiant);

//router.delete('/:numAdmission', controleursEtudiant.supprimerEtudiant);

module.exports = router;
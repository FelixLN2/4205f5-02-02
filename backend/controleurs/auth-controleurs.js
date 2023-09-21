const { default: mongoose, mongo } = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const HttpErreur = require("../models/http-erreur");

const Etudiant = require("./etudiants-controleurs");
const Employeur = require("./employeurs-controleurs");

const creerUser = async (requete, reponse, next) => {
  if (requete.body.Compte === "Etudiant"){
    Etudiant.creerEtudiant(requete, reponse, next);
  } else if (requete.body.Compte === "Employeur") {
    Employeur.creerEmployeur(requete, reponse, next);
  }
};

exports.creerUser = creerUser;
const { response } = require("express");
const { default: mongoose, mongo } = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const HttpErreur = require("../models/http-erreur");

const Stage = require("../models/stage");

const STAGE = [
  {
    titre: "test",
    description: "test",
    employeur_id: null,
    listeEtudiants: []
  },
];

const getStageById = async (requete, reponse, next) => {
  const stageId = requete.params.stageId;
  let stage;
  try {
    stage = await Stage.findById(stageId);
  } catch (err) {
    return next(
      new HttpErreur("Erreur lors de la récupération du stage", 500)
    );
  }
  if (!stage) {
    return next(new HttpErreur("Aucun stage trouvé pour l'id fourni", 404));
  }
  reponse.json({ stage: stage.toObject({ getters: true }) });
};

const getStagesEtudiant = async (requete, reponse, next) => {
  let stages;

  try {
    stages = await Stage.find({});
  } catch {
    return next(new HttpErreur("Erreur accès stages"), 500);
  }

  reponse.json({
    stages: stages.map((stage) =>
      stage.toObject({ getters: true })
    ),
  });
};

const getStagesEmployeur = async (requete, reponse, next) => {
  const employeurId = requete.params.identifiant;
  let stages;

  try {
    stages = await Stage.find({employeur_id:identifiant});
  } catch {
    return next(new HttpErreur("Erreur accès stages"), 500);
  }

  reponse.json({
    stages: stages.map((stage) =>
      stage.toObject({ getters: true })
    ),
  });
};

const creerStage = async (requete, reponse, next) => {
  const { titre,description, employeur_id, listeEtudiants } = requete.body;
  const nouveauStage = new Stage({
    titre,
    description, 
    employeur_id,
    listeEtudiants
  });

  try {

    await nouveauStage.save();
    //Une transaction ne crée pas automatiquement de collection dans mongodb, même si on a un modèle
    //Il faut la créer manuellement dans Atlas ou Compass
  } catch (err) {
    const erreur = new HttpErreur(err, 500);
    return next(erreur);
  }
  reponse.status(201).json({ stage: nouveauStage });
};


exports.getStageById = getStageById;
exports.getStagesEtudiant = getStagesEtudiant;
exports.getStagesEmployeur = getStagesEmployeur;
exports.creerStage = creerStage;
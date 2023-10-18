const { response } = require("express");
const { default: mongoose, mongo } = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const HttpErreur = require("../models/http-erreur");
const Etudiant = require("../models/etudiant");
const Stage = require("../models/stage");
const Employeur = require("../models/employeur");

const STAGE = [
  {
    "titre": "test",
    "description": "test",
    "employeur_id": null,
    "listeEtudiants": []
  },
];

const getStageById = async (requete, reponse, next) => {
  const stageId = requete.params.stageId;
  let stage;
  try {
    console.log(stageId);
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


const addEtudiant = async (requete, reponse, next) => {
  const stageId = requete.params.stageId;
  const numAdmission = requete.params.numAdmission;
  let stage;
  let etudiant;
  //faire conditions pour empecher erreurs
  try{
    //decider si on veut le stageid ou le titre
    //faut stageid qui existe et numadission qui existe
    stage = await Stage.findById(stageId);
    etudiant = await Etudiant.findOne({"numAdmission": numAdmission});
    
    stage.listeEtudiants.push(numAdmission);  
    etudiant.listeStages.push(stageId); 

    await etudiant.save();
    await stage.save(); 
  }catch (err) {
    return next(new HttpErreur("Erreur ajout id etudiant à listeEtudiants ou vice versa" + err), 500);
  }

  reponse.status(200).json({ stage: stage.toObject({ getters: true }), etudiant: etudiant.toObject({ getters: true }) });
  //reponse.status(200).json({ etudiant: etudiant.toObject({ getters: true }) }); 
};

const getStagesEmployeur = async (requete, reponse, next) => {
  const identifiant = requete.params.identifiant;
  let stages;

  try {
    stages = await Stage.find({employeur_id:identifiant});
  } catch (err){
    return next(new HttpErreur("Erreur accès stages" + err), 500);
  }

  reponse.json({
    stages: stages.map((stage) =>
      stage.toObject({ getters: true })
    ),
  });
};

const creerStage = async (requete, reponse, next) => {
  const { titre,description, employeur_id, listeEtudiants = [] } = requete.body;
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


const supprimerStage = async (requete, reponse, next) => {
  const stageId = requete.params.stageId;

  try {
    console.log(stageId);
    const unStage = await Stage.findById(stageId);
    //
    // faut enlever le stage de la liste de stages pour les etudiants et employeurs
    //
    await Etudiant.updateMany({listeStages: stageId}, { $pull: {listeStages: stageId}});
    const employeur = await Employeur.find({identifiant: unStage.employeur_id});
    await employeur.listeStages.pull(stageId);

    await Stage.findByIdAndRemove(stageId);
  } catch (err) {
    return next(
      new HttpErreur("Erreur lors de la suppression du stage" + err, 500)
    );
  }
  if (!unStage) {
    return next(new HttpErreur("Aucun stage trouvé pour l'id fourni", 404));
  }
 
};

const modifierStage = async (requete, reponse, next) => {
  const stageId = requete.params.stageId;
 

  try {

    //
    //debut: requete.params.debut, fin: requete.params.fin, payant: requete.params.payant, modalite: requete.params.modalite, nom_entreprise: requete.params.nom_entreprise, status: requete.params.status
    //
    await Stage.findByIdAndUpdate(stageId, {titre: requete.params.titre, description: requete.params.description })
    
  } catch (err) {
    const erreur = new HttpErreur(err, 500);
    return next(erreur);
  }
  
};


exports.getStageById = getStageById;
exports.getStagesEtudiant = getStagesEtudiant;
exports.getStagesEmployeur = getStagesEmployeur;
exports.creerStage = creerStage;
exports.addEtudiant = addEtudiant;
exports.supprimerStage = supprimerStage;
exports.modifierStage = modifierStage;
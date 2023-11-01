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
    "listeEtudiants": {}
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
    stages = await Stage.find({status:"ouvert"});
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
  const date = new Date();
  const today = date.getDate().toString() + "-" + (date.getMonth() + 1).toString() + "-" + date.getFullYear().toString();

  //faire conditions pour empecher erreurs
  try{
    //decider si on veut le stageid ou le titre
    //faut stageid qui existe et numadission qui existe

    stage = await Stage.findById(stageId);
    etudiant = await Etudiant.findOne({"numAdmission": numAdmission});

    //Si déjà présent
    if(stage.listeEtudiants.has(numAdmission) && etudiant.listeStages.has(stageId)){
      //deja dans la liste, ne peut postuler
      return next(new HttpErreur("Etudiant a deja appliqué, Etudiant ne peut appliquer au même stage"),500);
    }

    //modifier pour les maps
    stage.listeEtudiants.set(numAdmission, today);  
    etudiant.listeStages.set(stageId, today);  
    
    await etudiant.save();
    await stage.save();
    
     
  }catch (err) {
    return next(new HttpErreur("Erreur ajout id etudiant à listeEtudiants ou vice versa" + err), 500);
  }

  reponse.status(200).json({ stage: stage.toObject({ getters: true }), etudiant: etudiant.toObject({ getters: true }) });
  //reponse.status(200).json({ etudiant: etudiant.toObject({ getters: true }) }); 
};

const getStagesEmployeurById = async (requete, reponse, next) => {
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
  const { titre, description, employeur_id, debut, fin, payant, modalite, nom_entreprise, status, listeEtudiants = [] } = requete.body;
  const nouveauStage = new Stage({
    titre,
    description, 
    employeur_id,
    debut,
    fin,
    payant,
    modalite,
    nom_entreprise,
    status,
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
  let unStage;
  try {
    console.log(stageId);
    unStage = await Stage.findById(stageId);
    const etudiants = await Etudiant.find({}); // Récupérer tous les étudiants
    const filteredEtudiants = etudiants.filter(etudiant => etudiant.listeStages.has(stageId));
    //
    // faut enlever le stage de la liste de stages pour les etudiants
    //
    for(const etudiant of filteredEtudiants){
      await etudiant.listeStages.delete(stageId);
      await etudiant.save();
    }

    console.log("La suppression du stage pour chaque objet Etudiant a fonctionné");
    await Stage.findByIdAndRemove(stageId);
    console.log("La suppression du stage a fonctionné");
  } catch (err) {
    return next(
      new HttpErreur("Erreur lors de la suppression du stage" + err, 500)
    );
  }
  if (!unStage) {
    return next(new HttpErreur("Aucun stage trouvé pour l'id fourni", 404));
  }
  reponse.json("Stage supprimé");
};

const modifierStage = async (requete, reponse, next) => {
  const stageId = requete.params.stageId;
  const { titre, description, debut, 
    fin, payant, modalite, nom_entreprise, status } = requete.body;
  try {
    //await Stage.findByIdAndUpdate(stageId, {titre: requete.params.titre, description: requete.params.description, debut: requete.params.debut, fin: requete.params.fin, payant: requete.params.payant, modalite: requete.params.modalite, nom_entreprise: requete.params.nom_entreprise, status: requete.params.status })
    const stage = await Stage.findById(stageId);
    stage.titre =  titre;
    stage.description = description;
    stage.debut = debut;
    stage.fin = fin;
    stage.payant = payant;
    stage.modalite = modalite;
    stage.nom_entreprise = nom_entreprise;
    stage.status = status;
    await stage.save();
  } catch (err) {
    const erreur = new HttpErreur(err, 500);
    return next(erreur);
  }
  
  reponse.json("stage modifié");
  //reponse.status(201).json({ stage: nouveauStage });
};

const getEtudiantsInscrits = async (requete, reponse, next) => {
  const stageId = requete.params.stageId;
  let etudiants;

  try {
    etudiants = await Etudiant.find({"numAdmission": numAdmission});
  } catch {
    return next(new HttpErreur("Erreur accès stages"), 500);
  }

  reponse.json({
    stages: stages.map((stage) =>
      stage.toObject({ getters: true })
    ),
  });
};


exports.getStageById = getStageById;
exports.getStagesEtudiant = getStagesEtudiant;
exports.getStagesEmployeurById = getStagesEmployeurById;
exports.creerStage = creerStage;
exports.addEtudiant = addEtudiant;
exports.supprimerStage = supprimerStage;
exports.modifierStage = modifierStage;
exports.getEtudiantsInscrits = getEtudiantsInscrits;
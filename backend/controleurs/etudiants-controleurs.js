const { v4: uuidv4 } = require("uuid");
const HttpErreur = require("../models/http-erreur");

const Etudiant = require("../models/etudiant");

const ETUDIANTS = [
  {
    numAdmission: "2008442",
    mdp:"Mdp123!",
    prenom:"Labelle",
    nom: "Zachary",
    telephone:"5144206969",
    courriel: "test@hotmail.com",
    stages: []
  },
];

const getEtudiants = async (requete, reponse, next) => {
  let etudiants;

  try {
    etudiants = await Etudiant.find({});
  } catch {
    return next(new HttpErreur("Erreur accès etudiants"), 500);
  }

  reponse.json({
    etudiants: etudiants.map((etudiant) =>
      etudiant.toObject({ getters: true })
    ),
  });
};

const getEtudiantById = async (requete, reponse, next) => {
  const id = requete.params.numAdmission;
  let etudiant;
  try {
    //etudiant = await Etudiant.findById(numAdmission);
    etudiant = await Etudiant.findOne({"numAdmission": id});
  } catch (err) {
    return next(
      new HttpErreur("Erreur lors de la récupération de l'étudiant", 500)
    );
    return err;
  }
  if (!etudiant) {
    return next(new HttpErreur("Aucun étudiant trouvé pour l'id fourni", 404));
  }
  reponse.json({ etudiant: etudiant.toObject({ getters: true }) });
};

const verifMdp = async (requete, reponse, next) => {
  const id = requete.params.numAdmission;
  const mdp = requete.params.mdp;

  let etudiant;
  try {
    //etudiant = await Etudiant.findById(numAdmission);
    etudiant = await Etudiant.findOne({"numAdmission": id});
  } catch (err) {
    return next(
      new HttpErreur("Erreur lors de la récupération de l'étudiant", 500)
    );
    return err;
  }
  if (!etudiant) {
    return next(new HttpErreur("Aucun étudiant trouvé pour l'id fourni", 404));
  }else{
    if(etudiant.mdp != mdp){
      return next(new HttpErreur("Le mot de passe est incorrect", 404));
    }
  }

  reponse.json("Connexion reussie");
};

const creerEtudiant = async (requete, reponse, next) => {
  const {numAdmission, mdp, prenom, nom, telephone, courriel, listeStages } = requete.body;
  
  const nouveauEtudiant = new Etudiant({
    numAdmission,
    mdp,
    prenom,
    nom,
    telephone,
    courriel,
    listeStages
  })

  try {
    await nouveauEtudiant.save();
    
  } catch (err) {
    const erreur = new HttpErreur(err.message, 500);
    return next(erreur);
  }
  reponse.status(201).json({ etudiant: nouveauEtudiant });
};

/* const updateEtudiant = async (requete, reponse, next) => {
  const {nom, courriel, profil, stage} = requete.body;
  const numAdmission = requete.params.numAdmission;

  let etudiant;

  try {
    etudiant = await Etudiant.findById(numAdmission);
    etudiant.nom = nom;
    etudiant.courriel = courriel;
    etudiant.profil = profil;
    etudiant.stage = stage;

    await etudiant.save();
  } catch {
    return next(
      new HttpErreur("Erreur lors de la mise à jour de l'étudiant", 500)
    );
  }

  reponse.status(200).json({ etudiant: etudiant.toObject({ getters: true }) });
};

const supprimerEtudiant = async (requete, reponse, next) => {
  const etudiantId = requete.params.etudiantId;
  let etudiant;

  try {
    etudiant = await Etudiant.findById(etudiantId);
  } catch {
    return next(
      new HttpErreur("Erreur lors de la suppression de l'étudiant", 500)
    );
  }
  if(!etudiant){
    return next(new HttpErreur("Impossible de trouver l'étudiant'", 404));
  }

  try{

    await etudiant.remove();

  }catch{
    return next(
      new HttpErreur("Erreur lors de la suppression de l'étudiant", 500)
    );
  }
  reponse.status(200).json({ message: "Étudiant supprimé" });
}; */

exports.getEtudiants = getEtudiants;
exports.getEtudiantById = getEtudiantById;
exports.creerEtudiant = creerEtudiant;
exports.verifMdp = verifMdp;
/* exports.updateEtudiant = updateEtudiant;
exports.supprimerEtudiant = supprimerEtudiant; */


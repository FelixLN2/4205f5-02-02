const { v4: uuidv4 } = require("uuid");
const HttpErreur = require("../models/http-erreur");

const Employeur = require("../models/employeur");
const employeur = require("../models/employeur");

const EMPLOYEURS = [
  {
    "identifiant":"Employeur1",
    "prenom":"Prenom",
    "nom":"Nom",
    "telephone":"1234567890",
    "courriel":"Employeur1@entreprise1.com",
    "nom_entreprise":"Entreprise1",
    "mdp":"Mdp123!",
    "departement":"Programmation"
  },
];

const getEmployeurs = async (requete, reponse, next) => {
  let employeurs;

  try {
    employeurs = await Employeur.find({});
  } catch {
    return next(new HttpErreur("Erreur accès employeurs"), 500);
  }

  reponse.json({
    employeurs: employeurs.map((employeur) =>
    employeur.toObject({ getters: true })
    ),
  });
};

const getEmployeurById = async (requete, reponse, next) => {
  const id = requete.params.identifiant;
  let employeur;
  try {

    employeur = await Employeur.findOne({"identifiant": id});
  } catch (err) {
    return next(
      new HttpErreur("Erreur lors de la récupération de l'employeur", 500)
    );
    return err;
  }
  if (!employeur) {
    return next(new HttpErreur("Aucun employeur trouvé pour l'id fourni", 404));
  }
  reponse.json({ employeur: employeur.toObject({ getters: true }) });
};

const verifMdp = async (requete, reponse, next) => {
  const id = requete.params.identifiant;
  const mdp = requete.params.mdp;

  let employeur;
  try {
    employeur = await Employeur.findOne({"identifiant": id});
  } catch (err) {
    return next(
      new HttpErreur("Erreur lors de la récupération de l'employeur", 500)
    );
    return err;
  }
  if (!employeur) {
    return next(new HttpErreur("Aucun employeur trouvé pour l'id fourni", 404));
  }else{
    if(employeur.mdp != mdp){
      return next(new HttpErreur("Le mot de passe est incorrect", 404));
    }
  }

  reponse.json("Connexion reussie");
};

const creerEmployeur = async (requete, reponse, next) => {
  const {identifiant, prenom, nom , telephone, courriel, nom_entreprise, mdp, departement } = requete.body;
  
  const nouveauEmployeur = new Employeur({
    identifiant,
    prenom,
    nom, 
    telephone, 
    courriel,
    nom_entreprise, 
    mdp, 
    departement
  })

  try {
    await nouveauEmployeur.save();
    
  } catch (err) {
    const erreur = new HttpErreur(err.message, 500);
    return next(erreur);
  }
  reponse.status(201).json({ employeur: nouveauEmployeur });
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

exports.getEmployeurs = getEmployeurs;
exports.getEmployeurById = getEmployeurById;
exports.creerEmployeur = creerEmployeur;
exports.verifMdp = verifMdp;
/* exports.updateEtudiant = updateEtudiant;
exports.supprimerEtudiant = supprimerEtudiant; */


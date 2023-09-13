const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const employeurSchema = new Schema({
    identifiant: {type: String, required: true, unique: true},
    prenom: {type: String, required: true},
    nom: {type: String, required: true}, 
    telephone : {type: String, required: true},
    courriel: {type: String, required: true},
    nom_entreprise: {type: String, required: true},
    mdp: {type: String, required: true},
    departement: {type: String, required: true},
});

module.exports = mongoose.model("Employeur", employeurSchema);
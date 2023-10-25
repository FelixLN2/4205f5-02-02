const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const etudiantSchema = new Schema({
    numAdmission: {type: String, required: true, unique: true},
    mdp: {type: String, required: true},
    prenom: {type: String, required: true},
    nom: {type: String, required: true}, 
    telephone : {type: String, required: true},
    courriel: {type: String, required: true},
    listeStages: {type: Map, of: String }
});

module.exports = mongoose.model("Etudiant", etudiantSchema);
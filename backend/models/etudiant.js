const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const etudiantSchema = new Schema({
    numAdmission: {type: Number, required: true, unique: true},
    mdp: {type: String, required: true},
    prenom: {type: String, required: true},
    nom: {type: String, required: true}, 
    telephone : {type: Number, required: true},
    courriel: {type: String, required: true}
});

module.exports = mongoose.model("Etudiant", etudiantSchema);
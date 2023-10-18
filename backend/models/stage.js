const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const stageSchema = new Schema({
    titre: {type: String, required: true},
    description: {type: String, required: true},
    employeur_id: {type: String, ref:"Employeur", required: true},
    // debut:{type: String, required:true},
    // fin: {type: String, required:true},
    // payant: {type: Boolean, required:true},
    // modalite: {type: String, required:true},
    // nom_entreprise: {type: String, required:true},
    // status: {type: Boolean, required:true},
    listeEtudiants: [{type: String}]
});

module.exports = mongoose.model("Stage", stageSchema);
const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const stageSchema = new Schema({
    titre: {type: String, required: true},
    description: {type: String, required: true},
    employeur_id: {type: String, ref:"Employeur"},
    listeEtudiants: [{type: String}]
});

module.exports = mongoose.model("Stage", stageSchema);
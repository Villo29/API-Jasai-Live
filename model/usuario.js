const mongoose = require("mongoose");
// Definicion del esquema a utilizar para la coleccion usuario
const TodoSchema = new mongoose.Schema({
    Nombre: {
    type: String,
    required: true,
    min: 12,
    max: 24,
    },
    Contrasena: {
    type: String,
    required: true,
    min: 6,
    max: 12,
},
Correo: {
    type: String,
    required: true,
    min: 10,
    max: 24,
    },
});
// se manda a llamar la coleccion usuario
module.exports = mongoose.model("usuarios", TodoSchema);
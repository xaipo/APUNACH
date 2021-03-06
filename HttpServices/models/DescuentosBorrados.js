/**
 * Created by xaipo on 7/20/2017.
 */
/**
 * Created by xaipo on 7/20/2017.
 */
var restful = require("node-restful");
var mongoose = restful.mongoose;

var DescuentosBorrados = new mongoose.Schema({

   "id_catalogo": {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    "id_local": {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    "nombre_local": {
        type: String,
        required: true
    },
    "id_estado_cuenta": {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    "descripcion": {
        type: String,
        required: true
    },
    "valor_descuento": {
        type: Number,
        required: true
    },
    "cantidad": {
        type: Number,
        required: true
    }


}, {
    collection: 'descuentosborrados'

});

module.exports = restful.model('descuentosborrados', DescuentosBorrados);
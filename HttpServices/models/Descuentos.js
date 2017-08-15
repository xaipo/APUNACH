/**
 * Created by xaipo on 7/20/2017.
 */
/**
 * Created by xaipo on 7/20/2017.
 */
var restful = require("node-restful");
var mongoose = restful.mongoose;

var Descuentos = new mongoose.Schema({

   "id_catalogo": {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    "id_local": {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    "id_estado_cuenta": {
        type: mongoose.Schema.ObjectId,
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
    collection: 'descuentos'

});

module.exports = restful.model('descuentos', Descuentos);
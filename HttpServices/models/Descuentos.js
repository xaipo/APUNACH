/**
 * Created by xaipo on 7/20/2017.
 */
/**
 * Created by xaipo on 7/20/2017.
 */
var restful = require("node-restful");
var mongoose = restful.mongoose;

var Descuentos = new mongoose.Schema({

    "ci_docente": {
        type: Number,
        required: true
    }, "id_catalogo": {
        type: mongoose.Schema.ObjectId,
        required: true
    }, "numero_cuotas": {
        type: Number,
        required: true
    }, "valor_cobrado": {
        type: Number,
        required: true
    },
    "id_local": {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    "fecha_descuento": {
        type: Date,
        required: true
    },
    "id_usuario": {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    "hora": {
        type: String,
        required: true
    }
    ,
    "estad": {
        type: String,
        required: true
    }


}, {
    collection: 'descuentos'

});

module.exports = restful.model('descuentos', Descuentos);
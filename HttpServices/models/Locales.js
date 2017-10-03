/**
 * Created by xaipo on 7/20/2017.
 */
var restful = require("node-restful");
var mongoose = restful.mongoose;

var Locales = new mongoose.Schema({

    "nombre": {
        type: String,
        required: true
    },
    "ruc": {
        type: String,
        required: true
    },
    "direccion": {
        type: String,
        required: true
    }, "credito_max": {
        type: Number,
        required: true
    }, "estado": {
        type: String,
        required: true
    }, "fecha_inicio_acuerdo": {
        type: Date,
        required: true
    }, "telefono": {
        type: String,
        required: true
    }, "porcentaje_ganancia": {
        type: Number,
        required: true
    },

    "nombre_contacto": {
         type: String,

    },

    "cargo": {
        type: String,

    },
    "telefono_contacto": {
        type: String,

    },
    "correo_contacto": {
        type: String,

    }

}, {
    collection: 'locales'

});

module.exports = restful.model('locales', Locales);
/**
 * Created by xaipo on 7/20/2017.
 */
/**
 * Created by xaipo on 7/20/2017.
 */
var restful = require("node-restful");
var mongoose = restful.mongoose;

var EstadoCuenta = new mongoose.Schema({

    "id_docente": {
        type: mongoose.Schema.ObjectId,
        required: true
    }, "id_usuario": {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    "fecha_descuento": {
        type: Date,
        required: true
    },
    "valor_x_pagar": {
        type: Number,
        required: true
    },
    "valor_pagado": {
        type: Number,
        required: true
    },
    "valor_acarreo_mes_anterior": {
    type: Number,
        required: true
},
    "hora": {
        type: String,
        required: true
    },
    "estado": {
        type: String,
        required: true
    },
    "frac_fecha": {
        type: String,
        required: true
    }


}, {
    collection: 'estadocuenta'

});

module.exports = restful.model('estadocuenta', EstadoCuenta);
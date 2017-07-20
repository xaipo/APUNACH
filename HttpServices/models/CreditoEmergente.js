/**
 * Created by xaipo on 7/20/2017.
 */
var restful = require("node-restful");
var mongoose = restful.mongoose;

var CreditoEmergente = new mongoose.Schema({

    "valor" : {
        type: Number,
        required:true
    },"fecha_maxima_pago" : {
        type: Date,
        required:true
    },"numero_cuotas" : {
        type: Number,
        required:true
    },"usuario" : {
        type: mongoose.Schema.ObjectId,
        required:true
    },
    "ci_docente" : {
        type: String,
        required:true
    }


},{ collection: 'creditoEmergente'

});

module.exports = restful.model('creditoEmergente', CreditoEmergente);
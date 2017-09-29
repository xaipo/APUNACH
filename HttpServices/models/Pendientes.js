/**
 * Created by xaipo on 7/20/2017.
 */
var restful = require("node-restful");
var mongoose = restful.mongoose;

var Pendientes = new mongoose.Schema({

    "fecha" : {
        type: Date,
        required:true
    },
    "docente" : {
        type: String,
        required:true
    },
    "observacion" : {
        type: String,
        required:true
    },"estado": {
        type: String,
        required: true
    },
    "valor": {
    type: String,
        required: true
},


},{ collection: 'pendientes'

});

module.exports = restful.model('pendientes', Pendientes);
/**
 * Created by xaipo on 7/20/2017.
 */
var restful = require("node-restful");
var mongoose = restful.mongoose;

var Docente = new mongoose.Schema({

    "cedula" : {
        type: String,
        required:true
    },"nombres" : {
        type: String,
        required:true
    },"apellidos" : {
        type: String,
        required:true
    },
    "fecha_nacimiento" : {
        type: Date,
        required:true
    },
    "direccion" : {
        type: String,
        required:true
    },"telefono" : {
        type: String,
        required:true
    },
    "celular" : {
        type: String,
        required:true
    },
    "correo_electronico" : {
        type: String,
        required:true
    },
    "id_carrera" : {
        type: mongoose.Schema.ObjectId,
        required:true
    },
    "id_tipo_contrato" : {
        type:  mongoose.Schema.ObjectId,
        required:true
    },
    "pregrado" : {
        type: String,
        required:true
    },
    "postgrado" : {
        type: String,
        required:true
    },
    "miembro_asociacion" : {
        type: String,
        required:true
    },
    "fecha_afiliacion" : {
        type: Date,
        required:true
    },
    "estado" : {
        type: String,
        required:true
    },
    "valor_cuota" : {
        type: Number,
        required:true
    }

},{ collection: 'docente'

});

module.exports = restful.model('docente', Docente);
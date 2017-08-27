/**
 * Created by xaipo on 7/20/2017.
 */
var restful = require("node-restful");
var mongoose = restful.mongoose;

var Ingreso = new mongoose.Schema({

    "id_cuenta" : {
        type: mongoose.Schema.ObjectId,
        required:true
    },
    "valor" : {
        type: Number,
        required:true
    },
    "fecha" : {
        type:String ,
        required:true
    },"fecha_sistema" : {
        type: Date,
        required:true
    }, "usuario" : {
        type: mongoose.Schema.ObjectId,
        required:true
    }, "estado": {
        type: String,
        required: true
    }


},{ collection: 'ingreso'

});

module.exports = restful.model('ingreso', Ingreso);
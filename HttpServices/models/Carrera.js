/**
 * Created by xaipo on 7/20/2017.
 */
/**
 * Created by xaipo on 7/20/2017.
 */
var restful = require("node-restful");
var mongoose = restful.mongoose;

var Carrera = new mongoose.Schema({

    "nombre_carrera" : {
        type: String,
        required:true
    },"estado" : {
        type: String,
        required:true
    },"id_facultad" : {
    type: mongoose.Schema.ObjectId,
    required:true
}

},{ collection: 'carrera'

});

module.exports = restful.model('carrera', Carrera);
/**
 * Created by xaipo on 7/20/2017.
 */
var restful = require("node-restful");
var mongoose = restful.mongoose;

var Parametros = new mongoose.Schema({

    "descripcion" : {
        type: String,
        required:true
    },
    "valor" : {
        type: Number,
        required:true
    },
    "estado" : {
        type: String,
        required:true
    }

},{ collection: 'parametros'

});

module.exports = restful.model('parametros', Parametros);
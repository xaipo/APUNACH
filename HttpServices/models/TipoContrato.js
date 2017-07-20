/**
 * Created by xaipo on 7/20/2017.
 */
/**
 * Created by xaipo on 7/20/2017.
 */
var restful = require("node-restful");
var mongoose = restful.mongoose;

var TipoContrato = new mongoose.Schema({

    "descripcion" : {
        type: String,
        required:true
    },"estado" : {
        type: String,
        required:true
    }

},{ collection: 'tipoContrato'

});

module.exports = restful.model('tipoContrato', TipoContrato);
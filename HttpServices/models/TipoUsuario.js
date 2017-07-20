/**
 * Created by xaipo on 7/20/2017.
 */
var restful = require("node-restful");
var mongoose = restful.mongoose;

var TipoUsuario = new mongoose.Schema({

    "descripcion" : {
        type: String,
        required:true
    }

},{ collection: 'tipoUsuario'

});

module.exports = restful.model('tipoUsuario', TipoUsuario);
/**
 * Created by xaipo on 7/20/2017.
 */
var restful = require("node-restful");
var mongoose = restful.mongoose;

var Cuentas = new mongoose.Schema({

    "descripcion" : {
        type: String,
        required:true
    }

},{ collection: 'cuentas'

});

module.exports = restful.model('cuentas', Cuentas);
/**
 * Created by xaipo on 7/20/2017.
 */
var restful = require("node-restful");
var mongoose = restful.mongoose;

var CuentasGasto = new mongoose.Schema({

    "descripcion" : {
        type: String,
        required:true
    },
    "estado": {
        type: String,
        required: true
    }

},{ collection: 'cuentasGasto'

});

module.exports = restful.model('cuentasGasto', CuentasGasto);
/**
 * Created by xaipo on 7/20/2017.
 */
var restful = require("node-restful");
var mongoose = restful.mongoose;

require('mongoose-big-decimal')(mongoose);

var Parametros = new mongoose.Schema({

    "descripcion" : {
        type: String,

    },
    "valor" : {
        type: Number,

    },
    "estado" : {
        type: String,

    }

},{ collection: 'parametros'

});

module.exports = restful.model('parametros', Parametros);
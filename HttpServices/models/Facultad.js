/**
 * Created by xaipo on 7/20/2017.
 */
/**
 * Created by xaipo on 7/20/2017.
 */
var restful = require("node-restful");
var mongoose = restful.mongoose;

var Facultad = new mongoose.Schema({

    "nombre_facultad" : {
        type: String,
        required:true
    },"estado" : {
        type: String,
        required:true
    }

},{ collection: 'facultad'

});

module.exports = restful.model('facultad', Facultad);
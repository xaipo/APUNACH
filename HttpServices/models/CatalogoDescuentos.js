/**
 * Created by xaipo on 7/20/2017.
 */
/**
 * Created by xaipo on 7/20/2017.
 */
var restful = require("node-restful");
var mongoose = restful.mongoose;

var CatalogoDescuento = new mongoose.Schema({

    "descripcion" : {
        type: String,
        required:true
    },"valor" : {
        type: Number,
        required:true
    },"estado" : {
        type: String,
        required:true
    }

},{ collection: 'catalogoDescuento'

});

module.exports = restful.model('catalogoDescuento', CatalogoDescuento);
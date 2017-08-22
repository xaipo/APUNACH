/**
 * Created by xaipo on 7/20/2017.
 */
var restful = require("node-restful");
var mongoose = restful.mongoose;

var CuotasCredito = new mongoose.Schema({

    "id_credito" : {
        type: mongoose.Schema.ObjectId,
        required:true
    },
    "numero_cuotas": {
        type: Number,
        required: true
    },
    "valor_credito": {
        type: Number,
        required: true
    },
    "fecha_max_pago": {
        type: Date,
        required: true
    },
    "fecha_pago": {
        type: Date,
        required: true
    },
    "id_user": {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    "estado": {
        type: String,
        required: true
    },
    "fragmento_fec": {
        type: String,
        required: true
    }

},{ collection: 'cuotascredito'

});

module.exports = restful.model('cuotascredito', CuotasCredito);
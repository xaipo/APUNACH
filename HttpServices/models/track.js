var restful = require("node-restful");
var mongoose = restful.mongoose;

var Track = new mongoose.Schema({


    "imei" : {
    type: String,
    required:true
    },
    "lat" : {
        type: Number,
        required:true
    },
    "lon" :{
        type: Number,
        required:true
    },
    "c_time" : {
        type: Date,
        required:true
    }

},{ collection: 'track'

});

module.exports = restful.model('track', Track);
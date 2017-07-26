const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');
var restful = require("node-restful");

//User schema
const UserSchema = mongoose.Schema({
    name: {
        type: String
    },
    tipoUsuario: {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    estado: {
        type: String,
        required: true
    }
});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports = restful.model('user', UserSchema);



module.exports.getUserById = function (id, callback) {
    User.findById(id, callback);
}

module.exports.getUserByUsername = function (username, callback) {
    const query = { username: username }
    User.findOne(query, callback);
}

module.exports.addUser = function (newUser, callback) {
    bcrypt.genSalt(10,function (err, salt) {
        bcrypt.hash(newUser.password, salt, function(err, hash) {
            if (err) throw err;
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}

module.exports.comparePass = function (candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash,function (err, isMatch)  {
        if (err) throw err;
        callback(null, isMatch);
    });
}
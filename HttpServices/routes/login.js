const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');
const bCrypt = require('bcryptjs');

//Register
router.post('/register', function (req, res, next)  {
    var newUser = new User({
        name: req.body.name,
        email: req.body.email,
        tipoUsuario: req.body.tipoUsuario,
        username: req.body.username,
        password: req.body.password,
        estado:req.body.estado,
    });
    User.addUser(newUser, function(err, user)  {
        if (err) {
            res.json({ success: false, msg: 'Failed to register user' });
        } else {
            res.json({ success: true, msg: 'User registered' });
        }
    });
});
//Todos los usuario


router.put('/updateUser/:id', function (req, res) {


    User.findById(req.params.id, function (err, user) {

        user.name= req.body.name;
        user.email= req.body.email;
        user.tipoUsuario= req.body.tipoUsuario;
        user.username= req.body.username;
      

        user.password =  createHash(req.body.password);

        user.save(function (err) {
            if (err) { res.send(err) }
            res.json(user);
        })
    })




});



var createHash = function(password){
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
};



//Authenticate
router.post('/authenticate',function (req, res, next)  {
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username,function (err, user)  {
        if (err) throw err;
        if (!user) {
            return res.json({ success: false, msg: 'User not found' });
        }

        User.comparePass(password, user.password, function(err, isMatch)  {
            console.log(isMatch);
            console.log(user)
            if (err) throw err;
            if (isMatch) {
                const token = jwt.sign(user, config.secret, {
                    expiresIn: 604800 //1 semana
                });
                res.json({
                    success: true,
                    token: 'JWT ' + token,
                    user: user
                    
                });
            } else {
                return res.json({ success: false, msg: 'Wrong Password!' });
            }
        })
    })
});

//Profile
router.get('/profile', passport.authenticate('jwt', { session: false }),function (req, res, next)  {
    res.json({ user: req.user });
});

module.exports = router;
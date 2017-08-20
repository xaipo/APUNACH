/**
 * Created by xaipo on 7/20/2017.
 */
var express= require('express');
var router= express.Router();

var TipoUsuario = require('../models/Descuentos');

TipoUsuario.methods(['get','put','post','delete']);
TipoUsuario.register(router,'/descuentos');

module.exports=router;
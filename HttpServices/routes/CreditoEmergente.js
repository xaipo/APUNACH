/**
 * Created by xaipo on 7/20/2017.
 */
var express= require('express');
var router= express.Router();

var TipoUsuario = require('../models/CreditoEmergente');

TipoUsuario.methods(['get','put','post','delete','search']);
TipoUsuario.register(router,'/creditoEmergente');

module.exports=router;
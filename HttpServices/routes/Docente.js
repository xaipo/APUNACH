/**
 * Created by xaipo on 7/20/2017.
 */
var express= require('express');
var router= express.Router();

var TipoUsuario = require('../models/Docente');

TipoUsuario.methods(['get','put','post','delete','search']);
TipoUsuario.register(router,'/docente');

module.exports=router;
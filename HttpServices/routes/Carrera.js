/**
 * Created by xaipo on 7/20/2017.
 */
/**
 * Created by xaipo on 7/17/2017.
 */
var express= require('express');
var router= express.Router();

var TipoUsuario = require('../models/Carrera');

TipoUsuario.methods(['get','put','post','delete','search']);
TipoUsuario.register(router,'/carrera');

module.exports=router;
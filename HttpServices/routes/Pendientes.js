/**
 * Created by xaipo on 7/20/2017.
 */
var express= require('express');
var router= express.Router();

var pendientes = require('../models/Pendientes');

pendientes.methods(['get','put','post','delete','search']);
pendientes.register(router,'/pendientes');


module.exports=router;
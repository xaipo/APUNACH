/**
 * Created by xaipo on 7/17/2017.
 */
var express= require('express');
var router= express.Router();

var DetalleFactura = require('../models/track');

DetalleFactura.methods(['get','put','post','delete','search']);
DetalleFactura.register(router,'/track');

module.exports=router;
/**
 * Created by xaipo on 7/20/2017.
 */
var express= require('express');
var router= express.Router();

var Locales = require('../models/Locales');

Locales.methods(['get','put','post','delete','search']);
Locales.register(router,'/locales');

module.exports=router;
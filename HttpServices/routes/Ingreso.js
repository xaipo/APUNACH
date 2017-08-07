/**
 * Created by xaipo on 7/20/2017.
 */
var express= require('express');
var router= express.Router();

var Ingreso = require('../models/Ingreso');

Ingreso.methods(['get','put','post','delete','search']);
Ingreso.register(router,'/ingreso');

router.get('/Ingreso_TipoCuenta', function (req, res, next)  {
    Ingreso.aggregate(

        [
            { "$match": { "estado": "0" } },
            {"$lookup": {
                "from": "cuentas",
                "localField": "id_cuenta",
                "foreignField": "_id",
                "as": "R"
            }}

        ],function (err, tareas) {
            if (err) { return next(err) }
            res.json(tareas);
        }
    )


});

module.exports=router;
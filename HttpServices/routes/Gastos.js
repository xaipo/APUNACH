/**
 * Created by xaipo on 7/20/2017.
 */
var express= require('express');
var router= express.Router();

var Egreso = require('../models/Gastos');

Egreso.methods(['get','put','post','delete','search']);
Egreso.register(router,'/gastos');

router.get('/Egreso_TipoCuenta', function (req, res, next)  {
    Egreso.aggregate(

        [
            { "$match": { "estado": "0" } },
            {"$lookup": {
                "from": "cuentasGasto",
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
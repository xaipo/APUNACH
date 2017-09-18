/**
 * Created by xaipo on 7/20/2017.
 */
var express= require('express');
var router= express.Router();

var Ingreso = require('../models/Ingreso');

var Egreso = require('../models/Gastos');

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







router.post('/ingresosMes', function (req, res, next)  {

    console.log(req.body);

    Ingreso.insertMany( req.body,function (err, tareas) {
        if (err) { return next(err) }
        res.json(tareas);
    } );

   



});





router.post('/Ingresos_Mes', function (req, res, next)  {



    Ingreso.aggregate(


        [


            { "$match":
            {
                "$and" : [
                    {    fecha_sistema: {$gte: new Date(req.body.fecha+"01T00:00:00.369Z")}},
                    {    fecha_sistema: {$lt: new Date(req.body.fecha+"28T00:00:00.369Z")}}


    ]
            }

            },

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




router.post('/Egresos_Mes', function (req, res, next)  {



    Egreso.aggregate(


        [


            { "$match":
            {
                "$and" : [
                    {    fecha_sistema: {$gte: new Date(req.body.fecha+"01T00:00:00.369Z")}},
                    {    fecha_sistema: {$lt: new Date(req.body.fecha+"28T00:00:00.369Z")}}


                ]
            }

            },

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
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






router.post('/ingresoFecha', function (req, res, next)  {

    console.log(req.body);

    var hoy = new Date();
    var dd = hoy.getDate();
    var mm = hoy.getMonth(); //hoy es 0!

    var mes = mm;


    var yyyy = hoy.getFullYear();
    var yyyy1 = hoy.getFullYear();







    var mes1=mm-1;

    if(mes<10) {
        mes='0'+mes
    }

    if(mes1<10) {
        mes1='0'+mes1

    }else {

        if (mes1>12){
            var auxf =mes1-12;

            var anio= yyyy1+1;
            mes1='0'+auxf;
            yyyy1=anio;

        }



    }


    if(mes == 0)
    {
        mes = "01";
       mes1 = 12;
        yyyy1 = yyyy - 1;

    }



    var fechaAnterior =yyyy1+"-"+mes1+"-"+15;
    var fechaActual = yyyy+"-"+mes+"-"+15;

    var estado_mes={};

    console.log(fechaActual,fechaAnterior);

    Ingreso.find(



        {
            "id_cuenta":  req.body.cuenta,
            "fecha": {
                $gte: new Date(fechaAnterior +"T00:00:00.000Z"),
                $lte: new Date(fechaActual+"T00:00:00.000Z")
            }

        },function (err, datos) {
            if (err) { return next(err) }
            res.json(datos);
        }


    )


});




module.exports=router;
/**
 * Created by xaipo on 7/20/2017.
 */
var express= require('express');
var router= express.Router();

var TipoUsuario = require('../models/EstadoCuenta');
var Docente = require('../models/Docente');


TipoUsuario.methods(['get','put','post','delete','search']);
TipoUsuario.register(router,'/estadocuenta');

var hoy = new Date();
var dd = hoy.getDate();
var mm = hoy.getMonth()+1; //hoy es 0!

var mes = mm;


var yyyy = hoy.getFullYear();
var yyyy1 = hoy.getFullYear();



var mes1=mm+1;

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




var fechaAnterior =yyyy1+"-"+mes1+"-"+15;
var fechaActual = yyyy+"-"+mes+"-"+15;

var fecha1 = mes+'/'+yyyy;



console.log(fechaActual,fechaAnterior);











router.get('/estadocuenta_docente', function (req, res, next)  {
    TipoUsuario.aggregate(

        [
            { "$match": { "estado": "1","frac_fecha":fecha1 } },
            {"$lookup": {
                "from": "docente",
                "localField": "id_docente",
                "foreignField": "_id",
                "as": "R"
            }}

        ],function (err, tareas) {
            if (err) { return next(err) }
            res.json(tareas);
        }
    )


});

router.post('/verEstadcoCuentaDocente', function (req, res, next)  {
    Docente.aggregate(

        [
            { "$match": { "cedula": req.body.cedula } },
            {"$lookup": {
                "from": "estadocuenta",
                "localField": "_id",
                "foreignField": "id_docente",
                "as": "R"
            }}

        ],function (err, tareas) {
            if (err) { return next(err) }
            res.json(tareas);
        }
    )


});

router.post('/EstadcoCuentaDocenteFecha', function (req, res, next)  {

console.log(req.body.frac_fecha);
    TipoUsuario.aggregate(


        [
            { "$match": { "frac_fecha": req.body.frac_fecha} },
            {"$lookup": {
                "from": "docente",
                "localField": "id_docente",
                "foreignField": "_id",
                "as": "R"
            }}

        ],function (err, tareas) {
            if (err) { return next(err) }
            res.json(tareas);
        }
    )


});



//docente estado de cuenta

router.get('/estadocuenta_docente1', function (req, res, next)  {

    Docente.aggregate([


        {
            $lookup: {
                from: "estadocuenta",
                localField: "_id",
                foreignField: "id_docente",
                as: "estadocuenta"
            }
        }, {
            $unwind: {
                path: "$estadocuenta",
                preserveNullAndEmptyArrays: true
            }
        },{ "$match": { "estadocuenta.estado": "1","estadocuenta.frac_fecha": {
            $gte: new Date(fechaActual+"T00:00:00.000Z"),
            $lte: new Date(fechaAnterior+"T00:00:00.000Z")
        } } },
        {
            $lookup: {
                from: "descuentos",
                localField: "estadocuenta._id",
                foreignField: "id_estado_cuenta",
                as: "estadocuenta.descuentos",
            }
        }],function (err, tareas) {
        if (err) { return next(err) }
        res.json(tareas);
    }

    );


});


//aqui va la fecha

router.post('/EstadoCuentaDocente', function (req, res, next)  {



    TipoUsuario.find(



        {
            "id_docente":  req.body.docente,
            "frac_fecha": {
                $gte: new Date(fechaActual+"T00:00:00.000Z"),
                $lte: new Date(fechaAnterior+"T00:00:00.000Z")
            }

        },function (err, datos) {
            if (err) { return next(err) }
            res.json(datos);
        }


    )


});


router.get('/AllEstadoCuenta', function (req, res, next)  {



    TipoUsuario.find(



        {
            "frac_fecha": {
                $gte: new Date("2017-09-15T05:00:00.000Z"),
                $lte: new Date("2017-09-28T05:00:00.000Z")
            }

        },function (err, datos) {
            if (err) { return next(err) }
            res.json(datos);
        }


    )





});



router.get('/AllEstadoCuenta1', function (req, res, next)  {




    TipoUsuario.aggregate(


        [


            { "$match":
            {
                "$and" : [
                    {    frac_fecha: {$gte: new Date( fechaActual+"T00:00:00.000Z")}},
                    {    frac_fecha: {$lte: new Date(fechaAnterior+"T00:00:00.000Z")}},
                    {    estado: "1"}


                ]
            }

            },

            {"$lookup": {
                "from": "docente",
                "localField": "id_docente",
                "foreignField": "_id",
                "as": "R"
            }}

        ],function (err, tareas) {
            if (err) { return next(err) }
            res.json(tareas);
        }
    )


});



router.post('/EstadoCuentaDocenteFecha', function (req, res, next)  {

    console.log(req.body);


    TipoUsuario.find(



        {
            "id_docente":  req.body.docente,
            "frac_fecha": {
                $gte: new Date(req.body.fecha),
                $lte: new Date(req.body.fecha1)
            }

        },function (err, datos) {
            if (err) { return next(err) }
            res.json(datos);
        }


    )


});



module.exports=router;
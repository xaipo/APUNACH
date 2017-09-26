/**
 * Created by xaipo on 7/20/2017.
 */
var express= require('express');
var router= express.Router();

var TipoUsuario = require('../models/Descuentos');

TipoUsuario.methods(['get','put','post','delete']);
TipoUsuario.register(router,'/descuentos');



var hoy = new Date();
var dd = hoy.getDate();
var mm = hoy.getMonth()+1; //hoy es 0!
var yyyy = hoy.getFullYear();
var mes = mm;

var mes1=mm+1;

if(mes<10) {
    mes='0'+mes
}

if(mes1<10) {
    mes1='0'+mes1
}





var fechaAnterior =yyyy+"-"+mes1+"-"+15;
var fechaActual = yyyy+"-"+mes+"-"+15;



router.get('/mesPrestamos', function (req, res, next)  {

console.log("entro");


    TipoUsuario.aggregate([
        {
            $match: {

                "fecha": {
                    $gte: new Date(fechaActual+"T00:00:00.000Z"),
                    $lte: new Date(fechaAnterior+"T00:00:00.000Z")
                }
                ,descripcion: { $eq:"Credito Emergente"  }
            }
        },
        {
            $group: {
                _id:"599f1da634917b1ea454e64f" ,
                valor: {$sum: "$valor_descuento" }
            }
        }
    ], function (err, result) {
        if (err) {
            next(err);
        } else {
            res.json(result);
        }
    });





});



router.get('/mesCuotas', function (req, res, next)  {

//sacar ganancias de cada local por el mes q se elija y agrupar 

    TipoUsuario.aggregate([
        {
            $match: {
                "fecha": {
                    $gte: new Date(fechaActual+"T00:00:00.000Z"),
                    $lte: new Date(fechaAnterior+"T00:00:00.000Z")
                },descripcion: { $eq:"Valor cuota inicial"  }
            }
        },
        {
            $group: {
                _id:"599f1d9a34917b1ea454e64e" ,
                valor: {$sum: "$valor_descuento" }
            }
        }
    ], function (err, result) {
        if (err) {
            next(err);
        } else {
            res.json(result);
        }
    });




});





router.post('/mesGanancias', function (req, res, next)  {

    console.log(req.body);

    TipoUsuario.aggregate([
        {
            $match: {
                fecha: { $eq: req.body.fecha }
            }
        },
    {
        $group: {
            _id:"$nombre_local" ,
            valor: {$sum: "$valor_descuento" }
        }
    },

    {$lookup: {from: "locales", localField: "_id", foreignField: "nombre", as: "local"}}



], function (err, result) {
        if (err) {
            next(err);
        } else {
            res.json(result);
        }
    });




});





module.exports=router;
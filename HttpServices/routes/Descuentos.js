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

if(mes<10) {
    mes='0'+mes
}

var fecha1 = mes+'/'+yyyy;

console.log(fecha1);



router.get('/mesPrestamos', function (req, res, next)  {

console.log("entro");


    TipoUsuario.aggregate([
        {
            $match: {
                fecha: { $eq: fecha1 },descripcion: { $eq:"Credito Emergente"  }
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



    TipoUsuario.aggregate([
        {
            $match: {
                fecha: { $eq: fecha1 },descripcion: { $eq:"Valor cuota inicial"  }
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


module.exports=router;
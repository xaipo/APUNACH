/**
 * Created by xaipo on 7/20/2017.
 */
var express= require('express');
var router= express.Router();

var TipoUsuario = require('../models/CuotasCredito');

TipoUsuario.methods(['get','put','post','delete','search']);
TipoUsuario.register(router,'/cuotascredito');


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



router.get('/cuotasUpdate', function (req, res, next)  {


    TipoUsuario.updateMany(

        {    "fragmento_fec": {
                $gte: new Date(fechaActual+"T00:00:00.000Z"),
                $lte: new Date(fechaAnterior+"T00:00:00.000Z")
            }
        },
        { $set: { estado : "pagado" } }
        ,function (err, tareas) {
            if (err) { return next(err) }
            res.json(tareas);
        }


    )


});








module.exports=router;
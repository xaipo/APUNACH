/**
 * Created by xaipo on 7/20/2017.
 */
var express= require('express');
var router= express.Router();

var TipoUsuario = require('../models/Parametro');

TipoUsuario.methods(['get','put','post','delete','search']);
TipoUsuario.register(router,'/parametro');





router.get('/EstadoMesParametro', function (req, res, next)  {


    var hoy = new Date();
    var dd = hoy.getDate();
    var mm = hoy.getMonth(); //hoy es 0!

    if(mm == 0)
    {
      mm = 1;

    }

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






    var fechaAnterior =yyyy1+"-"+mes1+"-"+283;
    var fechaActual = yyyy+"-"+mes+"-"+28;

    var estado_mes={};

    console.log(fechaActual,fechaAnterior);

    res.json({fecha:fechaActual+"T00:00:00.000Z"});






});








router.get('/EstadoCierreMes', function (req, res, next)  {

    TipoUsuario.find(



        {
            "descripcion": "cierreMes"

        },function (err, datos) {
            if (err) {
                return next(err)
            }


            res.json({estado: datos[0].estado});

        });




});






module.exports=router;
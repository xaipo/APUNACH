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

if(mes<10) {
    mes='0'+mes
}

var fecha1 = mes+'/'+yyyy;

console.log(fecha1);



router.get('/cuotasUpdate', function (req, res, next)  {


    TipoUsuario.updateMany(

        { fragmento_fec: fecha1 },
        { $set: { estado : "pagado" } }
        ,function (err, tareas) {
            if (err) { return next(err) }
            res.json(tareas);
        }


    )


});








module.exports=router;
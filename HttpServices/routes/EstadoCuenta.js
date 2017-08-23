/**
 * Created by xaipo on 7/20/2017.
 */
var express= require('express');
var router= express.Router();

var TipoUsuario = require('../models/EstadoCuenta');

TipoUsuario.methods(['get','put','post','delete','search']);
TipoUsuario.register(router,'/estadocuenta');

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





router.get('/fecha', function (req, res, next)  {



});

module.exports=router;
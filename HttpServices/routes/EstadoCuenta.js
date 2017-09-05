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
        },{ "$match": { "estadocuenta.estado": "1","estadocuenta.frac_fecha":fecha1 } },
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

module.exports=router;
/**
 * Created by xaipo on 7/20/2017.
 */
var express= require('express');
var router= express.Router();
var parametros = require('../models/Parametro');
var TipoUsuario = require('../models/Descuentos');

TipoUsuario.methods(['get','put','post','delete']);
TipoUsuario.register(router,'/descuentos');


router.get('/mesPrestamos', function (req, res, next)  {



    parametros.find(



        {
            "descripcion": "cierreMes"

        },function (err, datos) {
            if (err) { return next(err) }

            estado_mes = datos[0].estado;

            console.log(estado_mes);






            if (estado_mes=="cerrado"){


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

                var estado_mes={};

                console.log(fechaActual,fechaAnterior);








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




            }else {


                //si pasa al 15 cambair estado abierto


                var hoy = new Date();
                var dd = hoy.getDate();
                var mm = hoy.getMonth()+1; //hoy es 0!

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






                var fechaAnterior =yyyy1+"-"+mes1+"-"+15;
                var fechaActual = yyyy+"-"+mes+"-"+15;

                var estado_mes={};

                console.log(fechaActual,fechaAnterior);





                TipoUsuario.aggregate([
                    {
                        $match: {

                            "fecha": {
                                $gte: new Date(fechaAnterior +"T00:00:00.000Z"),
                                $lte: new Date(fechaActual+"T00:00:00.000Z")
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




            }





        }


    );










});



router.get('/mesCuotas', function (req, res, next)  {

//sacar ganancias de cada local por el mes q se elija y agrupar 


    parametros.find(



        {
            "descripcion": "cierreMes"

        },function (err, datos) {
            if (err) { return next(err) }

            estado_mes = datos[0].estado;

            console.log(estado_mes);






            if (estado_mes=="cerrado"){


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

                var estado_mes={};

                console.log(fechaActual,fechaAnterior);








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



            }else {


                //si pasa al 15 cambair estado abierto


                var hoy = new Date();
                var dd = hoy.getDate();
                var mm = hoy.getMonth()+1; //hoy es 0!

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






                var fechaAnterior =yyyy1+"-"+mes1+"-"+15;
                var fechaActual = yyyy+"-"+mes+"-"+15;

                var estado_mes={};

                console.log(fechaActual,fechaAnterior);







                TipoUsuario.aggregate([
                    {
                        $match: {
                            "fecha": {
                                $gte: new Date(fechaAnterior +"T00:00:00.000Z"),
                                $lte: new Date(fechaActual+"T00:00:00.000Z")
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





            }





        }


    );







            });










router.post('/mesGanancias', function (req, res, next)  {

    console.log(req.body);

    TipoUsuario.aggregate([
        {


            $match: {
                "fecha": {
                    $gte: new Date(req.body.fecha ),
                    $lte: new Date(req.body.fecha1)
                }
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
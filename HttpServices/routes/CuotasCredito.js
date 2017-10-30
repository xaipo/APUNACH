/**
 * Created by xaipo on 7/20/2017.
 */
var express= require('express');
var router= express.Router();

var TipoUsuario = require('../models/CuotasCredito');

TipoUsuario.methods(['get','put','post','delete','search']);
TipoUsuario.register(router,'/cuotascredito');
var parametros = require('../models/Parametro');

router.get('/cuotasUpdate', function (req, res, next)  {




    parametros.find(



        {
            "descripcion": "cierreMes"

        },function (err, datos) {
            if (err) {
                return next(err)
            }

            estado_mes = datos[0].estado;

            console.log(estado_mes);


            if (estado_mes == "cerrado") {


                var hoy = new Date();
                var dd = hoy.getDate();
                var mm = hoy.getMonth() + 1; //hoy es 0!

                var mes = mm;


                var yyyy = hoy.getFullYear();
                var yyyy1 = hoy.getFullYear();


                var mes1 = mm + 1;

                if (mes < 10) {
                    mes = '0' + mes
                }

                if (mes1 < 10) {
                    mes1 = '0' + mes1

                } else {

                    if (mes1 > 12) {
                        var auxf = mes1 - 12;

                        var anio = yyyy1 + 1;
                        mes1 = '0' + auxf;
                        yyyy1 = anio;

                    }


                }


                var fechaAnterior = yyyy1 + "-" + mes1 + "-" + 15;
                var fechaActual = yyyy + "-" + mes + "-" + 15;

                var estado_mes = {};

                console.log(fechaActual, fechaAnterior);


                TipoUsuario.updateMany(
                    {
                        "fragmento_fec": {
                            $gte: new Date(fechaActual + "T00:00:00.000Z"),
                            $lte: new Date(fechaAnterior + "T00:00:00.000Z")
                        }
                    },
                    {$set: {estado: "pagado"}}
                    , function (err, tareas) {
                        if (err) {
                            return next(err)
                        }
                        res.json(tareas);
                    }
                )


            } else {


                //si pasa al 15 cambair estado abierto


                var hoy = new Date();
                var dd = hoy.getDate();
                var mm = hoy.getMonth() + 1; //hoy es 0!

                var mes = mm;


                var yyyy = hoy.getFullYear();
                var yyyy1 = hoy.getFullYear();


                var mes1 = mm - 1;

                if (mes < 10) {
                    mes = '0' + mes
                }

                if (mes1 < 10) {
                    mes1 = '0' + mes1

                } else {

                    if (mes1 > 12) {
                        var auxf = mes1 - 12;

                        var anio = yyyy1 + 1;
                        mes1 = '0' + auxf;
                        yyyy1 = anio;

                    }


                }
                
                if(mm == 1)
                {
                    mes1 = 12;
                    yyyy1 = yyyy - 1;

                }

                var fechaAnterior = yyyy1 + "-" + mes1 + "-" + 15;
                var fechaActual = yyyy + "-" + mes + "-" + 15;

                var estado_mes = {};

                console.log(fechaActual, fechaAnterior);





                TipoUsuario.updateMany(
                    {
                        "fragmento_fec": {
                            $gte: new Date(fechaAnterior  + "T00:00:00.000Z"),
                            $lte: new Date(fechaActual + "T00:00:00.000Z")
                        }
                    },
                    {$set: {estado: "pagado"}}
                    , function (err, tareas) {
                        if (err) {
                            return next(err)
                        }
                        res.json(tareas);
                    }
                )





            }


        }
            );





            });








module.exports=router;
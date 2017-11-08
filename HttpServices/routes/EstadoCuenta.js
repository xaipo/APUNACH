/**
 * Created by xaipo on 7/20/2017.
 */
var express= require('express');
var router= express.Router();

var jsonsafeparse = require('json-safe-parse');
var TipoUsuario = require('../models/EstadoCuenta');
var Docente = require('../models/Docente');
var Locales = require('../models/Locales');
var Excel = require('exceljs');



var TipoUsuario = require('../models/EstadoCuenta');
var Docente = require('../models/Docente');
var parametros = require('../models/Parametro');

TipoUsuario.methods(['get','put','post','delete','search']);
TipoUsuario.register(router,'/estadocuenta');





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


console.log(req.body);


    TipoUsuario.aggregate(


        [

            { "$match":
            {
                "$and" : [
                    {    frac_fecha: {$gte: new Date( req.body.fecha)}},
                    {    frac_fecha: {$lte: new Date(req.body.fecha1)}}

                ]
            }

            }
            ,
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

router.post('/funexel', function (req, res, next)  {

   
    console.log("aca estoy ",req.body);

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
            },{ "$match": { "estadocuenta.estado": "2","estadocuenta.frac_fecha": {
                $gte: new Date(req.body.fecha),
                $lte: new Date(req.body.fecha1)
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

            // Locales.find()
            Locales.find({},function (err, locales) {
                    if (err) { return next(err) }

                    //console.log(tareas[0]);
                    // console.log(tareas[0].estadocuenta);

                    var fs = require('fs');
                    var file= Date.now()+'.xlsx'

                    var totalh = 0;





                    var workbook = new Excel.Workbook();
                    var worksheet = workbook.addWorksheet('sheet');

                    // must create one more sheet.
                    // var sheet = workbook.addWorksheet("My Sheet");
                    var s= locales.length
                    var array=[];
                    array.push({header: 'N', key: 'N', width: 5});
                    array.push({header: 'Relacion Laboral', key: 'Relacion Laboral', width: 20});
                    array.push({header: 'Cedula', key: 'Cedula', width: 20});
                    array.push({header: 'Nombre', key: 'Nombre', width: 40});
                    for(var k=0;k<s;k++) {

                        var auxDoc= {header: locales[k].nombre, key: locales[k].nombre, width: 10};
                        array.push(auxDoc);


                    }
                    array.push({header: 'Total', key: 'Total', width: 20});
                    worksheet.columns=array;


                    console.log(tareas)
                    console.log(tareas.length)


                    var r=tareas.length;
                var total_total = 0;
                    for(var j=0;j<r;j++){


                        var n= locales.length;
                        var aux=JSON.stringify('');
                        var numCedl=parseInt(j)+1;
                        var ape_nomb = tareas[j].apellidos+" "+tareas[j].nombres;
                        console.log(ape_nomb );

                        total_total = total_total + tareas[j].estadocuenta.valor_x_pagar;
                        aux+='{"Cedula":"'+tareas[j].cedula+'","N":"'+numCedl+'","Relacion Laboral":"'+tareas[j].id_tipo_contrato.tipo+'","Nombre":"'+ape_nomb+'","Total":"'+tareas[j].estadocuenta.valor_x_pagar+'",';
                        for(var i=0;i<n;i++){

                            //console.log(aux);
                            var m=tareas[j].estadocuenta.descuentos.length
                            var auxDescuento=tareas[j].estadocuenta.descuentos;


                            var resultado=auxDescuento.filter(tarea => tarea.nombre_local===locales[i].nombre);
                            var total=resultado.length;
                            if(total===0){

                                aux+='"'+locales[i].nombre+'"'+':"'+0+'",';
                            }else{
                                if(total<2){
                                    aux+='"'+locales[i].nombre+'":"'+resultado[0].valor_descuento+'",';
                                }else{
                                    var sum=0;
                                    for(var s=0; s<total;s++){
                                        sum+=resultado[s].valor_descuento;
                                    }
                                    aux+='"'+locales[i].nombre+'":"'+sum+'",';
                                }

                            }
                            console.log(resultado);
                            console.log(locales[i].nombre);

                        }

                        var num= aux.length;
                        aux=aux.substring(2,num-1);
                        aux+='}';
                        console.log(aux);
                        var newAux=JSON.parse(aux.toString());
                        console.log(aux);
                        worksheet.addRow(newAux);

                    }

                worksheet.addRow();


               var columna = '{"Cedula":"","N":"","Relacion Laboral":"","Nombre":" ",';

                for(var i=0;i<n;i++){

                    if(i==n-1)
                    {
                        columna+='"'+locales[i].nombre+'"'+':"TOTAL",';
                    }else {
                        columna+='"'+locales[i].nombre+'"'+':" ",';
                    }




                }

                columna+='"Total":"'+total_total.toFixed(2)+'"}';








                console.log(columna);
                var columna1=JSON.parse(columna.toString());
                worksheet.addRow(columna1);

                console.log(total_total.toFixed(2));
                worksheet.addRow(total_total.toFixed(2).toString());



                    //console.log(locales);
                    // res.json(tareas);


                    // Access an individual columns by key, letter and 1-based column number
                    /* var idCol = worksheet.getColumn('id');
                     var nameCol = worksheet.getColumn('B');
                     var dobCol = worksheet.getColumn(3);*/

                    // set column properties

                    // Note: will overwrite cell value C1




                    // you can create xlsx file now.
                    workbook.xlsx.writeFile('./consolidado/'+file).then(function() {
                        res.setHeader('Content-disposition', 'attachment; filename=file.xlsx');
                        res.setHeader('Content-type', 'application/vnd.ms-excel');

                        //var file =  "C:\\test\\some.xlsx";
                        var file2=file;

                        console.log(file2);
                        res.json(file2);





                    });






                }


            )






        }

    );


});




router.get('/descargarConsolidado/:id', function (req, res, next)  {

res.download('./consolidado/'+req.params.id,
    req.params.id,function (err) {
        if (err){
            console.log(err);
        }else {
            console.log("listo");
        }
    });


});


router.get('/estadocuenta_docente1', function (req, res, next)  {




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
    console.log("servidor");
    console.log(fechaAnterior, fechaActual,req.body.docente);



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


                if(mm == 1)
                {
                    mes1 = 12;
                    yyyy1 = yyyy - 1;

                }



                var fechaAnterior =yyyy1+"-"+mes1+"-"+15;
                var fechaActual = yyyy+"-"+mes+"-"+15;

                var estado_mes={};

                console.log(fechaActual,fechaAnterior);


                TipoUsuario.find(



                    {
                        "id_docente":  req.body.docente,
                        "frac_fecha": {
                            $gte: new Date(fechaAnterior+"T00:00:00.000Z"),
                            $lte: new Date(fechaActual+"T00:00:00.000Z")
                        }

                    },function (err, datos) {
                        if (err) { return next(err) }
                        res.json(datos);
                    }


                )




            }





        }


    );



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


if(mm == 1)
{
    mes1 = 12;
    yyyy1 = yyyy - 1;

}



    var fechaAnterior =yyyy1+"-"+mes1+"-"+15;
    var fechaActual = yyyy+"-"+mes+"-"+15;

    var estado_mes={};

    console.log(fechaActual,fechaAnterior);





    TipoUsuario.aggregate(


        [


            { "$match":
            {
                "$and" : [
                    {    frac_fecha: {$gte: new Date( fechaAnterior +"T00:00:00.000Z")}},
                    {    frac_fecha: {$lte: new Date(fechaActual+"T00:00:00.000Z")}},
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



}





        }


    );






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
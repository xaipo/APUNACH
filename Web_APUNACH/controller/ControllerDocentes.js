app.controller('docentesController', ['$scope', '$http', '$location','myProvider','$localStorage','$timeout',  function ($scope,$http,$location,myProvider,$localStorage,$timeout) {


    $scope.initDocentes=function(){

        $http({
            method: 'GET',
            url: myProvider.getFacultades(),
            headers: {
                // 'Content-Type': 'application/json',
                //'Authorization': token
            },

        }).then(function successCallback(response) {
            console.log(response.data);

            if (response.data.length == 0) {

                swal("Advertencia!", "No existen carreras en la BD!", "warning");
            } else {

                $scope.listFacultades = response.data;

            }


        }, function errorCallback(response) {

            alert('error al realizar Ingreso');

        });


/*

        $http({
            method: 'GET',
            url: myProvider.getCarrera_Facultad(),
            headers: {
                // 'Content-Type': 'application/json',
                //'Authorization': token
            },

        }).then(function successCallback(response) {
            console.log(response.data);

            if (response.data.length == 0) {

                swal("Advertencia!", "No existen carreras en la BD!", "warning");
            } else {

                $scope.listCarrera_Facultad = response.data;

            }


        }, function errorCallback(response) {

            alert('error al realizar Ingreso');

        });*/



        $http({
            method: 'GET',
            url: myProvider.getTipo_Contrato(),
            headers: {
                // 'Content-Type': 'application/json',
                //'Authorization': token
            },

        }).then(function successCallback(response) {
            console.log(response.data);

            if (response.data.length == 0) {

                swal("Advertencia!", "No existen carreras en la BD!", "warning");
            } else {

                $scope.listTipo_contrato= response.data;

            }


        }, function errorCallback(response) {

            alert('error al realizar Ingreso');

        });

        $('#idfecha_naci').datepicker({
            autoclose: true,
            changeMonth: true,
            changeYear: true,
            format: 'yyyy-mm-dd', //Se especifica como deseamos representarla
            firstDay: 1

        });

        $('#idfecha_afiliacion').datepicker({
            autoclose: true,
            changeMonth: true,
            changeYear: true,
            format: 'yyyy-mm-dd', //Se especifica como deseamos representarla
            firstDay: 1

        });


        console.log("datso al cargar ");

/*
        $http({
            method: 'GET',
            url: myProvider.getParametros()+"?estado="+0,
            headers: {
                // 'Content-Type': 'application/json',
                //'Authorization': token
            },

        }).then(function successCallback(response) {
            console.log(response.data[0]);

            var hoy = new Date();
            var dd = hoy.getDate();
            var mm = hoy.getMonth(); //hoy es 0!
            var yyyy = hoy.getFullYear();

            var cuotas=12-mm;
            console.log(mm);
            $scope.valor_cuota=response.data[0].valor/cuotas;

            $scope.cuotaInicial={
              cuotas:cuotas,
                valor:$scope.valor_cuota

            };

        }, function errorCallback(response) {

            alert('error al realizar Ingreso');

        });


*/

        $http({
            method: 'GET',
            url: myProvider.getLocales()+"?estado="+0,
            headers: {
                // 'Content-Type': 'application/json',
                //'Authorization': token
            },

        }).then(function successCallback(response) {
            console.log(response.data);

            if (response.data.length == 0) {

                swal("Advertencia!", "No existen locales en la BD!", "warning");
            } else {

                $scope.listLocales = response.data;

            }


        }, function errorCallback(response) {

            alert('error al realizar Ingreso');

        });


    }
    $scope.initListarDocentes=function(){

        //inicializar todos los usuarios
        $http({
            method: 'GET',
            url: myProvider.getAllDocentes()+"?estado="+0,
            headers: {
                // 'Content-Type': 'application/json',
                //'Authorization': token
            },

        }).then(function successCallback(response) {
            console.log(response.data);

            if (response.data.length == 0) {

                swal("Advertencia!", "No existen docentes en la BD!", "warning");
            } else {

                $scope.listDocentes = response.data;

            }


        }, function errorCallback(response) {

            alert('error al realizar Ingreso');

        });

        $timeout(function(){

            $('#datatabledocentes').DataTable({
                "language": {
                    "url": "http://cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json"
                }


            });
        }, 500, false);


    }

    $scope.select_facultad=function(id_facultad){
        
        console.log(id_facultad);

        //inicializar todos los usuarios
        if(id_facultad != undefined) {
            console.log(myProvider.getCarreras() + "?id_facultad=" + id_facultad);

            $http({
                method: 'GET',
                url: myProvider.getCarreras() + "?id_facultad=" + id_facultad,
                headers: {
                    // 'Content-Type': 'application/json',
                    //'Authorization': token
                },

            }).then(function successCallback(response) {
                console.log(response.data);

                if (response.data.length == 0) {

                    swal("Advertencia!", "No existen docentes en la BD!", "warning");
                } else {

                    $scope.listCarreras = response.data;

                }


            }, function errorCallback(response) {

                alert('error al realizar Ingreso');

            });

            $timeout(function () {

                $('#datatabledocentes').DataTable({
                    "language": {
                        "url": "http://cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json"
                    }


                });
            }, 500, false);
        }


    }

    $scope.modificarDocente=function(docente){

            window.localStorage["docente"]= JSON.stringify(docente);
            $location.path("/ModificarDocentes");

    }
    $scope.cancelarModificarDocente=function(){

        $location.path("/ListaDocentes");

    }
    $scope.cancelarModificarDocente1=function(){

       

    }

    $('.input-daterange').datepicker({autoclose:true});



    $scope.mostrar=false;
    $scope.mostrar1=false;

    $scope.afiliacion=function () {

        if ($scope.miembro_asociacion=="No"){

            $scope.mostrar1=false;

        }else {


            $scope.mostrar1=true;

        }


    }
    $scope.afiliacionM=function () {

        if ($scope.docente.miembro_asociacion=="No"){

            $scope.mostrarM=false;

        }else {


            $scope.mostrarM=true;

        }


    }



    $scope.cambio=function () {

        if ($scope.id_tipo_contrato=="Nombramiento"){

            $scope.mostrar=false;

        }else {


            $scope.mostrar=true;

        }



    }
    $scope.cambioM=function () {
        console.log($scope.docente.id_tipo_contrato.tipo);

        if ($scope.docente.id_tipo_contrato.tipo=="Nombramiento"){

            $('#fechas_contrato1').hide();

        }else {

            $('#fechas_contrato1').show();
            $scope.docente.valor_cuota = 0;

        }



    }
    
    $scope.registrarDocente=function(){


       console.log($scope.cedula);
        console.log($scope.nombres);
        console.log($scope.apellidos);

        console.log($('#idfecha_naci').val());
        console.log($scope.direccion);
        console.log($scope.telefono);
        console.log($scope.celular);
        console.log($scope.correo_electronico);
        console.log($scope.id_carrera);
        console.log($scope.id_tipo_contrato);
        console.log($scope.pregrado);
        console.log($scope.postgrado);
        console.log($scope.miembro_asociacion);
        console.log($('#idfecha_afiliacion').val());
        console.log( $('#fecha_inicio').val(), $('#fecha_fin').val());


        $http({
            method: 'GET',
            url: myProvider.getParametros()+"?estado="+0,
            headers: {
                // 'Content-Type': 'application/json',
                //'Authorization': token
            },

        }).then(function successCallback(response) {
            console.log(response.data[0]);

            var hoy = new Date();
            var dd = hoy.getDate();
            var mm = hoy.getMonth(); //hoy es 0!
            var yyyy = hoy.getFullYear();

            var fecha_afiliacion = $('#idfecha_afiliacion').val();
            console.log($('#idfecha_afiliacion').val());
            var fecha = fecha_afiliacion.split("-");
            var año = fecha[0];
            var mes = fecha[1];
            var dia = fecha[2];

            console.log(año);
            console.log(mes);
            console.log(dia);

            var cuotas=12-mes+1;
            console.log(mm);
            $scope.valor_cuota=response.data[0].valor/cuotas;
            console.log($scope.valor_cuota);

            $scope.cuotaInicial={
                cuotas:cuotas,
                valor:$scope.valor_cuota

            };


            /////////////funciones para el ingreso de docentes////////////////////

            if ($scope.miembro_asociacion=="Si"){

                if ($scope.id_tipo_contrato=="Nombramiento"){
                    $scope.objeto={

                        tipo:$scope.id_tipo_contrato,
                    }

                    console.log($scope.objeto);

                }else {


                    $scope.objeto={

                        tipo:$scope.id_tipo_contrato,
                        fecha_inicio:$('#fecha_inicio').val(),
                        fecha_fin:$('#fecha_fin').val()

                    }

                    console.log($scope.objeto);


                }

                $http({
                    method: 'POST',
                    url: myProvider.postSaveDocente(),
                    headers: {
                        // 'Content-Type': 'application/json',
                        //'Authorization': token
                    },
                    data: {

                        cedula : $scope.cedula,
                        nombres : $scope.nombres,
                        apellidos : $scope.apellidos,
                        fecha_nacimiento : $('#idfecha_naci').val(),
                        lugar_nacimiento: $scope.lugar_naci,
                        direccion : $scope.direccion,
                        telefono : $scope.telefono,
                        celular : $scope.celular,
                        correo_electronico : $scope.correo_electronico,
                        id_facultad : $scope.id_facultad,
                        id_carrera : $scope.id_carrera,
                        id_tipo_contrato : $scope.objeto,
                        pregrado : $scope.pregrado,
                        postgrado : $scope.postgrado,
                        miembro_asociacion : $scope.miembro_asociacion,
                        fecha_afiliacion : $('#idfecha_afiliacion').val(),
                        estado : 0,
                        valor_cuota : $scope.valor_cuota,
                        tarjeta:$scope.cedula


                    }


                }).then(function successCallback(response) {


                    if (response.data.length == 0) {

                        swal("Error!", "No se ingreso el docente!", "error");
                    } else {

/*
                        console.log(
                            $scope.cuotaInicial,  $scope.listLocales[0], response.data

                        );


                        var hoy = new Date();
                        var dd = "28";
                        var mm = hoy.getMonth()+1; //hoy es 0!
                        var yyyy = hoy.getFullYear();


                        for (var i=0;i<$scope.cuotaInicial.cuotas;i++){



                            var meses = mm+i;

                            if(meses<10) {
                                meses='0'+meses
                            }

                            var fecha = meses+'/'+dd+'/'+yyyy;
                            var fecha1 = meses+'/'+yyyy;

                            console.log(fecha,i,$scope.cuotaInicial.cuotas);
                            console.log(myProvider.postSaveEstado_cuenta());



                            $http({
                                method: 'POST',
                                url: myProvider.postSaveEstado_cuenta(),
                                headers: {
                                    // 'Content-Type': 'application/json',
                                    //'Authorization': token
                                },
                                data: {

                                    id_docente: response.data._id,
                                    id_usuario: response.data._id,
                                    fecha_descuento:fecha,
                                    valor_x_pagar: $scope.cuotaInicial.valor,
                                    valor_pagado:0,
                                    valor_acarreo_mes_anterior:0,
                                    hora:fecha,
                                    frac_fecha:fecha1,
                                    estado:1

                                }


                            }).then(function successCallback(response) {


                                console.log(fecha,i,$scope.cuotaInicial.cuotas);


                                console.log(response.data);
                                console.log($scope.listLocales[0]._id);
                                if (response.data.length == 0) {

                                    swal("Error!", "EL descuento no se ingreso correctamente!", "error");
                                } else {


                                    $http({
                                        method: 'POST',
                                        url: myProvider.postSaveDescuento(),
                                        headers: {
                                            // 'Content-Type': 'application/json',
                                            //'Authorization': token
                                        },
                                        data: {


                                            id_catalogo:$scope.listLocales[0]._id,
                                            id_local:$scope.listLocales[0]._id,
                                            nombre_local:$scope.listLocales[0].nombre,
                                            id_estado_cuenta:response.data._id,
                                            descripcion:"Valor cuota inicial",
                                            valor_descuento:$scope.cuotaInicial.valor,
                                            cantidad:0,
                                            fecha:response.data.frac_fecha


                                        }


                                    }).then(function successCallback(response) {
                                        console.log(response.data);

                                        console.log("creacion correcta todo en uno");
                                        if (response.data.length == 0) {


                                        } else {



                                        }


                                    }, function errorCallback(response) {

                                        alert('error al realizar Ingreso 23423');

                                    });





                                }


                            }, function errorCallback(response) {

                               // alert('error al realizar Ingreso');

                            });



                        }

*/
                        swal("Exito!", "Docente ingresado correctamente!", "success");
                        $scope.cedula = "";
                        $scope.nombres= "";
                        $scope.apellidos = "";
                        $scope.fecha_nacimiento = "";
                        $scope.lugar_naci = "";
                        $scope.direccion = "";
                        $scope.telefono = "";
                        $scope.celular = "";
                        $scope.correo_electronico = "";
                        $scope.id_facultad = "";
                        $scope.id_carrera = "";
                        $scope.id_tipo_contrato= "";
                        $scope.pregrado = "";
                        $scope.postgrado = "";
                        $scope.miembro_asociacion = "";
                        $scope.fecha_afiliacion = "";
                        $scope.valor_cuota= "";

                    }


                }, function errorCallback(response) {

                    alert('error al realizar Ingreso');

                });

            }else {


                if ($scope.id_tipo_contrato=="Nombramiento"){
                    $scope.objeto={

                        tipo:$scope.id_tipo_contrato,
                    }

                    console.log($scope.objeto);

                }else {


                    $scope.objeto={

                        tipo:$scope.id_tipo_contrato,
                        fecha_inicio:$('#fecha_inicio').val(),
                        fecha_fin:$('#fecha_fin').val()

                    }

                    console.log($scope.objeto);


                }

                $http({
                    method: 'POST',
                    url: myProvider.postSaveDocente(),
                    headers: {
                        // 'Content-Type': 'application/json',
                        //'Authorization': token
                    },
                    data: {

                        cedula : $scope.cedula,
                        nombres : $scope.nombres,
                        apellidos : $scope.apellidos,
                        fecha_nacimiento : $('#idfecha_naci').val(),
                        lugar_nacimiento: $scope.lugar_naci,
                        direccion : $scope.direccion,
                        telefono : $scope.telefono,
                        celular : $scope.celular,
                        correo_electronico : $scope.correo_electronico,
                        id_facultad : $scope.id_facultad,
                        id_carrera : $scope.id_carrera,
                        id_tipo_contrato : $scope.objeto,
                        pregrado : $scope.pregrado,
                        postgrado : $scope.postgrado,
                        miembro_asociacion : $scope.miembro_asociacion,
                        fecha_afiliacion : new Date(),
                        estado : 0,
                        valor_cuota : 0



                    }


                }).then(function successCallback(response) {


                    swal("Exito!", "Docente ingresado correctamente!", "success");
                    $scope.cedula = "";
                    $scope.nombres= "";
                    $scope.apellidos = "";
                    $scope.fecha_nacimiento = "";
                    $scope.lugar_naci = "";
                    $scope.direccion = "";
                    $scope.telefono = "";
                    $scope.celular = "";
                    $scope.correo_electronico = "";
                    $scope.id_facultad = "";
                    $scope.id_carrera = "";
                    $scope.id_tipo_contrato= "";
                    $scope.pregrado = "";
                    $scope.postgrado = "";
                    $scope.miembro_asociacion = "";
                    $scope.fecha_afiliacion = "";
                    $scope.valor_cuota= "";


                }, function errorCallback(response) {

                    alert('error al realizar Ingreso');

                });
                
            }


        }, function errorCallback(response) {

            alert('error al realizar Ingreso');

        });











    }

    $scope.initModificarDocentes=function(){

        $scope.docente = JSON.parse(window.localStorage.getItem('docente'));
        console.log($scope.docente);
        $scope.initDocentes();
        var fecha = $scope.docente.fecha_nacimiento.split("T");
        $scope.docente.fecha_nacimiento = fecha[0];

        var fecha1 = $scope.docente.fecha_afiliacion.split("T");
        $scope.docente.fecha_afiliacion = fecha1[0];

        if ($scope.docente.miembro_asociacion=="No"){

            $scope.mostrarM=false;

        }else {


            $scope.mostrarM=true;

        }

        if($scope.docente.id_tipo_contrato.tipo == "Nombramiento")
        {
            $('#fechas_contrato1').hide();
        }

        $http({
            method: 'GET',
            url: myProvider.getFacultades(),
            headers: {
                // 'Content-Type': 'application/json',
                //'Authorization': token
            },

        }).then(function successCallback(response) {
            console.log(response.data);

            if (response.data.length == 0) {

                swal("Advertencia!", "No existen carreras en la BD!", "warning");
            } else {

                $scope.listFacultades = response.data;

            }


        }, function errorCallback(response) {

            alert('error al realizar Ingreso');

        });


        $http({
            method: 'GET',
            url: myProvider.getCarrera_Facultad(),
            headers: {
                // 'Content-Type': 'application/json',
                //'Authorization': token
            },

        }).then(function successCallback(response) {
            console.log(response.data);

            if (response.data.length == 0) {

                swal("Advertencia!", "No existen carreras en la BD!", "warning");
            } else {

                $scope.listCarreras = response.data;

            }


        }, function errorCallback(response) {

            alert('error al realizar Ingreso');

        });



        

    }


    $scope.modiDocente=function(){
        console.log($scope.docente.cedula);
        console.log($scope.docente.lugar_nacimiento);
        console.log($scope.docente.id_facultad);
        console.log($scope.docente.id_carrera);







        $http({
            method: 'GET',
            url: myProvider.getParametros()+"?estado="+0,
            headers: {
                // 'Content-Type': 'application/json',
                //'Authorization': token
            },

        }).then(function successCallback(response) {
            console.log(response.data[0]);

            var hoy = new Date();
            var dd = hoy.getDate();
            var mm = hoy.getMonth(); //hoy es 0!
            var yyyy = hoy.getFullYear();

            if ($scope.docente.miembro_asociacion=="No"){

                $scope.docente.valor_cuota = 0;

            }else {


                var fecha_afiliacion = $('#idfecha_afiliacion').val();
                console.log($('#idfecha_afiliacion').val());
                var fecha = fecha_afiliacion.split("-");
                var año = fecha[0];
                var mes = fecha[1];
                var dia = fecha[2];

                console.log(año);
                console.log(mes);
                console.log(dia);

                var cuotas=12-mes+1;
                $scope.docente.valor_cuota=response.data[0].valor/cuotas;
                console.log($scope.docente.valor_cuota);

                $scope.cuotaInicial={
                    cuotas:cuotas,
                    valor:$scope.docente.valor_cuota

                };


            }







            ////////////ingreso//////////////////////////////

            $http({
                method: 'PUT',
                url: myProvider.putUpdateDocente()+"/"+$scope.docente._id,
                headers: {
                    // 'Content-Type': 'application/json',
                    //'Authorization': token
                },
                data: {

                    cedula : $scope.docente.cedula,
                    nombres : $scope.docente.nombres,
                    apellidos : $scope.docente.apellidos,
                    fecha_nacimiento : $('#idfecha_naci').val(),
                    lugar_nacimiento: $scope.docente.lugar_nacimiento,
                    direccion : $scope.docente.direccion,
                    telefono : $scope.docente.telefono,
                    celular : $scope.docente.celular,
                    correo_electronico : $scope.docente.correo_electronico,
                    id_facultad : $scope.docente.id_facultad,
                    id_carrera : $scope.docente.id_carrera,
                    id_tipo_contrato : $scope.docente.id_tipo_contrato,
                    pregrado : $scope.docente.pregrado,
                    postgrado : $scope.docente.postgrado,
                    miembro_asociacion : $scope.docente.miembro_asociacion,
                    fecha_afiliacion : $('#idfecha_afiliacion').val(),
                    valor_cuota : $scope.docente.valor_cuota



                }


            }).then(function successCallback(response) {
                console.log(response.data);

                if (response.data.length == 0) {

                    swal("Error!", "No se modifico el docente!", "error");
                } else {


                    swal("Exito!", "El docente se modifico correctamente!", "success");

                }


            }, function errorCallback(response) {

                alert('error al realizar Ingreso');

            });

        }, function errorCallback(response) {

            alert('error al realizar Ingreso');

        });


        }


    $scope.eliminarDocente=function(docente){


        swal({
                title: "Eliminar Docente",
                text: "Estas seguro que quieres eliminar el docente?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Si, estoy de acuerdo!",
                cancelButtonText: "No, cancel!",
                closeOnConfirm: false,
                closeOnCancel: true,
            },
            function(isConfirm){
                if (isConfirm) {

                    $http({
                        method: 'PUT',
                        url: myProvider.putUpdateDocente()+"/"+docente._id,
                        headers: {
                            // 'Content-Type': 'application/json',
                            //'Authorization': token
                        },
                        data: {

                            estado:"1"



                        }


                    }).then(function successCallback(response) {
                        console.log(response.data);

                        if (response.data.length == 0) {

                            swal("Error!", "No se elimino el docente!", "error");
                        } else {
                            swal("Exito!", "El docente se elimino!", "success");
                            $scope.initListarDocentes();

                        }


                    }, function errorCallback(response) {

                        alert('error al realizar Ingreso');

                    });


                } else {


                }
            });






    }


    $scope.seleccionarDocentexLocalES=function(docente){

        window.localStorage["docente"]= JSON.stringify(docente);
        console.log(docente);
        $scope.nombre_docente = docente.nombres+" "+ docente.apellidos;

$scope.docenteEstado=docente;


        
    }

    $scope.estados=[

        {
            id:"0",
            nombre:"Con Credito"
        },
        {
            id:"1",
            nombre:"Sin Credito"
        },
        {
            id:"2",
            nombre:"Fuera de la Asociacion"
        }


    ];

    $scope.initListarDocentesEstado=function(){

        //inicializar todos los usuarios
        $http({
            method: 'GET',
            url: myProvider.getAllDocentes(),
            headers: {
                // 'Content-Type': 'application/json',
                //'Authorization': token
            },

        }).then(function successCallback(response) {
            console.log(response.data);

            if (response.data.length == 0) {

                swal("Advertencia!", "No existen docentes en la BD!", "warning");
            } else {

                $scope.listDocentes = response.data;

            }


        }, function errorCallback(response) {

            alert('error al realizar Ingreso');

        });

        $timeout(function(){

            $('#datatabledocentes').DataTable({
                "language": {
                    "url": "http://cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json"
                }


            });
        }, 500, false);


    }





    $scope.registrarEstado=function(){

console.log(
        $scope.docenteEstado._id,
        $scope.docenteEstado.estado
);

        $http({
            method: 'PUT',
            url: myProvider.putUpdateDocente()+"/"+$scope.docenteEstado._id,
            headers: {
                // 'Content-Type': 'application/json',
                //'Authorization': token
            },
            data: {


                estado :   $scope.docenteEstado.estado



            }


        }).then(function successCallback(response) {
            console.log(response.data);




        }, function errorCallback(response) {

            alert('error al realizar Ingreso');

        });




    }


    $scope.initModificarDocentesVer=function(){

        $scope.docente1 = JSON.parse(window.localStorage.getItem('docenteConsultas'));

        $http({
            method: 'GET',
            url: myProvider.getAllDocentes()+"?cedula="+$scope.docente1[0].cedula,
            headers: {
                // 'Content-Type': 'application/json',
                //'Authorization': token
            },

        }).then(function successCallback(response) {
            console.log(response.data);

            if (response.data.length == 0) {

                swal("Advertencia!", "No existe el docentes en la BD!", "warning");
            } else {


                $scope.docente = response.data[0];
                console.log($scope.docente);

                if($scope.docente.id_tipo_contrato.tipo == "Nombramiento")
                {
                    $('#fechas_contrato').hide();
                }

                console.log($scope.docente);
                $scope.initDocentes();
                var fecha = $scope.docente.fecha_nacimiento.split("T");
                $scope.docente.fecha_nacimiento = fecha[0];

                var fecha1 = $scope.docente.fecha_afiliacion.split("T");
                $scope.docente.fecha_afiliacion = fecha1[0];

                $http({
                    method: 'GET',
                    url: myProvider.getFacultades(),
                    headers: {
                        // 'Content-Type': 'application/json',
                        //'Authorization': token
                    },

                }).then(function successCallback(response) {
                    console.log(response.data);

                    if (response.data.length == 0) {

                        swal("Advertencia!", "No existen carreras en la BD!", "warning");
                    } else {

                        $scope.listFacultades = response.data;

                    }


                }, function errorCallback(response) {

                    alert('error al realizar Ingreso');

                });


                $http({
                    method: 'GET',
                    url: myProvider.getCarrera_Facultad(),
                    headers: {
                        // 'Content-Type': 'application/json',
                        //'Authorization': token
                    },

                }).then(function successCallback(response) {
                    console.log(response.data);

                    if (response.data.length == 0) {

                        swal("Advertencia!", "No existen carreras en la BD!", "warning");
                    } else {

                        $scope.listCarreras = response.data;

                    }


                }, function errorCallback(response) {

                    alert('error al realizar Ingreso');

                });





            }


        }, function errorCallback(response) {

            alert('error al realizar Ingreso');

        });












    }


}]);
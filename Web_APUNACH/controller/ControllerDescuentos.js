app.controller('descuentosController', ['$scope', '$http', '$location','myProvider','$localStorage','$timeout',  function ($scope,$http,$location,myProvider,$localStorage,$timeout) {

    $('#idfechaacuerdo').datepicker({
        autoclose: true,
        changeMonth: true,
        changeYear: true,
        format: 'yyyy-mm-dd', //Se especifica como deseamos representarla
        firstDay: 1

    });

    $scope.initListarLocal_Des=function(){
        console.log("que hay");

        //inicializar todos los usuarios
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

        $timeout(function(){

            $('#tablelocal').DataTable({
                "language": {
                    "url": "http://cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json"
                }


            });
        }, 500, false);


    }

    $scope.initListarDocentes_Des=function(){

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

    $scope.initListarTipoDescuento_Des=function(){

        //inicializar todos los usuarios
        $http({
            method: 'GET',
            url: myProvider.getTipoDescuento()+"?estado="+0,
            headers: {
                // 'Content-Type': 'application/json',
                //'Authorization': token
            },

        }).then(function successCallback(response) {
            console.log(response.data);

            if (response.data.length == 0) {

                swal("Advertencia!", "No existen tipo descuentos en la BD!", "warning");
            } else {

                $scope.listTipoDescuento = response.data;

            }


        }, function errorCallback(response) {

            alert('error al realizar Ingreso');

        });

        $timeout(function(){

            $('#datatabledes').DataTable({
                "language": {
                    "url": "http://cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json"
                }


            });
        }, 500, false);


    }

    $scope.initListarDescuentos=function(){

        $http({
            method: 'GET',
            url: myProvider.getEstadoCuenta_Docente(),
            headers: {
                // 'Content-Type': 'application/json',
                //'Authorization': token
            },

        }).then(function successCallback(response) {
            console.log(response.data);

            if (response.data.length == 0) {

                swal("Advertencia!", "No existen usuarios en la BD!", "warning");
                $scope.listEstado_Docente = response.data;
            } else {

                $scope.listEstado_Docente = response.data;

            }


        }, function errorCallback(response) {

            alert('error al realizar Ingreso');

        });

        $timeout(function(){

            $('#datatableuser').DataTable({
                "language": {
                    "url": "http://cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json"
                }


            });
        }, 500, false);

    }

    $scope.listSeleccion = [];
    $scope.listAceptado = [];
    $scope.total = 0;
    $scope.objenew ={};

    $scope.Selecion_multi=function(x){
        $scope.localingresar = JSON.parse(window.localStorage.getItem('local'));
        $scope.docenteingresar = JSON.parse(window.localStorage.getItem('destallesdescuento'));



        $scope.objenew ={
            id_local:$scope.localingresar._id,
            nombre_local: $scope.localingresar.nombre,
            id_catalogo : x._id,
            descripcion : x.descripcion,
            valor_descuento: x.valor,
            nombre_docente:$scope.nombre_docente,
            id_docente:$scope.docenteingresar.R[0]._id

        };
        console.log($scope.objenew);
        $scope.listSeleccion.push($scope.objenew);





    }
    $scope.agreg_new=function(){

        var fecha = new Date();
        console.log(fecha);
        $scope.total =0;
        $scope.localingresar = JSON.parse(window.localStorage.getItem('local'));
        $scope.docenteingresar = JSON.parse(window.localStorage.getItem('destallesdescuento'));


        $scope.objenew ={
            id_local:$scope.localingresar._id,
            nombre_local: $scope.localingresar.nombre,
            id_catalogo : $scope.localingresar._id,
            descripcion : $scope.nombre_descuento_new,
            valor_descuento: $scope.valor_descuento_new,
            nombre_docente:$scope.nombre_docente,
            id_docente:$scope.docenteingresar.R[0]._id
        };
        console.log($scope.objenew);
        $scope.listAceptado.push($scope.objenew);
        for (var i=0; i < $scope.listAceptado.length;i++)
        {

            $scope.total = $scope.total + $scope.listAceptado[i].valor_descuento;

        }
        console.log( $scope.listdescuentosBorrar);
        console.log($scope.listAceptado);

    }

        $scope.AceptarLista=function(){
        console.log($scope.listSeleccion);


        for (var i=0; i < $scope.listSeleccion.length;i++)
        {

            $scope.listAceptado.push($scope.listSeleccion[i]);
            $scope.total = $scope.total + $scope.listSeleccion[i].valor_descuento;

        }
            console.log( $scope.listdescuentosBorrar);

            console.log($scope.listAceptado);
        $scope.listSeleccion = [];
        $scope.initListarTipoDescuento_Des();

    }

    $scope.eliminarDescuentolist=function(x){
        console.log(x.descripcion);

        for (var i = 0; i < $scope.listAceptado.length; i++) {

            if ((x.descripcion== $scope.listAceptado[i].descripcion)&& (x.nombre_local== $scope.listAceptado[i].nombre_local)) {
                $scope.total = $scope.total - $scope.listAceptado[i].valor_descuento;
                console.log($scope.total);

                $scope.listAceptado.splice(i, 1);



            }
        }




    }

    $scope.AceptarDescuentos=function(){
        $scope.localingresar = JSON.parse(window.localStorage.getItem('local'));
        $scope.docenteingresar = JSON.parse(window.localStorage.getItem('docente'));


        $http({
            method: 'POST',
            url: myProvider.postSaveEstado_cuenta(),
            headers: {
                // 'Content-Type': 'application/json',
                //'Authorization': token
            },
            data: {

                id_docente: $scope.docenteingresar._id,
                id_usuario: $scope.docenteingresar._id,
                fecha_descuento:new Date(),
                valor_x_pagar: $scope.total,
                valor_pagado:100,
                valor_acarreo_mes_anterior:10,
                hora:new Date(),
                estado:1



            }


        }).then(function successCallback(response) {

            console.log(response.data);
            if (response.data.length == 0) {

                swal("Error!", "EL descuento no se ingreso correctamente!", "error");
            } else {

                swal("Exito!", "El descuento se ingreso correctamente!", "success");
                for (var i = 0; i<$scope.listAceptado.length;i++)
                {

                    $http({
                        method: 'POST',
                        url: myProvider.postSaveDescuento(),
                        headers: {
                            // 'Content-Type': 'application/json',
                            //'Authorization': token
                        },
                        data: {

                            id_catalogo:$scope.listAceptado[i].id_catalogo,
                            id_local:$scope.listAceptado[i].id_local,
                            nombre_local:$scope.listAceptado[i].nombre_local,
                            id_estado_cuenta:response.data._id,
                            descripcion:$scope.listAceptado[i].descripcion,
                            valor_descuento:$scope.listAceptado[i].valor_descuento,
                            cantidad:0


                        }


                    }).then(function successCallback(response) {
                        console.log(response.data);

                        if (response.data.length == 0) {


                        } else {



                        }


                    }, function errorCallback(response) {

                        alert('error al realizar Ingreso');

                    });



                }


            }


        }, function errorCallback(response) {

            alert('error al realizar Ingreso');

        });


    }
    $scope.listaaa = [];

    $scope.AceptarDescuentosxLocal=function(){
        $scope.localingresar = JSON.parse(window.localStorage.getItem('local'));
        var bandera = false;
        var fecha = new Date();
        var año = fecha.getFullYear();
        var mes = fecha.getMonth() + 1;
        var fecha_init = new Date(año + '-' + mes + '-1');
        var fecha_fin = new Date(año + '-' + mes + '-31');
        console.log(fecha_init);
        console.log(fecha_fin);

        var n = $scope.listAceptado.length;
        var aux1=n;
        var b=0;



        for(var i=0;i<n;i++) {



            $http({
                method: 'GET',
                url: myProvider.getEstadoCuentaxLocal() + "?id_docente=" + $scope.listAceptado[i].id_docente,
                headers: {
                    // 'Content-Type': 'application/json',
                    //'Authorization': token
                },
                data: {}


            }).then(function successCallback(response) {

                $scope.listEstado_cuenta_consulta = response.data;
                console.log(response.data);
                $scope.listaaa.push(response.data);


                if (i == n) {
                    console.log(b);
                    aux1=aux1-1;
                    console.log(aux1);
                    if (aux1==0){
                        console.log(aux1);
                        console.log(b);
                        console.log($scope.listAceptado[b]);

                        $http({
                            method: 'POST',
                            url: myProvider.postSaveDescuento(),
                            headers: {
                                // 'Content-Type': 'application/json',
                                //'Authorization': token
                            },
                            data: {

                                id_catalogo:$scope.listAceptado[b].id_catalogo,
                                id_local:$scope.listAceptado[b].id_local,
                                nombre_local:$scope.listAceptado[b].nombre_local,
                                id_estado_cuenta:response.data[0]._id,
                                descripcion:$scope.listAceptado[b].descripcion,
                                valor_descuento:$scope.listAceptado[b].valor_descuento,
                                cantidad:0


                            }


                        }).then(function successCallback(response) {
                            console.log(response.data);

                            if (response.data.length == 0) {


                            } else {

                                var total = $scope.listEstado_cuenta_consulta[0].valor_x_pagar + response.data.valor_descuento;
                                $http({

                                    method: 'PUT',
                                    url: myProvider.putEstado_cuenta()+"/"+$scope.listEstado_cuenta_consulta[0]._id,
                                    headers: {
                                        // 'Content-Type': 'application/json',
                                        //'Authorization': token
                                    },
                                    data: {


                                        //id_usuario: $scope.docenteingresar._id, IMPORTANTE INGRESAR
                                        fecha_descuento:new Date(),
                                        valor_x_pagar: total,
                                        valor_pagado:100,
                                        valor_acarreo_mes_anterior:10,
                                        hora:new Date(),
                                        estado:1



                                    }


                                }).then(function successCallback(response) {

                                    console.log(response.data);

                                }, function errorCallback(response) {

                                    alert('error al realizar Ingreso');

                                });




                            }


                        }, function errorCallback(response) {

                            alert('error al realizar Ingreso');

                        });
                        
                        
                        
                        
                        
                        
                        
                        
                        b++;

                    }
                    else {
                        console.log(aux1);
                        console.log(b);
                        //siempre empieza aqui
                        console.log($scope.listAceptado[b]);

                        $http({
                            method: 'POST',
                            url: myProvider.postSaveDescuento(),
                            headers: {
                                // 'Content-Type': 'application/json',
                                //'Authorization': token
                            },
                            data: {

                                id_catalogo:$scope.listAceptado[b].id_catalogo,
                                id_local:$scope.listAceptado[b].id_local,
                                nombre_local:$scope.listAceptado[b].nombre_local,
                                id_estado_cuenta:response.data[0]._id,
                                descripcion:$scope.listAceptado[b].descripcion,
                                valor_descuento:$scope.listAceptado[b].valor_descuento,
                                cantidad:0


                            }


                        }).then(function successCallback(response) {
                            console.log(response.data);

                            if (response.data.length == 0) {



                            } else {
                                var total = $scope.listEstado_cuenta_consulta[0].valor_x_pagar + response.data.valor_descuento;
                                $http({

                                    method: 'PUT',
                                    url: myProvider.putEstado_cuenta()+"/"+$scope.listEstado_cuenta_consulta[0]._id,
                                    headers: {
                                        // 'Content-Type': 'application/json',
                                        //'Authorization': token
                                    },
                                    data: {


                                        //id_usuario: $scope.docenteingresar._id, IMPORTANTE INGRESAR
                                        fecha_descuento:new Date(),
                                        valor_x_pagar: total,
                                        valor_pagado:100,
                                        valor_acarreo_mes_anterior:10,
                                        hora:new Date(),
                                        estado:1



                                    }


                                }).then(function successCallback(response) {

                                    console.log(response.data);

                                }, function errorCallback(response) {

                                    alert('error al realizar Ingreso');

                                });


                            }





                        }, function errorCallback(response) {

                            alert('error al realizar Ingreso');

                        });

                        b++;
                    }

                }




            }, function errorCallback(response) {

                alert('error al realizar Ingreso');

            });

        }
        console.log($scope.listaaa);



















    }

    $scope.listdescuentosBorrar=[];
    $scope.initModificarDescuento=function(){

    console.clear();
        $scope.destallesdescuento = JSON.parse(window.localStorage.getItem('destallesdescuento'));
        console.log($scope.destallesdescuento);
        $http({
            method: 'GET',
            url: myProvider.getAllDescuentos()+"?id_estado_cuenta="+$scope.destallesdescuento._id,
            headers: {
                // 'Content-Type': 'application/json',
                //'Authorization': token
            },

        }).then(function successCallback(response) {
            console.log(response.data);

            if (response.data.length == 0) {

                swal("Advertencia!", "No existen descuentos en la BD!", "warning");
            } else {

                window.localStorage["listdescuentosBorrar"]= JSON.stringify(response.data);
                $scope.listAceptado = response.data;
                for (var i=0; i < $scope.listAceptado.length;i++)
                {

                    $scope.total = $scope.total + $scope.listAceptado[i].valor_descuento;

                }

            }


        }, function errorCallback(response) {

            alert('error al realizar Ingreso');

        });


    }

    $scope.seleccionarLocal=function(local){

        window.localStorage["local"]= JSON.stringify(local);
        console.log(local);
        $scope.nombre_local = local.nombre;


    }
    $scope.seleccionarDocentexLocal=function(docente){

        window.localStorage["docente"]= JSON.stringify(docente);
        console.log(docente);
        $scope.nombre_docente = docente.nombres+" "+ docente.apellidos;


    }
    $scope.buscar=function(docente) {
        var bandera = false;
        var fecha = new Date();
        console.log(fecha);
        var año = fecha.getFullYear();
        var mes = fecha.getMonth() + 1;
        var fecha_init = new Date(año + '-' + mes + '-1');
        var fecha_fin = new Date(año + '-' + mes + '-31');
        console.log(fecha_init);
        console.log(fecha_fin);


        if($scope.listEstado_Docente.length != undefined)
        {
            for (var i = 0; i < $scope.listEstado_Docente.length; i++) {

                var fecha1 = $scope.listEstado_Docente[i].fecha_descuento.split("T");
                var fecha2 = fecha1[0];
                var fecha_desc = new Date(fecha2);
                console.log(fecha_desc);

                if ((docente._id == $scope.listEstado_Docente[i].id_docente) && (fecha_init <= fecha_desc <= fecha_fin)) {

                    bandera = true;
                }

            }
        }


        return (bandera);
    }
    $scope.seleccionarDocente=function(docente){


        if($scope.buscar(docente))
        {
            alert ("el descuento ya se encuetra ingresado para el mes actual, escoja ver detalle del decuento")
        }
        else {
            window.localStorage["docente"]= JSON.stringify(docente);
            console.log(docente);
            $scope.nombre_docente = docente.nombres +" "+docente.apellidos;
            $location.path("/IngresarDescuento");



        }



    }
    $scope.seleccionarLocalIngreso=function(local){



            window.localStorage["local"]= JSON.stringify(local);
            console.log(local);
            $scope.nombre_local = local.nombre;
            $location.path("/IngresarDescuentoxLocal");




    }
    $scope.initIngresoDescuento=function(){

        $scope.docenteingresar = JSON.parse(window.localStorage.getItem('docente'));
        $scope.nombre_docente = $scope.docenteingresar.nombres +" "+$scope.docenteingresar.apellidos;

    }
    $scope.initIngresoDescuentoxLocal=function(){

        $scope.localingresar = JSON.parse(window.localStorage.getItem('local'));
        $scope.nombre_local = $scope.localingresar.nombre;



    }

    $scope.modificarDescuento=function(destallesdescuento){

        window.localStorage["destallesdescuento"]= JSON.stringify(destallesdescuento);
        $location.path("/ModificarDescuento");

    }


    $scope.modiDescuento=function(){

        $scope.localingresar = JSON.parse(window.localStorage.getItem('local'));
        $scope.destallesdescuento = JSON.parse(window.localStorage.getItem('destallesdescuento'));
        $scope.listdescuentosBorrar = JSON.parse(window.localStorage.getItem('listdescuentosBorrar'));

        ///Ingreso descuentos de la tabla descuentosborrados
        console.log($scope.listdescuentosBorrar);

        for (var i = 0; i<$scope.listdescuentosBorrar.length;i++) {
            console.log($scope.listdescuentosBorrar[i]);

            $http({
                method: 'POST',
                url: myProvider.postSaveDescuentoBorrar(),
                headers: {
                    // 'Content-Type': 'application/json',
                    //'Authorization': token
                },
                data: {

                    id_catalogo: $scope.listdescuentosBorrar[i].id_catalogo,
                    id_local: $scope.listdescuentosBorrar[i].id_local,
                    nombre_local: $scope.listdescuentosBorrar[i].nombre_local,
                    id_estado_cuenta: $scope.destallesdescuento._id,
                    descripcion: $scope.listdescuentosBorrar[i].descripcion,
                    valor_descuento: $scope.listdescuentosBorrar[i].valor_descuento,
                    cantidad: 0


                }


            }).then(function successCallback(response) {
                console.log(response.data);

                if (response.data.length == 0) {


                } else {


                }


            }, function errorCallback(response) {

                alert('error al realizar Ingreso');

            });
        }


///borrado descuentos de la tabla descuentos

        console.log($scope.listdescuentosBorrar);

        for (var i = 0; i<$scope.listdescuentosBorrar.length;i++)
        {

            $http({
                method: 'DELETE',
                url: myProvider.deleteDescuento()+"/"+$scope.listdescuentosBorrar[i]._id,
                headers: {
                    // 'Content-Type': 'application/json',
                    //'Authorization': token
                },
                data: {

                }


            }).then(function successCallback(response) {
                console.log(response.data);

            }, function errorCallback(response) {

                alert('error al realizar Ingreso');

            });



        }


     //modificar estado_cuenta y agregar nuevos descuentos



        $http({

            method: 'PUT',
            url: myProvider.putEstado_cuenta()+"/"+$scope.destallesdescuento._id,
            headers: {
                // 'Content-Type': 'application/json',
                //'Authorization': token
            },
            data: {


                //id_usuario: $scope.docenteingresar._id, IMPORTANTE INGRESAR
                fecha_descuento:new Date(),
                valor_x_pagar: $scope.total,
                valor_pagado:100,
                valor_acarreo_mes_anterior:10,
                hora:new Date(),
                estado:1



            }


        }).then(function successCallback(response) {

            console.log(response.data);
            if (response.data.length == 0) {

                swal("Error!", "EL descuento no se ingreso correctamente!", "error");
            } else {

                swal("Exito!", "El descuento se ingreso correctamente!", "success");
                for (var i = 0; i<$scope.listAceptado.length;i++)
                {

                    $http({
                        method: 'POST',
                        url: myProvider.postSaveDescuento(),
                        headers: {
                            // 'Content-Type': 'application/json',
                            //'Authorization': token
                        },
                        data: {

                            id_catalogo:$scope.listAceptado[i].id_catalogo,
                            id_local:$scope.listAceptado[i].id_local,
                            nombre_local:$scope.listAceptado[i].nombre_local,
                            id_estado_cuenta:response.data._id,
                            descripcion:$scope.listAceptado[i].descripcion,
                            valor_descuento:$scope.listAceptado[i].valor_descuento,
                            cantidad:0


                        }


                    }).then(function successCallback(response) {
                        console.log(response.data);

                        if (response.data.length == 0) {


                        } else {



                        }


                    }, function errorCallback(response) {

                        alert('error al realizar Ingreso');

                    });



                }


            }


        }, function errorCallback(response) {

            alert('error al realizar Ingreso');

        });



    }

    $scope.cancelarIngresarDescuento=function(){
        console.log("hey");

        $location.path("/Descuentos");

    }
    $scope.newDescuento=function(){

        $location.path("/IngresarDescuento");

    }

    $scope.eliminarLocal=function(local){


        swal({
                title: "Eliminar Local",
                text: "Estas seguro que quieres eliminar el local?",
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
                        url: myProvider.putLocal()+"/"+local._id,
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

                            swal("Error!", "No se modifico el local!", "error");
                        } else {
                            swal("Exito!", "El local se modifico!", "success");
                            $scope.initListarLocal();

                        }


                    }, function errorCallback(response) {

                        alert('error al realizar Ingreso');

                    });


                } else {


                }
            });




    }

    //-------------------------------------------Prestamos Emergentes

    $scope.AceptarCreditoEmergente=function(){

        $scope.docenteingresar = JSON.parse(window.localStorage.getItem('docente'));
        var pago = $scope.valor_pres / $scope.val_cuotas;
        console.log(pago);


        $http({
            method: 'POST',
            url: myProvider.postSaveCredito_Emergente(),
            headers: {
                // 'Content-Type': 'application/json',
                //'Authorization': token
            },
            data: {

                valor:$scope.valor_pres,
                fecha_maxima_pago:new Date(),
                numero_cuotas:$scope.val_cuotas,
                usuario: $scope.docenteingresar._id,
                id_docente:$scope.docenteingresar._id,
                valor_a_pagar:pago,
                nombre_docente:$scope.docenteingresar.nombres +" "+ $scope.docenteingresar.apellidos,
                ci_docente:$scope.docenteingresar.cedula

            }


        }).then(function successCallback(response) {

            console.log(response.data);
            if (response.data.length == 0) {

                swal("Error!", "No se pudo registrar el credito, intentelo nuevamente!", "error");
            } else {

                swal("Exito!", "El credito emergente se registro correctamente!", "success");

                var fecha = new Date();
                var año = fecha.getFullYear();
                var mes = fecha.getMonth() + 1;
                var dia = fecha.getDate();
                var fecha_init = new Date(año + '-' + mes + '-'+dia);
                var fecha_max = new Date(fecha_init);

                for(var i=1;i<=$scope.val_cuotas;i++) {

                    $http({
                        method: 'POST',
                        url: myProvider.postSaveCuotas_credito(),
                        headers: {
                            // 'Content-Type': 'application/json',
                            //'Authorization': token
                        },
                        data: {

                            id_credito: response.data._id,
                            numero_cuotas: i,
                            valor_credito: pago,
                            fecha_max_pago: fecha_max,
                            fecha_pago: new Date(),
                            id_user: $scope.docenteingresar._id,
                            estado:"pendiente"

                        }


                    }).then(function successCallback(response) {

                        console.log(response.data);
                        if (response.data.length == 0) {

                            swal("Error!", "No se pudo registrar el credito, intentelo nuevamente!", "error");
                        } else {

                            swal("Exito!", "El credito emergente se registro correctamente!", "success");

                            var año = fecha_max.getFullYear();
                            var mes = fecha_max.getMonth() + 1;
                            var dia = fecha_max.getDate();
                            var fecha_init = new Date(año + '-' + mes + '-'+dia);
                            console.log(fecha_init);
                            var fecha_max = new Date(fecha_init);
                            console.log(fecha_max);


                        }


                    }, function errorCallback(response) {

                        alert('error al realizar Ingreso');

                    });


                }


            }


        }, function errorCallback(response) {

            alert('error al realizar Ingreso');

        });


    }

    $scope.initListarCreditosEmergentes=function(){
        console.log("que hay");

        //inicializar todos los usuarios
        $http({
            method: 'GET',
            url: myProvider.getAllCreditosEmergentes(),
            headers: {
                // 'Content-Type': 'application/json',
                //'Authorization': token
            },

        }).then(function successCallback(response) {
            console.log(response.data);

            if (response.data.length == 0) {

                swal("Advertencia!", "No existen locales en la BD!", "warning");
            } else {

                $scope.listCreditosEmegentes = response.data;

            }


        }, function errorCallback(response) {

            alert('error al realizar Ingreso');

        });

        $timeout(function(){

            $('#tableCreditos').DataTable({
                "language": {
                    "url": "http://cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json"
                }


            });
        }, 500, false);


    }


}]);
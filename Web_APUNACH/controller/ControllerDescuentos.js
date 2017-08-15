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
    $scope.Selecion_multi=function(x){
        console.log(x);

        $scope.listSeleccion.push(x);

    }
        $scope.AceptarLista=function(){
        console.log($scope.listSeleccion);


        for (var i=0; i < $scope.listSeleccion.length;i++)
        {

            $scope.listAceptado.push($scope.listSeleccion[i]);
            $scope.total = $scope.total + $scope.listSeleccion[i].valor;

        }
        $scope.listSeleccion = [];
        $scope.initListarTipoDescuento_Des();

    }
    $scope.eliminarDescuentolist=function(x){
        console.log(x._id);

        for (var i = 0; i < $scope.listAceptado.length; i++) {

            if (x._id == $scope.listAceptado[i]._id) {
                $scope.total = $scope.total - $scope.listAceptado[i].valor;
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

                            id_catalogo:$scope.listAceptado[i]._id,
                            id_local:$scope.localingresar,
                            id_estado_cuenta:response.data._id,
                            valor_descuento:$scope.listAceptado[i].valor,
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

    $scope.initModificarLocales=function(){

        $scope.local = JSON.parse(window.localStorage.getItem('local'));
        console.log($scope.local);



    }

    $scope.seleccionarLocal=function(local){

        window.localStorage["local"]= JSON.stringify(local);
        console.log(local);
        $scope.nombre_local = local.nombre;
        $location.path("/IngresarDescuento");

    }
    $scope.seleccionarDocente=function(docente){

        window.localStorage["docente"]= JSON.stringify(docente);
        console.log(docente);
        $scope.nombre_docente = docente.nombres +" "+docente.apellidos;
        $location.path("/IngresarDescuento");

    }


    $scope.modiLocales=function(){


            $http({
                method: 'PUT',
                url: myProvider.putLocal()+"/"+$scope.local._id,
                headers: {
                    // 'Content-Type': 'application/json',
                    //'Authorization': token
                },
                data: {

                    nombre: $scope.local.nombre,
                    ruc: $scope.local.ruc,
                    direccion:$scope.local.direccion,
                    credito_max: $scope.local.creditomax,
                    fecha_inicio_acuerdo:$scope.locfecha_acuerdo,
                    telefono:$scope.local.telefono,
                    porcentaje_ganancia:$scope.local.porcentage



                }


            }).then(function successCallback(response) {
                console.log(response.data);

                if (response.data.length == 0) {

                    swal("Error!", "No se modifico el local!", "error");
                } else {

                    swal("Exito!", "Local ingresado correctamente!", "success");
                    $location.path("/ListaLocales");



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


}]);
app.controller('localesController', ['$scope', '$http', '$location','myProvider','$localStorage','$timeout',  function ($scope,$http,$location,myProvider,$localStorage,$timeout) {

    $('#idfechaacuerdo').datepicker({
        autoclose: true,
        changeMonth: true,
        changeYear: true,
        format: 'yyyy-mm-dd', //Se especifica como deseamos representarla
        firstDay: 1

    });

    $scope.initListarLocal=function(){

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

    $scope.registrarLocales=function(){

        var fecha_acuerdo = $('#idfechaacuerdo').val();

        
        $http({
            method: 'POST',
            url: myProvider.postSaveLocal(),
            headers: {
                // 'Content-Type': 'application/json',
                //'Authorization': token
            },
            data: {

                nombre: $scope.nombre,
                ruc: $scope.ruc,
                direccion:$scope.direccion,
                credito_max: $scope.creditomax,
                estado:"0",
                fecha_inicio_acuerdo:fecha_acuerdo,
                telefono:$scope.telefono,
                porcentaje_ganancia:$scope.porcentage,
                nombre_contacto:$scope.nombre_contacto,
                cargo:$scope.cargo,
                telefono_contacto:$scope.telefono_contacto,
                correo_contacto:$scope.correo_contacto



            }


        }).then(function successCallback(response) {


            if (response.data.length == 0) {

                swal("Error!", "No se ingreso el usuario!", "error");
            } else {

                swal("Exito!", "Usuario ingresado correctamente!", "success");
                $scope.nombre = "";
                $scope.ruc= "";
                $scope.direccion = "";
                $scope.creditomax = "";
                $scope.fecha_acuerdo = "";
                $scope.telefono = "";
                $scope.porcentage = "";

            }


        }, function errorCallback(response) {

            alert('error al realizar Ingreso');

        });


    }

    $scope.initModificarLocales=function(){

        $scope.local = JSON.parse(window.localStorage.getItem('local'));
        var fecha = $scope.local.fecha_inicio_acuerdo.split("T");
        $scope.local.fecha_inicio_acuerdo = fecha[0];
        console.log($scope.local);



    }

    $scope.modificarLocal=function(local){

        window.localStorage["local"]= JSON.stringify(local);
        $location.path("/ModificarLocales");

    }


    $scope.modiLocales=function(){

        var fecha_acuerdo = $('#idfechaacuerdo').val();
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
                    credito_max: $scope.local.credito_max,
                    fecha_inicio_acuerdo:fecha_acuerdo,
                    telefono:$scope.local.telefono,
                    porcentaje_ganancia:$scope.local.porcentaje_ganancia,
                    nombre_contacto:$scope.local.nombre_contacto,
                    cargo:$scope.local.cargo,
                    telefono_contacto:$scope.local.telefono_contacto,
                    correo_contacto:$scope.local.correo_contacto


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

    $scope.cancelarModificarLocales=function(){
        console.log("hey");

        $location.path("/ListaLocales");

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
app.controller('cuentasController', ['$scope', '$http', '$location','myProvider','$localStorage','$timeout',  function ($scope,$http,$location,myProvider,$localStorage,$timeout) {

    
    $scope.initListarTipoCuentasIngreso=function(){

        //inicializar todos los tipos de cuentas de ingreso
        $http({
            method: 'GET',
            url: myProvider.getTipoCuentasIngreso()+"?estado="+0,
            headers: {
                // 'Content-Type': 'application/json',
                //'Authorization': token
            },

        }).then(function successCallback(response) {
            console.log(response.data);

            if (response.data.length == 0) {

                swal("Advertencia!", "No existen usuarios en la BD!", "warning");
            } else {

                $scope.listTipoCuentasIngreso = response.data;
                
            }


        }, function errorCallback(response) {

            alert('error al realizar Ingreso');

        });

        $timeout(function(){

            $('#tableTipoCuentasIngreso').DataTable({
                "language": {
                    "url": "http://cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json"
                }


            });
        }, 500, false);


    }

    $scope.modificarTipoCunetaIngreso=function(tipocuentaingreso){

            window.localStorage["tipocuentaingreso"]= JSON.stringify(tipocuentaingreso);
            $location.path("/ModificarTipoCuentasIngreso");

    }
    $scope.cancelarTipoCuentaIngreso=function(){

        $location.path("/ListaTipoCuentasIngresos");

    }


    $scope.registrarTipoCuentaIngreso=function(){

            $http({
                method: 'POST',
                url: myProvider.postSaveTipoCuentaIngreso(),
                headers: {
                    // 'Content-Type': 'application/json',
                    //'Authorization': token
                },
                data: {

                   descripcion: $scope.descripcion,
                    estado:0




                }


            }).then(function successCallback(response) {
                console.log(response.data);

                if (response.data.length == 0) {

                    swal("Error!", "No se ingreso La facultad!", "error");
                } else {

                    swal("Exito!", "Facultad ingresado correctamente!", "success");
                    $scope.descripcion="";



                }


            }, function errorCallback(response) {

                alert('error al realizar Ingreso');

            });

    }

    $scope.initModificarTipoCuentasIngreso=function(){

        $scope.tipocuentaingreso = JSON.parse(window.localStorage.getItem('tipocuentaingreso'));
        console.log($scope.facultad);
        

    }

  


    $scope.modiTipoCuentaIngreso=function(){


            $http({
                method: 'PUT',
                url: myProvider.putTipoCuentaIngreso()+"/"+$scope.tipocuentaingreso._id,
                headers: {
                    // 'Content-Type': 'application/json',
                    //'Authorization': token
                },
                data: {

                    descripcion: $scope.tipocuentaingreso.descripcion

                }


            }).then(function successCallback(response) {
                console.log(response.data);

                if (response.data.length == 0) {

                    swal("Error!", "No se pudo modificar el tipo de cuenta!", "error");
                } else {

                    swal("Exito!", "El Tipo de cuenta se a modificado correctamente!", "success");
                    $location.path("/ListaTipoCuentasIngresos");


                }


            }, function errorCallback(response) {

                alert('error al realizar Ingreso');

            });



    }

    $scope.eliminarTipoCunetaIngreso=function(TipoCuentasIngreso){


        swal({
                title: "Eliminar Tipo cuenta de Ingreso",
                text: "Estas seguro que quieres eliminar la cuenta?",
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
                        url: myProvider.putTipoCuentaIngreso()+"/"+TipoCuentasIngreso._id,
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

                            swal("Error!", "No pudo eliminar la facultad!", "error");
                        } else {
                            swal("Exito!", "La facultad se elimino correctamente!", "success");
                            $scope.initListarTipoCuentasIngreso();

                        }


                    }, function errorCallback(response) {

                        alert('error al eliminar el usuario');

                    });


                } else {


                }
            });




    }

    //------------------------------------------------Tipo cuentas Egresos----------------------------------------------



    $scope.initListarTipoCuentasEgreso=function(){

        //inicializar todos los tipos de cuentas de ingreso
        $http({
            method: 'GET',
            url: myProvider.getTipoCuentasEgreso()+"?estado="+0,
            headers: {
                // 'Content-Type': 'application/json',
                //'Authorization': token
            },

        }).then(function successCallback(response) {
            console.log(response.data);

            if (response.data.length == 0) {

                swal("Advertencia!", "No existen usuarios en la BD!", "warning");
            } else {

                $scope.listTipoCuentasEgreso = response.data;

            }


        }, function errorCallback(response) {

            alert('error al realizar Egreso');

        });

        $timeout(function(){

            $('#tableTipoCuentasEgreso').DataTable({
                "language": {
                    "url": "http://cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json"
                }


            });
        }, 500, false);


    }

    $scope.modificarTipoCunetaEgreso=function(tipocuentaegreso){

        window.localStorage["tipocuentaegreso"]= JSON.stringify(tipocuentaegreso);
        $location.path("/ModificarTipoCuentasEgreso");

    }
    $scope.cancelarTipoCuentaEgreso=function(){

        $location.path("/ListaTipoCuentasEgresos");

    }


    $scope.registrarTipoCuentaEgreso=function(){

        $http({
            method: 'POST',
            url: myProvider.postSaveTipoCuentaEgreso(),
            headers: {
                // 'Content-Type': 'application/json',
                //'Authorization': token
            },
            data: {

                descripcion: $scope.descripcion,
                estado:0




            }


        }).then(function successCallback(response) {
            console.log(response.data);

            if (response.data.length == 0) {

                swal("Error!", "No se ingreso La facultad!", "error");
            } else {

                swal("Exito!", "Facultad ingresado correctamente!", "success");
                $scope.descripcion="";



            }


        }, function errorCallback(response) {

            alert('error al realizar Ingreso');

        });

    }

    $scope.initModificarTipoCuentasEgreso=function(){

        $scope.tipocuentaegreso = JSON.parse(window.localStorage.getItem('tipocuentaegreso'));



    }




    $scope.modiTipoCuentaEgreso=function(){


        $http({
            method: 'PUT',
            url: myProvider.putTipoCuentaEgreso()+"/"+$scope.tipocuentaegreso._id,
            headers: {
                // 'Content-Type': 'application/json',
                //'Authorization': token
            },
            data: {

                descripcion: $scope.tipocuentaegreso.descripcion

            }


        }).then(function successCallback(response) {
            console.log(response.data);

            if (response.data.length == 0) {

                swal("Error!", "No se pudo modificar el tipo de cuenta!", "error");
            } else {

                swal("Exito!", "El Tipo de cuenta se a modificado correctamente!", "success");
                $location.path("/ListaTipoCuentasEgresos");


            }


        }, function errorCallback(response) {

            alert('error al realizar Ingreso');

        });



    }

    $scope.eliminarTipoCunetaEgreso=function(TipoCuentasEgreso){


        swal({
                title: "Eliminar Tipo cuenta de Egreso",
                text: "Estas seguro que quieres eliminar la cuenta?",
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
                        url: myProvider.putTipoCuentaEgreso()+"/"+TipoCuentasEgreso._id,
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

                            swal("Error!", "No pudo eliminar el tipo de cuenta de egresos!", "error");
                        } else {
                            swal("Exito!", "El tipo de cuenta de egresos se elimino correctamente!", "success");
                            $scope.initListarTipoCuentasEgreso();

                        }


                    }, function errorCallback(response) {

                        alert('error al eliminar el usuario');

                    });


                } else {


                }
            });
        
    }

    //------------------------------------------------Cuentas Ingresos----------------------------------------------



    $scope.initListarTipoCuentasEgreso=function(){

        //inicializar todos los tipos de cuentas de ingreso
        $http({
            method: 'GET',
            url: myProvider.getTipoCuentasEgreso()+"?estado="+0,
            headers: {
                // 'Content-Type': 'application/json',
                //'Authorization': token
            },

        }).then(function successCallback(response) {
            console.log(response.data);

            if (response.data.length == 0) {

                swal("Advertencia!", "No existen usuarios en la BD!", "warning");
            } else {

                $scope.listTipoCuentasEgreso = response.data;

            }


        }, function errorCallback(response) {

            alert('error al realizar Egreso');

        });

        $timeout(function(){

            $('#tableTipoCuentasEgreso').DataTable({
                "language": {
                    "url": "http://cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json"
                }


            });
        }, 500, false);


    }

    $scope.modificarTipoCunetaEgreso=function(tipocuentaegreso){

        window.localStorage["tipocuentaegreso"]= JSON.stringify(tipocuentaegreso);
        $location.path("/ModificarTipoCuentasEgreso");

    }
    $scope.cancelarTipoCuentaEgreso=function(){

        $location.path("/ListaTipoCuentasEgresos");

    }


    $scope.registrarTipoCuentaEgreso=function(){

        $http({
            method: 'POST',
            url: myProvider.postSaveTipoCuentaEgreso(),
            headers: {
                // 'Content-Type': 'application/json',
                //'Authorization': token
            },
            data: {

                descripcion: $scope.descripcion,
                estado:0




            }


        }).then(function successCallback(response) {
            console.log(response.data);

            if (response.data.length == 0) {

                swal("Error!", "No se ingreso La facultad!", "error");
            } else {

                swal("Exito!", "Facultad ingresado correctamente!", "success");
                $scope.descripcion="";



            }


        }, function errorCallback(response) {

            alert('error al realizar Ingreso');

        });

    }

    $scope.initModificarTipoCuentasEgreso=function(){

        $scope.tipocuentaegreso = JSON.parse(window.localStorage.getItem('tipocuentaegreso'));



    }




    $scope.modiTipoCuentaEgreso=function(){


        $http({
            method: 'PUT',
            url: myProvider.putTipoCuentaEgreso()+"/"+$scope.tipocuentaegreso._id,
            headers: {
                // 'Content-Type': 'application/json',
                //'Authorization': token
            },
            data: {

                descripcion: $scope.tipocuentaegreso.descripcion

            }


        }).then(function successCallback(response) {
            console.log(response.data);

            if (response.data.length == 0) {

                swal("Error!", "No se pudo modificar el tipo de cuenta!", "error");
            } else {

                swal("Exito!", "El Tipo de cuenta se a modificado correctamente!", "success");
                $location.path("/ListaTipoCuentasEgresos");


            }


        }, function errorCallback(response) {

            alert('error al realizar Ingreso');

        });



    }

    $scope.eliminarTipoCunetaEgreso=function(TipoCuentasEgreso){


        swal({
                title: "Eliminar Tipo cuenta de Egreso",
                text: "Estas seguro que quieres eliminar la cuenta?",
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
                        url: myProvider.putTipoCuentaEgreso()+"/"+TipoCuentasEgreso._id,
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

                            swal("Error!", "No pudo eliminar el tipo de cuenta de egresos!", "error");
                        } else {
                            swal("Exito!", "El tipo de cuenta de egresos se elimino correctamente!", "success");
                            $scope.initListarTipoCuentasEgreso();

                        }


                    }, function errorCallback(response) {

                        alert('error al eliminar el usuario');

                    });


                } else {


                }
            });

    }
    

}]);
app.controller('parametrosController', ['$scope', '$http', '$location','myProvider','$localStorage','$timeout',  function ($scope,$http,$location,myProvider,$localStorage,$timeout) {

    
    $scope.initListarParametros=function(){

        //inicializar todos los usuarios
        $http({
            method: 'GET',
            url: myProvider.getParametros()+"?estado="+0,
            headers: {
                // 'Content-Type': 'application/json',
                //'Authorization': token
            },

        }).then(function successCallback(response) {
            console.log(response.data);

            if (response.data.length == 0) {

                swal("Advertencia!", "No existen parametros en la BD!", "warning");
            } else {

                $scope.listParametros = response.data;
                
            }


        }, function errorCallback(response) {

            alert('error al realizar Ingreso');

        });

        $timeout(function(){

            $('#tableparametros').DataTable({
                "language": {
                    "url": "http://cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json"
                }


            });
        }, 500, false);


    }

    $scope.modificarParametros=function(parametros){

            window.localStorage["parametros"]= JSON.stringify(parametros);
            $location.path("/ModificarParametros");

    }
    $scope.cancelarModificarParametro=function(){

        $location.path("/ListaParametros");

    }


    $scope.registrarParametros=function(){

            $http({
                method: 'POST',
                url: myProvider.postSaveParametros(),
                headers: {
                    // 'Content-Type': 'application/json',
                    //'Authorization': token
                },
                data: {

                    descripcion: $scope.descripcion,
                    valor : $scope.valor,
                    estado:0




                }


            }).then(function successCallback(response) {
                console.log(response.data);

                if (response.data.length == 0) {

                    swal("Error!", "No se ingreso el parametro!", "error");
                } else {

                    swal("Exito!", "Parametro ingresado correctamente!", "success");
                    $scope.descripcion="";
                    $scope.valor="";



                }


            }, function errorCallback(response) {

                alert('error al realizar Ingreso');

            });

    }

    $scope.initModificarParametros=function(){

        $scope.parametros = JSON.parse(window.localStorage.getItem('parametros'));
        console.log("hola");
        console.log($scope.parametros);
        

    }

  


    $scope.modiParametros=function(){


            $http({
                method: 'PUT',
                url: myProvider.putParametros()+"/"+$scope.parametros._id,
                headers: {
                    // 'Content-Type': 'application/json',
                    //'Authorization': token
                },
                data: {

                    descripcion: $scope.parametros.descripcion,
                    valor:$scope.parametros.valor

                }


            }).then(function successCallback(response) {
                console.log(response.data);

                if (response.data.length == 0) {

                    swal("Error!", "No se Modifico los parametros!", "error");
                } else {

                    swal("Exito!", "Parametros se modifico correctamente!", "success");
                    $location.path("/ListaParametros");


                }


            }, function errorCallback(response) {

                alert('error al realizar Ingreso');

            });



    }

    $scope.eliminarParametros=function(parametros){


        swal({
                title: "Eliminar Parametros",
                text: "Estas seguro que quieres eliminar la parametros?",
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
                        url: myProvider.putParametros()+"/"+parametros._id,
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

                            swal("Error!", "No pudo eliminar el parametro!", "error");
                        } else {
                            swal("Exito!", "El parametro se elimino correctamente!", "success");
                            $scope.initListarParametros();

                        }


                    }, function errorCallback(response) {

                        alert('error al eliminar el usuario');

                    });


                } else {


                }
            });




    }
    

}]);
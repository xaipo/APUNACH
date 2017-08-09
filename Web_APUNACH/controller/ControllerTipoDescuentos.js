app.controller('tipodescuentoController', ['$scope', '$http', '$location','myProvider','$localStorage','$timeout',  function ($scope,$http,$location,myProvider,$localStorage,$timeout) {

    
    $scope.initListarTipoDescuento=function(){

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

            $('#tabletipodescuento').DataTable({
                "language": {
                    "url": "http://cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json"
                }


            });
        }, 500, false);


    }

    $scope.modificarTipoDescuento=function(tipdescuento){

            window.localStorage["tipdescuento"]= JSON.stringify(tipdescuento);
            $location.path("/ModificarTipoDescuento");

    }
    $scope.cancelarModificarTipoDescuento=function(){

        $location.path("/ListaTipoDescuento");

    }


    $scope.registrarTipoDescuento=function(){

            $http({
                method: 'POST',
                url: myProvider.postSaveTipoDescuento(),
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

                    swal("Error!", "No se ingreso el tipo de descuento!", "error");
                } else {

                    swal("Exito!", "Tipo de descuento ingresado correctamente!", "success");
                    $scope.descripcion="";
                    $scope.valor="";



                }


            }, function errorCallback(response) {

                alert('error al realizar Ingreso');

            });

    }

    $scope.initModificarTipoDescuento=function(){

        $scope.tipodescuento = JSON.parse(window.localStorage.getItem('tipdescuento'));
        console.log($scope.tipodescuento);
        

    }

  


    $scope.modiTipoDescuento=function(){


            $http({
                method: 'PUT',
                url: myProvider.putTipoDescuento()+"/"+$scope.tipodescuento._id,
                headers: {
                    // 'Content-Type': 'application/json',
                    //'Authorization': token
                },
                data: {

                    descripcion: $scope.tipodescuento.descripcion,
                    valor:$scope.tipodescuento.valor

                }


            }).then(function successCallback(response) {
                console.log(response.data);

                if (response.data.length == 0) {

                    swal("Error!", "No se Modifico el tipo de descuento!", "error");
                } else {

                    swal("Exito!", "Tipo descuento se modifico correctamente!", "success");
                    $location.path("/ListaTipoDescuento");


                }


            }, function errorCallback(response) {

                alert('error al realizar Ingreso');

            });



    }

    $scope.eliminarTipoDescuento=function(tipodescuento){


        swal({
                title: "Eliminar Tipo Descuento",
                text: "Estas seguro que quieres eliminar el tipo descuento?",
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
                        url: myProvider.putTipoDescuento()+"/"+tipodescuento._id,
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

                            swal("Error!", "No pudo eliminar el tipo descuento!", "error");
                        } else {
                            swal("Exito!", "El tipo descuento se elimino correctamente!", "success");
                            $scope.initListarTipoDescuento();

                        }


                    }, function errorCallback(response) {

                        alert('error al eliminar el usuario');

                    });


                } else {


                }
            });




    }
    

}]);
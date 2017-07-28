app.controller('facultadesController', ['$scope', '$http', '$location','myProvider','$localStorage','$timeout',  function ($scope,$http,$location,myProvider,$localStorage,$timeout) {

    
    $scope.initListarFacultad=function(){

        //inicializar todos los usuarios
        $http({
            method: 'GET',
            url: myProvider.getFacultades()+"?estado="+0,
            headers: {
                // 'Content-Type': 'application/json',
                //'Authorization': token
            },

        }).then(function successCallback(response) {
            console.log(response.data);

            if (response.data.length == 0) {

                swal("Advertencia!", "No existen usuarios en la BD!", "warning");
            } else {

                $scope.listFacultades = response.data;
                
            }


        }, function errorCallback(response) {

            alert('error al realizar Ingreso');

        });

        $timeout(function(){

            $('#tablefacultad').DataTable({
                "language": {
                    "url": "http://cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json"
                }


            });
        }, 500, false);


    }

    $scope.modificarFacultad=function(facultad){

            window.localStorage["facultad"]= JSON.stringify(facultad);
            $location.path("/ModificarFacultades");

    }
    $scope.cancelarModificarFacultad=function(){

        $location.path("/ListaFacultades");

    }


    $scope.registrarFacultad=function(){

            $http({
                method: 'POST',
                url: myProvider.postSaveFacultad(),
                headers: {
                    // 'Content-Type': 'application/json',
                    //'Authorization': token
                },
                data: {

                    nombre_facultad: $scope.nombre_facultad,
                    estado:0




                }


            }).then(function successCallback(response) {
                console.log(response.data);

                if (response.data.length == 0) {

                    swal("Error!", "No se ingreso La facultad!", "error");
                } else {

                    swal("Exito!", "Facultad ingresado correctamente!", "success");
                    $scope.nombre_facultad="";



                }


            }, function errorCallback(response) {

                alert('error al realizar Ingreso');

            });

    }

    $scope.initModificarFacultades=function(){

        $scope.facultad = JSON.parse(window.localStorage.getItem('facultad'));
        console.log($scope.facultad);
        

    }

  


    $scope.modiFacultad=function(){


            $http({
                method: 'PUT',
                url: myProvider.putFacultad()+"/"+$scope.facultad._id,
                headers: {
                    // 'Content-Type': 'application/json',
                    //'Authorization': token
                },
                data: {

                    nombre_facultad: $scope.facultad.nombre_facultad

                }


            }).then(function successCallback(response) {
                console.log(response.data);

                if (response.data.length == 0) {

                    swal("Error!", "No se Modifico la facultad!", "error");
                } else {

                    swal("Exito!", "Facultad se modifico correctamente!", "success");
                    $location.path("/ListaFacultades");


                }


            }, function errorCallback(response) {

                alert('error al realizar Ingreso');

            });



    }

    $scope.eliminarFacultad=function(facultad){


        swal({
                title: "Eliminar Facultad",
                text: "Estas seguro que quieres eliminar la facultad?",
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
                        url: myProvider.putFacultad()+"/"+facultad._id,
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
                            $scope.initListarFacultad();

                        }


                    }, function errorCallback(response) {

                        alert('error al eliminar el usuario');

                    });


                } else {


                }
            });




    }
    

}]);
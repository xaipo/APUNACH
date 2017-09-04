app.controller('carrerasController', ['$scope', '$http', '$location','myProvider','$localStorage','$timeout',  function ($scope,$http,$location,myProvider,$localStorage,$timeout) {


    $scope.initCarreras=function(){
      

        //inicializar los tipos de usuarios
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

                swal("Advertencia!", "No existen facultades en la BD!", "warning");
            } else {

                $scope.listFacultades = response.data;
            }


        }, function errorCallback(response) {

            alert('error al realizar Ingreso');

        });

    }
    $scope.initCarreraListar=function(){

        //inicializar todos los usuarios
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

        });

        $timeout(function(){

            $('#datatablecarreras').DataTable({
                "language": {
                    "url": "http://cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json"
                }


            });
        }, 500, false);


    }

    $scope.modificarCarrera=function(carrera){

            window.localStorage["carrera"]= JSON.stringify(carrera);
            $location.path("/ModificarCarreras");

    }
    $scope.cancelarModificarCarrera=function(){

        $location.path("/ListaCarreras");

    }


    $scope.registrarCarrera=function(){

            $http({
                method: 'POST',
                url: myProvider.postSaveCarrera(),
                headers: {
                    // 'Content-Type': 'application/json',
                    //'Authorization': token
                },
                data: {

                    nombre_carrera: $scope.nombre_carrera,
                    estado: "0",
                    id_facultad:$scope.id_facultad,




                }


            }).then(function successCallback(response) {
                console.log(response.data);

                if (response.data.length == 0) {

                    swal("Error!", "No se ingreso la carrera!", "error");
                } else {

                    swal("Exito!", "Carrera ingresada correctamente!", "success");
                    $scope.nombre_carrera = "";



                }


            }, function errorCallback(response) {

                alert('error al realizar Ingreso');

            });




    }

    $scope.initModificarCarreras=function(){

        $scope.carrera = JSON.parse(window.localStorage.getItem('carrera'));
        console.log($scope.carrera);
        $scope.initCarreras();

        

    }


    $scope.modiCarrera=function(){


            $http({
                method: 'PUT',
                url: myProvider.putCarrera()+"/"+$scope.carrera._id,
                headers: {
                    // 'Content-Type': 'application/json',
                    //'Authorization': token
                },
                data: {

                    nombre_carrera: $scope.carrera.nombre_carrera,
                    id_facultad:$scope.carrera.id_facultad



                }


            }).then(function successCallback(response) {
                console.log(response.data);

                if (response.data.length == 0) {

                    swal("Error!", "No se ingreso el usuario!", "error");
                } else {

                    swal("Exito!", "Usuario ingresado correctamente!", "success");
                    $location.path("/ListaCarreras");



                }


            }, function errorCallback(response) {

                alert('error al realizar Ingreso');

            });
        }
    

    $scope.eliminarCarrera=function(carrera){


        swal({
                title: "Eliminar Carrera",
                text: "Estas seguro que quieres eliminar la carrera?",
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
                        url: myProvider.putCarrera()+"/"+carrera._id,
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

                            swal("Error!", "No se elimino la carrera!", "error");
                        } else {
                            swal("Exito!", "La carrera se elimino!", "success");
                            $scope.initCarreraListar();

                        }


                    }, function errorCallback(response) {

                        alert('error al realizar Ingreso');

                    });


                } else {


                }
            });




    }
    

}]);
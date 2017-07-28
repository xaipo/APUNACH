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
    $scope.cancelarModificarUser=function(){

        $location.path("/ListaUsuarios");

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

                    nombre_carrera: $scope.nombre_carrera,
                    id_facultad:$scope.id_facultad



                }


            }).then(function successCallback(response) {
                console.log(response.data);

                if (response.data.length == 0) {

                    swal("Error!", "No se ingreso el usuario!", "error");
                } else {

                    swal("Exito!", "Usuario ingresado correctamente!", "success");
                    $location.path("/ListaUsuarios");



                }


            }, function errorCallback(response) {

                alert('error al realizar Ingreso');

            });
        }
    

    $scope.eliminarUsuario=function(usuario){


        swal({
                title: "Eliminar Usuario",
                text: "Estas seguro que quieres eliminar el usuario?",
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
                        url: myProvider.putSaveUser()+"/"+usuario._id,
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

                            swal("Error!", "No se ingreso el usuario!", "error");
                        } else {
                            swal("Exito!", "El usuario se elimino!", "success");
                            $scope.initListar();

                        }


                    }, function errorCallback(response) {

                        alert('error al realizar Ingreso');

                    });


                } else {


                }
            });




    }
    

}]);
app.controller('docentesController', ['$scope', '$http', '$location','myProvider','$localStorage','$timeout',  function ($scope,$http,$location,myProvider,$localStorage,$timeout) {


    $scope.initDocentes=function(){

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


    }
    $scope.initListar=function(){

        //inicializar todos los usuarios
        $http({
            method: 'GET',
            url: myProvider.getUsuarios_Tipo(),
            headers: {
                // 'Content-Type': 'application/json',
                //'Authorization': token
            },

        }).then(function successCallback(response) {
            console.log(response.data);

            if (response.data.length == 0) {

                swal("Advertencia!", "No existen usuarios en la BD!", "warning");
            } else {

                $scope.listUser_tipo = response.data;
                
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

    $scope.modificarUsuario=function(usuario){

            window.localStorage["usuario"]= JSON.stringify(usuario);
            $location.path("/ModificarUsuarios");

    }
    $scope.cancelarModificarUser=function(){

        $location.path("/ListaUsuarios");

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

        console.log($scope.valor_cuota);





    }

    $scope.initModificarUsuarios=function(){

        $scope.user = JSON.parse(window.localStorage.getItem('usuario'));
        console.log($scope.user);
        $scope.initUsuarios();
        

    }


    $scope.modificarUser=function(){

        var name = $scope.user.name;
        var username = $scope.user.username;
        var pass = $scope.password1;
        var repass = $scope.password2;
        var tipoUser=$scope.user.tipoUsuario;
        var email = $scope.user.email;

        if (pass == repass) {
            pass = SHA1(pass);
            console.log('encriptado');

            $http({
                method: 'PUT',
                url: myProvider.putSaveUser()+"/"+$scope.user._id,
                headers: {
                    // 'Content-Type': 'application/json',
                    //'Authorization': token
                },
                data: {

                    name: name,
                    tipoUsuario: tipoUser,
                    email:email,
                    username: username,
                    password:pass



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
        }else {

            alert('Las claves no coinciden');
        }



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
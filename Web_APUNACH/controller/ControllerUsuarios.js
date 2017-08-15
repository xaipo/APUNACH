app.controller('usuariosController', ['$scope', '$http', '$location','myProvider','$localStorage','$timeout',  function ($scope,$http,$location,myProvider,$localStorage,$timeout) {


    $scope.initUsuarios=function(){

        $scope.id_usuario = "59765a7c4fda492a70d68a9b";

        //inicializar los tipos de usuarios
        $http({
            method: 'GET',
            url: myProvider.getAllTipoUsuario(),
            headers: {
               // 'Content-Type': 'application/json',
                //'Authorization': token
            },

        }).then(function successCallback(response) {
            console.log(response.data);

            if (response.data.length == 0) {

                swal("Advertencia!", "No existen tipo de usuarios en la BD!", "warning");
            } else {

                $scope.listTipoUsuarios = response.data;
            }


        }, function errorCallback(response) {

            alert('error al realizar Ingreso');

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


    $scope.registrarUser=function(){

        var name = $scope.name;
        var username = $scope.username;
        var pass = $scope.password1;
        var repass = $scope.password2;
        var tipoUser=$scope.id_usuario;
        var email = $scope.correo;

        if (pass == repass) {
            pass = SHA1(pass);
            console.log('encriptado');

            $http({
                method: 'POST',
                url: myProvider.postSaveUser(),
                headers: {
                    // 'Content-Type': 'application/json',
                    //'Authorization': token
                },
                data: {

                    name: name,
                    tipoUsuario: tipoUser,
                    email:email,
                    username: username,
                    password:pass,
                    estado:"0"



                }


            }).then(function successCallback(response) {
                console.log(response.data);

                if (response.data.length == 0) {

                    swal("Error!", "No se ingreso el usuario!", "error");
                } else {

                    swal("Exito!", "Usuario ingresado correctamente!", "success");
                    $scope.name="";
                    $scope.username="";
                    $scope.password1="";
                    $scope.password2="";
                    $scope.id_usuario = "59765a7c4fda492a70d68a9b";
                    $scope.correo = "";


                }


            }, function errorCallback(response) {

                alert('error al realizar Ingreso');

            });
        }else {

            alert('Las claves no coinciden');
        }



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
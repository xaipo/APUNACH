app.controller('localesController', ['$scope', '$http', '$location','myProvider','$localStorage','$timeout',  function ($scope,$http,$location,myProvider,$localStorage,$timeout) {

    $scope.initListarLocal=function(){

        //inicializar todos los usuarios
        $http({
            method: 'GET',
            url: myProvider.getLocales(),
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
        }, 1500, false);


    }

    $scope.registrarLocales=function(){

        
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
                fecha_inicio_acuerdo:$scope.fecha_acuerdo,
                telefono:$scope.telefono,
                porcentaje_ganancia:$scope.porcentage



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

    $scope.eliminarUsuario=function(usuario){
        console.log(usuario);

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



    }


}]);
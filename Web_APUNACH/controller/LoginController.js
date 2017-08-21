/**
 * Created by xaipo on 9/30/2015.
 */

app.controller('LoginController', ['$scope', '$http', '$location','myProvider','$localStorage',  function ($scope,$http,$location,myProvider,$localStorage) {


    console.log("logincontroler");





    console.log(myProvider.getUser());
    $scope.mensaje = "";
    $scope.usuario = "";
    $scope.password = "";
    $scope.usuario1;
    //$rootScope.usuarioLogin;
    $scope.login = function () {
        $scope.mensaje = "procesando";
        var url= myProvider.getUser()+'?username='+$scope.usuario;
        console.log(url);

        $http({
            method: 'GET',
            url: url,
            headers: {
                'Content-Type': 'application/json'
            }

        }).then(function successCallback(response) {

            console.log(response.data);

            $scope.usuario1= angular.fromJson(response.data[0]);
           console.log($scope.usuario1);
          var   pass = SHA1($scope.password);
            console.log(pass);

            if(response.data.length>0){

            if($scope.usuario1.username==$scope.usuario && $scope.usuario1.password==pass ){

                console.log("entro");



                $scope.mensaje="Bienvenido "+response.data[0].username.toString();

                console.log( $scope.mensaje);

                switch(response.data[0].tipoUsuario) {
                    //Administrador
                    case "59765ab44fda492a70d68a9c":
                        window.localStorage.setItem("usuario", JSON.stringify($scope.usuario1));
                        window.location ='Principal.html';

                        break;
                    //profesor
                    case "59765a7c4fda492a70d68a9b":
                        window.localStorage.setItem("usuario", JSON.stringify($scope.usuario1));
                        //window.location ='Administrator/CieUser/ConfiguracionCIe10.html';
                        break;
                    //directiva
                    case "59765ac54fda492a70d68a9d":
                        window.localStorage.setItem("usuario", JSON.stringify($scope.usuario1));
                        //window.location ='Administrator/CieUser/ConfiguracionCIe10.html';
                        break;
                    default:

                     alert('El tipo de usuario no tiene permiso para ningun sistema')
                }

            }else{

                $scope.mensaje="Revise su usuario y password";
            }

            }else{

                $scope.mensaje="Revise su usuario y password";
                alert('Revise su usuario y password');

            }
            console.log(response);

        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            Console.log(response);
            $scope.mesaje=response.mensaje;

        });
    };

  //  console.log($rootScope.usuarioLogin);

}]);

/**
 * Created by xaipo on 9/30/2015.
 */

app.controller('LoginController', ['$scope', '$http', '$location','myProvider','$localStorage',  function ($scope,$http,$location,myProvider,$localStorage) {


    console.log("logincontroler");





    console.log(myProvider.getUrlAutenticar());
    $scope.mensaje = "";
    $scope.usuario = "";
    $scope.password = "";
    $scope.usuario1;
    //$rootScope.usuarioLogin;
    $scope.login = function () {
        $scope.mensaje = "procesando";
     //   var url= myProvider.getUser()+'?username='+$scope.usuario;

        var url= myProvider.getUrlAutenticar();
        console.log(url);



        $http({
            method: 'POST',
            url: url,
            data: {
                username: $scope.usuario,
                password: $scope.password
            },
            headers: {
                'Content-Type': 'application/json'
            }

        }).then(function successCallback(response) {
            console.log(response.data);

            switch(response.data.user.tipoUsuario) {
                //Administrador
                case "59765ab44fda492a70d68a9c":
                    window.localStorage.setItem("usuarioLogueado", JSON.stringify(response.data));
                    console.log(response.data);
                    window.location ='Principal.html';

                    break;
                //profesor
                case "59765a7c4fda492a70d68a9b":
                    window.localStorage.setItem("usuarioLogueado", JSON.stringify(response.data));
                    console.log(response.data);
                    window.location ='PrincipalDocente.html';
                    break;
                //directiva
                case "59765ac54fda492a70d68a9d":
                    window.localStorage.setItem("usuarioLogueado", JSON.stringify(response.data));
                    console.log(response.data);
                    //window.location ='Administrator/CieUser/ConfiguracionCIe10.html';
                    break;
                default:

                    alert('El tipo de usuario no tiene permiso para ningun sistema')
            }

        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            Console.log(response);
        //    $scope.mesaje=response.mensaje;

        });
    };

  //  console.log($rootScope.usuarioLogin);

}]);

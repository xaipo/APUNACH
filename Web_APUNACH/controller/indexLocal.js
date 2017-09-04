/**
 * Created by xaipo on 9/30/2015.
 */

app.controller('indexLocal', ['$scope', '$http', '$location','myProvider','$localStorage',  function ($scope,$http,$location,myProvider,$localStorage) {


    console.log("indexLocal");


        $http({
            method: 'GET',
            url: 'http://localhost:3000/api/locales',
            headers: {
                // 'Content-Type': 'application/json',
                //'Authorization': token
            },

        }).then(function successCallback(response) {
            console.log(response.data);

            $scope.locales=response.data;

        }, function errorCallback(response) {

            alert('error al realizar Ingreso');

        });







    $scope.buscar = function () {

        console.log("boton ");

        
            $http({
                method: 'GET',
                url: myProvider.getInformacion()+'?tarjeta='+$scope.tarjeta,
         
                headers: {
                    // 'Content-Type': 'application/json',
                    //'Authorization': token
                },

            }).then(function successCallback(response) {
                console.log(response.data);

                $scope.mostrar=true;
                $scope.datos=response.data[0];




                switch( $scope.datos.estado) {

                    case "0":
                        $scope.datos.estado="Con Credito";
                        break;

                    case "1":
                        $scope.datos.estado="Sin Credito";
                        break;

                    case "2":
                        $scope.datos.estado="Fuera de la Asociacion";
                        break;
                    default:


                }







                $scope.local1=$scope.local;

            }, function errorCallback(response) {

                alert('error al realizar Ingreso');

            });

    }
    $scope.mostrar=false;






}]);

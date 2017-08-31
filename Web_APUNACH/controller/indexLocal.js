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



    $scope.buscarTarjeta = function () {
        

        console.log($scope.tarjeta);

        $http({
            method: 'GET',
            url: 'http://localhost:3000/api/docente?tarjeta='+$scope.tarjeta,
            headers: {
                // 'Content-Type': 'application/json',
                //'Authorization': token
            },

        }).then(function successCallback(response) {
            console.log(response.data);

            $scope.datos=response.data[0];


        }, function errorCallback(response) {

            alert('error al realizar Ingreso');

        });








    }
    



    $scope.buscar = function () {

        console.log("boton ");





            $http({
                method: 'GET',
                url: 'http://localhost:3000/api/docente?cedula='+$scope.docente,
                headers: {
                    // 'Content-Type': 'application/json',
                    //'Authorization': token
                },

            }).then(function successCallback(response) {
                console.log(response.data);

                $scope.datos=response.data[0];


            }, function errorCallback(response) {

                alert('error al realizar Ingreso');

            });

    }







}]);

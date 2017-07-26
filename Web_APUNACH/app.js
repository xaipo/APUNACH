/**
 * Created by Lench0 on 25/07/2017.
 */


// Declare app level module which depends on views, and components
var app = angular.module("myApp", ['ngStorage','ngRoute'])
var direccion = 'http://localhost:3000/api/';
var url = 'http://localhost:3000/api/';

function ApiUrl(){

    //Usuarios
    this.getAllTipoUsuario=function(){
        return direccion+'tipoUsuario';
    }
    this.postSaveUser=function(){
        return direccion+'register';
    }
    this.getUsuarios_Tipo=function(){
        return direccion+'usuario_Tipo';
    }
    this.putSaveUser=function(){
        return direccion+'user';
    }
    
}

app.factory("myProvider",function(){
    // console.log("factory function");
    return new ApiUrl();

});

app.config (function($routeProvider ,$provide){
    //$locationProvider.html5Mode(true);
    $routeProvider.when("/",{templateUrl:"pages/Inicio.html", controller:''});
    //Usuarios
    $routeProvider.when("/IngresoUsuarios",{templateUrl:"pages/IngresoUsuarios.html", controller:'usuariosController'});
    $routeProvider.when("/ListaUsuarios",{templateUrl:"pages/ListaUsuarios.html", controller:'usuariosController'});
    $routeProvider.when("/ModificarUsuarios",{templateUrl:"pages/ModificarUsuarios.html", controller:'usuariosController'});
    

});




app.controller('navegacion', ['$scope', '$http', '$location','myProvider','$localStorage',  function ($scope,$http,$location,myProvider,$localStorage) {

    $scope.navegacion = function (url) {
        $location.path(url);


    }


}]);

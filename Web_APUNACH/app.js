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
    //Locales
    this.postSaveLocal=function(){
        return direccion+'locales';
    }
    this.getLocales=function(){
        return direccion+'locales';
    }
    this.putLocal=function(){
        return direccion+'locales';
    }
    //Facultades
    this.postSaveFacultad=function(){
        return direccion+'facultad';
    }
    this.getFacultades=function(){
        return direccion+'facultad';
    }
    this.putFacultad=function(){
        return direccion+'facultad';
    }
    //Carreras
    this.postSaveCarrera=function(){
        return direccion+'carrera';
    }
    this.getCarrera_Facultad=function(){
        return direccion+'carrera_facultad';
    }
    this.putCarrera=function(){
        return direccion+'carrera';
    }
    //Docente
    this. getTipo_Contrato=function(){
        return direccion+'tipoContrato';
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
    //Locales
    $routeProvider.when("/IngresoLocales",{templateUrl:"pages/IngresoLocales.html", controller:'localesController'});
    $routeProvider.when("/ListaLocales",{templateUrl:"pages/ListaLocales.html", controller:'localesController'});
    $routeProvider.when("/ModificarLocales",{templateUrl:"pages/ModificarLocales.html", controller:'localesController'});
    //Facultades
    $routeProvider.when("/IngresoFacultades",{templateUrl:"pages/IngresoFacultades.html", controller:'facultadesController'});
    $routeProvider.when("/ListaFacultades",{templateUrl:"pages/ListaFacultades.html", controller:'facultadesController'});
    $routeProvider.when("/ModificarFacultades",{templateUrl:"pages/ModificarFacultades.html", controller:'facultadesController'});
    //Carreras
    $routeProvider.when("/IngresoCarreras",{templateUrl:"pages/IngresoCarreras.html", controller:'carrerasController'});
    $routeProvider.when("/ListaCarreras",{templateUrl:"pages/ListaCarreras.html", controller:'carrerasController'});
    $routeProvider.when("/ModificarCarreras",{templateUrl:"pages/ModificarCarreras.html", controller:'carrerasController'});
    //Docentes
    $routeProvider.when("/IngresoDocentes",{templateUrl:"pages/IngresoDocentes.html", controller:'docentesController'});
    

    

});




app.controller('navegacion', ['$scope', '$http', '$location','myProvider','$localStorage',  function ($scope,$http,$location,myProvider,$localStorage) {

    $scope.navegacion = function (url) {
        $location.path(url);


    }


}]);

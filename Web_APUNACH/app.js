/**
 * Created by Lench0 on 25/07/2017.
 */


// Declare app level module which depends on views, and components
var app = angular.module("myApp", ['ngStorage','ngRoute'])
var direccion = 'http://localhost:3000';
var url = 'http://localhost:3000/api/';

function ApiUrl(){

    //Usuarios
    this.getLogin=function(){
        return direccion+'/user/login';
    }
    this.getSaveUsuario=function(){
        return url+'saveUsuario';
    }

    this.ByIdUsuario=function(){
        return url+'getByIdUsuario';
    }
    this.updateUsuario=function(){
        return url+'updateUsuario';
    }
    this.buscaralluserUsuario=function(){
        return url+'getAllUsuario';
    }
    this.eliminarUsuario=function(){
        return url+'eliminarUsuario';
    }
    // Padres
    this.getSaveTipoPadres=function(){
        return url+'saveTipoPadres';
    }
    this.getAllTipoPadres=function(){
        return url+'getAllTipoPadre';
    }
    this.updateTipoPadres=function(){
        return url+'updateTipoPadres';
    }
    this.getSavePadre=function(){
        return url+'savePadres';
    }
    this.consultarpadres=function(){
        return url+'consultarpadres';
    }
    this.getUpdatePadre=function(){
        return url+'updatePadres';
    }
    this.getAllPadres=function(){
        return url+'getAllPadres';
    }
    this.geteliminarTipoPadre=function(){
        return url+'eliminarTipoPadre';
    }


    //Matricula
    this.getSaveEstadoMatricula=function(){
        return url+'saveEstadoMatricula';
    }
    this.getAllEstadoMatricula=function(){
        return url+'getAllEstadoMatricula';
    }
    this.updateEstadoMatricula=function(){
        return url+'updateEstadoMatricula';
    }
    this.consultarCedula=function(){
        return url+'consultarCedula';
    }
    this.getSaveMatricula=function(){
        return url+'saveMatricula';
    }
    this.updateMatricula=function(){
        return url+'updateMatricula';
    }
    this.getMat_Estu=function(){
        return url+'getMat_Estu';
    }
    this.getMat_Estu_Para=function(){
        return url+'getMat_Estu_Para';
    }
    this.getAsig_Estu_Para=function(){
        return url+'getAsig_Estu_Para';
    }
    this.getParaleloId=function(){
        return url+'getParaleloId';
    }
    this.getMatriculaCed_Idnivel=function(){
        return url+'getMatriculaCed_Idnivel';
    }
    this.getMatriculaxCedula=function(){
        return url+'getMatriculaxCedula';
    }
    this.getMatriculaxCedulaPeriodo=function(){
        return url+'getMatriculaxCedulaPeriodo';
    }
    this.getReporte=function(){
        return url+'getReporte';
    }


    //Niveles
    this.getSaveNivel=function(){
        return url+'saveNivel';
    }
    this.getAllNiveles=function(){
        return url+'getAllNivel';
    }
    this.updateNivel=function(){
        return url+'updateNivel';
    }
    this.getParalelos_Nivel=function(){
        return url+'getParalelos_Nivel';
    }
    this.getByIdNivel=function() {
        return url+'getByIdNivel';
    }
    this.geteliminarNivel=function() {
        return url+'getEliminarNivel';
    }
    //Paralelos

    this.getSaveParalelos=function(){
        return url+'getSaveParalelos';
    }
    this.updateParalelos=function(){
        return url+'updateParalelos';
    }
    this.geteliminarParalelo=function(){
        return url+'geteliminarParalelo';
    }

    //Jornadas
    this.getSaveJornada=function(){
        return url+'saveJornada';
    }
    this.getAllJornadas=function(){
        return url+'getAllJornada';
    }
    this.updateJornada=function(){
        return url+'updateJornada';
    }
    this.eliminarJornada=function(){
        return url+'eliminarJornada';
    }
    //lunch
    this.getSaveLunch=function(){
        return url+'saveRefrigerio';
    }
    this.getAllLunch=function(){
        return url+'getAllRefrigerio';
    }
    this.updateLunch=function(){
        return url+'updateRefrigerio';
    }
    this.eliminarRefrigerio=function(){
        return url+'eliminarRefrigerio';
    }
    this.getIdLunch=function(){
        return url+'getByIdRefrigerio';
    }
    //Noticias
    this.getSaveNoticias=function(){
        return url+'saveNoticia';
    }
    this.getAllNoticias=function(){
        return url+'getAllNoticias';
    }
    this.updateNoticias=function(){
        return url+'updateNoticias';
    }
    this.geteliminarNoticia=function(){
        return url+'geteliminarNoticia';
    }
    //Estudiante
    this.saveEstudiantes=function(){
        return url+'saveEstudiantes';
    }
    this.updateEstudiantes=function(){
        return url+'updateEstudiantes';
    }
    this.getAllEstudiantes=function(){
        return url+'getAllEstudiantes';
    }
    //Estu_padre
    this.saveEstu_padre=function(){
        return url+'saveEstuPadres';
    }
    this.getParentsBySon=function(){
        return url+'getParentsBySon';
    }
    //Factura
    this.insertardatosfac=function(){
        return url+'insertardatosfac';
    }
    this.getconsultadatosinstituto=function(){
        return url+'getconsultadatosinstituto';
    }
    this.aumentarNum_Actual=function(){
        return url+'aumentarNum_Actual';
    }
    this.insertardatosdetallefac=function(){
        return url+'insertardatosdetallefac';
    }
    //Periodo

    this.getSavePeriodo=function(){
        return url+'SavePeriodo';
    }

    this.getAllPeriodos=function(){
        return url+'getAllPeriodos';
    }

    this.getSavePeriodoActual=function(){
        return url+'updatePeriodoActual';
    }
    this.getIdPeriodo=function(){
        return url+'getIdPeriodo';
    }
    //Empresa  getInstituto
    this.getInstituto=function(){
        return url+'getInstituto';
    }
    this.getModificarInsti=function(){
        return url+'getModificarInsti';
    }
    //Personal
    this.getAllCargos=function(){
        return url+'getAllCargos';
    }
    this.getsaveCargo=function(){
        return url+'getsaveCargo';
    }
    this.updateCargo=function(){
        return url+'updateCargo';
    }
    this.geteliminarCargo=function(){
        return url+'geteliminarCargo';
    }
    this.getSavePersonal=function(){
        return url+'getSavePersonal';
    }
    this.consultarCedulaPer=function(){
        return url+'consultarCedulaPer';
    }
    this.getAllPersonal=function(){
        return url+'getAllPersonal';
    }
    this.getUpdatePersonal=function(){
        return url+'getUpdatePersonal';
    }
    this.getCargosDescripcion=function(){
        return url+'getCargosDescripcion';
    }
    this.geteliminarPersonal=function(){
        return url+'geteliminarPersonal';
    }
    this.getParalelos_Personal=function(){
        return url+'getParalelos_Personal';
    }
    this.getUpdateParalelos_Personal=function() {
        return url+'getUpdateParalelos_Personal';
    }
    this.getUpdateAportePersonal=function() {
        return url+'getUpdateAportePersonal';
    }
    this.getUpdatePatronal=function() {
        return url+'getUpdatePatronal';
    }
    this.getrolpagos=function() {
        return url+'getrolpagos';
    }
    this.getAdelantoPersonalCedula=function() {
        return url+'getAdelantoPersonalCedula';
    }
    this.getUpdateAdelanto=function() {
        return url+'getUpdateAdelanto';
    }
}

app.factory("myProvider",function(){
    // console.log("factory function");
    return new ApiUrl();

});

app.config (function($routeProvider ,$provide){
    //$locationProvider.html5Mode(true);
    $routeProvider.when("/",{templateUrl:"pages/Inicio.html", controller:''});
    //Estudiante
    $routeProvider.when("/ingresoEstudiante",{templateUrl:"Paginas/ingresarEstudiantes.html", controller:'estudianteController'});







    /*$provide.factory("ApiUrl", function () {
     return {
     urlUsuarios: 'http://localhost:3000/api/usuarios'
     };
     })*/

    //$provide.value('urlUsuarios', 'http://localhost:3000/api/usuarios');




});



//('urlUsuarios', 'http://localhost:3000/api/usuarios');



/*app.config(['$routeProvider', function ($routeProvider) {
 $routeProvider.when('/newEmpresa', { templateUrl: '/tesisSaludOcupacional/Client/Administrator/newEmpresa.html', controller: 'EmpresaController' });
 $routeProvider.when('/', { templateUrl: '/indexAdmin.html' });
 $routeProvider.otherwise({ redirectTo: '/error' });
 }]);*/
app.controller('navegacion', ['$scope', '$http', '$location','myProvider','$localStorage',  function ($scope,$http,$location,myProvider,$localStorage) {

    $scope.navegacion = function (url) {
        $location.path(url);

    }


}]);

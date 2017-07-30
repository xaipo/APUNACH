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
    $scope.initListarDocentes=function(){

        //inicializar todos los usuarios
        $http({
            method: 'GET',
            url: myProvider.getAllDocentes()+"?estado="+0,
            headers: {
                // 'Content-Type': 'application/json',
                //'Authorization': token
            },

        }).then(function successCallback(response) {
            console.log(response.data);

            if (response.data.length == 0) {

                swal("Advertencia!", "No existen docentes en la BD!", "warning");
            } else {

                $scope.listDocentes = response.data;
                
            }


        }, function errorCallback(response) {

            alert('error al realizar Ingreso');

        });

        $timeout(function(){

            $('#datatabledocentes').DataTable({
                "language": {
                    "url": "http://cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json"
                }


            });
        }, 500, false);


    }

    $scope.modificarDocente=function(docente){

            window.localStorage["docente"]= JSON.stringify(docente);
            $location.path("/ModificarDocentes");

    }
    $scope.cancelarModificarDocente=function(){

        $location.path("/ListaDocentes");

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

        $http({
            method: 'POST',
            url: myProvider.postSaveDocente(),
            headers: {
                // 'Content-Type': 'application/json',
                //'Authorization': token
            },
            data: {

                cedula : $scope.cedula,
                nombres : $scope.nombres,
                apellidos : $scope.apellidos,
                fecha_nacimiento : $('#idfecha_naci').val(),
                direccion : $scope.direccion,
                telefono : $scope.telefono,
                celular : $scope.celular,
                correo_electronico : $scope.correo_electronico,
                id_carrera : $scope.id_carrera,
                id_tipo_contrato : $scope.id_tipo_contrato,
                pregrado : $scope.pregrado,
                postgrado : $scope.postgrado,
                miembro_asociacion : $scope.miembro_asociacion,
                fecha_afiliacion : $('#idfecha_afiliacion').val(),
                estado : 0,
                valor_cuota : $scope.valor_cuota



            }


        }).then(function successCallback(response) {


            if (response.data.length == 0) {

                swal("Error!", "No se ingreso el docente!", "error");
            } else {

                swal("Exito!", "Docente ingresado correctamente!", "success");
                $scope.cedula = "";
                $scope.nombres= "";
                $scope.apellidos = "";
                $scope.fecha_nacimiento = "";
                $scope.direccion = "";
                $scope.telefono = "";
                $scope.celular = "";
                $scope.correo_electronico = "";
                $scope.id_carrera = "";
                $scope.id_tipo_contrato= "";
                $scope.pregrado = "";
                $scope.postgrado = "";
                $scope.miembro_asociacion = "";
                $scope.fecha_afiliacion = "";
                $scope.valor_cuota= "";

            }


        }, function errorCallback(response) {

            alert('error al realizar Ingreso');

        });





    }

    $scope.initModificarDocentes=function(){

        $scope.docente = JSON.parse(window.localStorage.getItem('docente'));
        console.log($scope.docente);
        $scope.initDocentes();
        

    }


    $scope.modiDocente=function(){
        console.log($scope.docente.cedula);

            $http({
                method: 'PUT',
                url: myProvider.putUpdateDocente()+"/"+$scope.docente._id,
                headers: {
                    // 'Content-Type': 'application/json',
                    //'Authorization': token
                },
                data: {

                    cedula : $scope.docente.cedula,
                    nombres : $scope.docente.nombres,
                    apellidos : $scope.docente.apellidos,
                    fecha_nacimiento : $('#idfecha_naci').val(),
                    direccion : $scope.docente.direccion,
                    telefono : $scope.docente.telefono,
                    celular : $scope.docente.celular,
                    correo_electronico : $scope.docente.correo_electronico,
                    id_carrera : $scope.docente.id_carrera,
                    id_tipo_contrato : $scope.docente.id_tipo_contrato,
                    pregrado : $scope.docente.pregrado,
                    postgrado : $scope.docente.postgrado,
                    miembro_asociacion : $scope.docente.miembro_asociacion,
                    fecha_afiliacion : $('#idfecha_afiliacion').val(),
                    valor_cuota : $scope.docente.valor_cuota



                }


            }).then(function successCallback(response) {
                console.log(response.data);

                if (response.data.length == 0) {

                    swal("Error!", "No se modifico el docente!", "error");
                } else {

                    swal("Exito!", "El docente se modifico correctamente!", "success");
                    $location.path("/ListaDocentes");



                }


            }, function errorCallback(response) {

                alert('error al realizar Ingreso');

            });
        }


    $scope.eliminarDocente=function(docente){


        swal({
                title: "Eliminar Docente",
                text: "Estas seguro que quieres eliminar el docente?",
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
                        url: myProvider.putUpdateDocente()+"/"+docente._id,
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

                            swal("Error!", "No se elimino el docente!", "error");
                        } else {
                            swal("Exito!", "El docente se elimino!", "success");
                            $scope.initListarDocentes();

                        }


                    }, function errorCallback(response) {

                        alert('error al realizar Ingreso');

                    });


                } else {


                }
            });




    }
    

}]);
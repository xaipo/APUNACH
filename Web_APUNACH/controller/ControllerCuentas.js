app.controller('cuentasController', ['$scope', '$http', '$location','myProvider','$localStorage','$timeout',  function ($scope,$http,$location,myProvider,$localStorage,$timeout) {


    console.log("controlador ingreso");

    $scope.initListarTipoCuentasIngreso=function(){

        //inicializar todos los tipos de cuentas de ingreso
        $http({
            method: 'GET',
            url: myProvider.getTipoCuentasIngreso()+"?estado="+0,
            headers: {
                // 'Content-Type': 'application/json',
                //'Authorization': token
            },

        }).then(function successCallback(response) {
            console.log(response.data);

            if (response.data.length == 0) {

                swal("Advertencia!", "No existen usuarios en la BD!", "warning");
            } else {

                $scope.listTipoCuentasIngreso = response.data;
                
            }


        }, function errorCallback(response) {

            alert('error al realizar Ingreso');

        });

        $timeout(function(){

            $('#tableTipoCuentasIngreso').DataTable({
                "language": {
                    "url": "http://cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json"
                }


            });
        }, 500, false);

        $('#idfecha_ingre').datepicker({
            autoclose: true,
            changeMonth: true,
            changeYear: true,
            format: 'yyyy-mm-dd', //Se especifica como deseamos representarla
            firstDay: 1

        });


    }

    $scope.modificarTipoCunetaIngreso=function(tipocuentaingreso){

            window.localStorage["tipocuentaingreso"]= JSON.stringify(tipocuentaingreso);
            $location.path("/ModificarTipoCuentasIngreso");

    }
    $scope.cancelarTipoCuentaIngreso=function(){

        $location.path("/ListaTipoCuentasIngresos");

    }


    $scope.registrarTipoCuentaIngreso=function(){

            $http({
                method: 'POST',
                url: myProvider.postSaveTipoCuentaIngreso(),
                headers: {
                    // 'Content-Type': 'application/json',
                    //'Authorization': token
                },
                data: {

                   descripcion: $scope.descripcion,
                    estado:0




                }


            }).then(function successCallback(response) {
                console.log(response.data);

                if (response.data.length == 0) {

                    swal("Error!", "No se ingreso La facultad!", "error");
                } else {

                    swal("Exito!", "Facultad ingresado correctamente!", "success");
                    $scope.descripcion="";



                }


            }, function errorCallback(response) {

                alert('error al realizar Ingreso');

            });

    }

    $scope.initModificarTipoCuentasIngreso=function(){

        $scope.tipocuentaingreso = JSON.parse(window.localStorage.getItem('tipocuentaingreso'));
        console.log($scope.facultad);
        

    }

  


    $scope.modiTipoCuentaIngreso=function(){


            $http({
                method: 'PUT',
                url: myProvider.putTipoCuentaIngreso()+"/"+$scope.tipocuentaingreso._id,
                headers: {
                    // 'Content-Type': 'application/json',
                    //'Authorization': token
                },
                data: {

                    descripcion: $scope.tipocuentaingreso.descripcion

                }


            }).then(function successCallback(response) {
                console.log(response.data);

                if (response.data.length == 0) {

                    swal("Error!", "No se pudo modificar el tipo de cuenta!", "error");
                } else {

                    swal("Exito!", "El Tipo de cuenta se a modificado correctamente!", "success");
                    $location.path("/ListaTipoCuentasIngresos");


                }


            }, function errorCallback(response) {

                alert('error al realizar Ingreso');

            });



    }

    $scope.eliminarTipoCunetaIngreso=function(TipoCuentasIngreso){


        swal({
                title: "Eliminar Tipo cuenta de Ingreso",
                text: "Estas seguro que quieres eliminar la cuenta?",
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
                        url: myProvider.putTipoCuentaIngreso()+"/"+TipoCuentasIngreso._id,
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

                            swal("Error!", "No pudo eliminar la facultad!", "error");
                        } else {
                            swal("Exito!", "La facultad se elimino correctamente!", "success");
                            $scope.initListarTipoCuentasIngreso();

                        }


                    }, function errorCallback(response) {

                        alert('error al eliminar el usuario');

                    });


                } else {


                }
            });




    }

    //------------------------------------------------Tipo cuentas Egresos----------------------------------------------



    $scope.initListarTipoCuentasEgreso=function(){

        //inicializar todos los tipos de cuentas de ingreso
        $http({
            method: 'GET',
            url: myProvider.getTipoCuentasEgreso()+"?estado="+0,
            headers: {
                // 'Content-Type': 'application/json',
                //'Authorization': token
            },

        }).then(function successCallback(response) {
            console.log(response.data);

            if (response.data.length == 0) {

                swal("Advertencia!", "No existen usuarios en la BD!", "warning");
            } else {

                $scope.listTipoCuentasEgreso = response.data;

            }


        }, function errorCallback(response) {

            alert('error al realizar Egreso');

        });

        $timeout(function(){

            $('#tableTipoCuentasEgreso').DataTable({
                "language": {
                    "url": "http://cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json"
                }


            });
        }, 500, false);

        $('#idfecha_egre').datepicker({
            autoclose: true,
            changeMonth: true,
            changeYear: true,
            format: 'yyyy-mm-dd', //Se especifica como deseamos representarla
            firstDay: 1

        });


    }

    $scope.modificarTipoCunetaEgreso=function(tipocuentaegreso){

        window.localStorage["tipocuentaegreso"]= JSON.stringify(tipocuentaegreso);
        $location.path("/ModificarTipoCuentasEgreso");

    }
    $scope.cancelarTipoCuentaEgreso=function(){

        $location.path("/ListaTipoCuentasEgresos");

    }


    $scope.registrarTipoCuentaEgreso=function(){

        $http({
            method: 'POST',
            url: myProvider.postSaveTipoCuentaEgreso(),
            headers: {
                // 'Content-Type': 'application/json',
                //'Authorization': token
            },
            data: {

                descripcion: $scope.descripcion,
                estado:0




            }


        }).then(function successCallback(response) {
            console.log(response.data);

            if (response.data.length == 0) {

                swal("Error!", "No se ingreso La facultad!", "error");
            } else {

                swal("Exito!", "Facultad ingresado correctamente!", "success");
                $scope.descripcion="";



            }


        }, function errorCallback(response) {

            alert('error al realizar Ingreso');

        });

    }

    $scope.initModificarTipoCuentasEgreso=function(){

        $scope.tipocuentaegreso = JSON.parse(window.localStorage.getItem('tipocuentaegreso'));



    }




    $scope.modiTipoCuentaEgreso=function(){


        $http({
            method: 'PUT',
            url: myProvider.putTipoCuentaEgreso()+"/"+$scope.tipocuentaegreso._id,
            headers: {
                // 'Content-Type': 'application/json',
                //'Authorization': token
            },
            data: {

                descripcion: $scope.tipocuentaegreso.descripcion

            }


        }).then(function successCallback(response) {
            console.log(response.data);

            if (response.data.length == 0) {

                swal("Error!", "No se pudo modificar el tipo de cuenta!", "error");
            } else {

                swal("Exito!", "El Tipo de cuenta se a modificado correctamente!", "success");
                $location.path("/ListaTipoCuentasEgresos");


            }


        }, function errorCallback(response) {

            alert('error al realizar Ingreso');

        });



    }

    $scope.eliminarTipoCunetaEgreso=function(TipoCuentasEgreso){


        swal({
                title: "Eliminar Tipo cuenta de Egreso",
                text: "Estas seguro que quieres eliminar la cuenta?",
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
                        url: myProvider.putTipoCuentaEgreso()+"/"+TipoCuentasEgreso._id,
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

                            swal("Error!", "No pudo eliminar el tipo de cuenta de egresos!", "error");
                        } else {
                            swal("Exito!", "El tipo de cuenta de egresos se elimino correctamente!", "success");
                            $scope.initListarTipoCuentasEgreso();

                        }


                    }, function errorCallback(response) {

                        alert('error al eliminar el usuario');

                    });


                } else {


                }
            });
        
    }

    //------------------------------------------------Cuentas Ingresos----------------------------------------------

    $scope.initIngresosListar=function(){

        //inicializar todos los usuarios
        $http({
            method: 'GET',
            url: myProvider.getIngreso_Tipocuenta(),
            headers: {
                // 'Content-Type': 'application/json',
                //'Authorization': token
            },

        }).then(function successCallback(response) {
            console.log(response.data);

            if (response.data.length == 0) {

                swal("Advertencia!", "No existen cuentas de ingresos en la BD!", "warning");
            } else {

                $scope.listCuentasIngreso = response.data;

            }


        }, function errorCallback(response) {

            alert('error al realizar Ingreso');

        });

        $timeout(function(){

            $('#datatableIngresos').DataTable({
                "language": {
                    "url": "http://cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json"
                }


            });
        }, 500, false);


    }

    
    $scope.modiIngresos=function(ingresos){

        window.localStorage["ingresos"]= JSON.stringify(ingresos);
        $location.path("/ModificarIngresos");

    }
    $scope.cancelarModificarIngreso=function(){

        $location.path("/ListaIngresos");

    }


    $scope.registrarCuentaIngreso=function(){
        console.log($scope.id_cuenta);
        console.log($('#idfecha_ingre').val());
        var fecha = $('#idfecha_ingre').val();
        var fecha_del_sistema = new Date();
        console.log(fecha_del_sistema);

        $http({
            method: 'POST',
            url: myProvider.postSaveCuentaIngreso(),
            headers: {
                // 'Content-Type': 'application/json',
                //'Authorization': token
            },
            data: {

                id_cuenta:$scope.id_cuenta,
                valor:$scope.valor,
                fecha:fecha,
                fecha_sistema:fecha_del_sistema,
                usuario: $scope.id_cuenta,
                estado:0




            }


        }).then(function successCallback(response) {
            console.log(response.data);

            if (response.data.length == 0) {

                swal("Error!", "No se ingreso correctamente la cuenta de ingreso!", "error");
            } else {

                swal("Exito!", "Cuenta de ingreso se ah ingresado correctamente!", "success");
                $scope.id_cuenta = "";
                $scope.valor = "";
                $scope.fecha_ingre = "";

            }


        }, function errorCallback(response) {

            alert('error al realizar Ingreso');

        });

    }

    $scope.initModificarIngresos=function(){

        $scope.ingresos = JSON.parse(window.localStorage.getItem('ingresos'));
        console.log($scope.ingresos);
        var fecha = $scope.ingresos.fecha.split("T");
        $scope.fecha_fin = fecha[0];
        $scope.initListarTipoCuentasIngreso();



    }




    $scope.ModificarIngreso=function(){

        var fecha = $('#idfecha_ingre').val();


        $http({
            method: 'PUT',
            url: myProvider.putIngresos()+"/"+$scope.ingresos._id,
            headers: {
                // 'Content-Type': 'application/json',
                //'Authorization': token
            },
            data: {

                id_cuenta:$scope.ingresos.id_cuenta,
                valor:$scope.ingresos.valor,
                fecha:fecha,
                usuario: $scope.ingresos.id_cuenta

            }


        }).then(function successCallback(response) {
            console.log(response.data);

            if (response.data.length == 0) {

                swal("Error!", "No se pudo modificar los ingresos!", "error");
            } else {

                swal("Exito!", "La cuenta de ingreso se a modificado correctamente!", "success");
               $location.path("/ListaIngresos");


            }


        }, function errorCallback(response) {

            alert('error al realizar Ingreso');

        });



    }

    $scope.eliminarIngresos=function(ingresos){


        swal({
                title: "Eliminar la cuenta de Ingreso",
                text: "Estas seguro que quieres eliminar la cuenta?",
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
                        url: myProvider.putIngresos()+"/"+ingresos._id,
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

                            swal("Error!", "No pudo eliminar la de cuenta de ingresos!", "error");
                        } else {
                            swal("Exito!", "La cuenta de ingresos se elimino correctamente!", "success");
                            $scope.initIngresosListar();

                        }

                    }, function errorCallback(response) {

                        alert('error al eliminar el usuario');

                    });


                } else {


                }
            });

    }

    //------------------------------------------------Cuentas Egresos----------------------------------------------

    $scope.initEgresosListar=function(){

        //inicializar todos los usuarios
        $http({
            method: 'GET',
            url: myProvider.getEgreso_Tipocuenta(),
            headers: {
                // 'Content-Type': 'application/json',
                //'Authorization': token
            },

        }).then(function successCallback(response) {
            console.log(response.data);

            if (response.data.length == 0) {

                swal("Advertencia!", "No existen cuentas de egresos en la BD!", "warning");
            } else {

                $scope.listCuentasEgreso = response.data;

            }


        }, function errorCallback(response) {

            alert('error al realizar Ingreso');

        });

        $timeout(function(){

            $('#datatableEgresos').DataTable({
                "language": {
                    "url": "http://cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json"
                }


            });
        }, 500, false);


    }


    $scope.modiEgresos=function(egresos){

        window.localStorage["egresos"]= JSON.stringify(egresos);
        $location.path("/ModificarEgresos");

    }
    $scope.cancelarModificarEgreso=function(){

        $location.path("/ListaEgresos");

    }

    $scope.initListarDocentes_Des=function(){

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

    $scope.seleccionarDocentexLocal=function(docente){


        $scope.nombre_docente = docente.nombres+" "+ docente.apellidos;
        $scope.docente=docente;

    }


    $scope.registrarAcarreo=function(){

        var hoy = new Date();
        var dd = hoy.getDate();
        var mm = hoy.getMonth()+1; //hoy es 0!
        var yyyy = hoy.getFullYear();

        var mes = hoy.getMonth()+2; //hoy es 0!

        if(mm<10) {
            mm='0'+mm
        }


        if(mes<10) {
            mes='0'+mes
        }


        var fecha = mm+'/'+dd+'/'+yyyy;
        var fecha1 = mm+'/'+yyyy;
        var fecha2 = mes+'/'+yyyy;

        console.log(fecha1);



        var objeto={
            fecha:fecha1,
            docente:$scope.docente._id,
            observacion:$scope.observacion,
            estado:"pendiente",
            valor:$scope.valor

        }

        console.log(objeto);


        $http({
            method: 'POST',
            url: myProvider.postSavePendientes(),   //Guardar las cuotas de credito
            headers: {
                // 'Content-Type': 'application/json',
                //'Authorization': token
            },
            data: objeto


        }).then(function successCallback(response) {

            console.log(response.data);

        }, function errorCallback(response) {

            alert('error al realizar Ingreso');

        });



        $http({
            method: 'GET',
            url: myProvider.getEstadoCuentaxLocal() + "?id_docente=" + objeto.docente+"&&frac_fecha="+fecha2, //Buscar estado de cuenta por od docente y fecha
            headers: {
                // 'Content-Type': 'application/json',
                //'Authorization': token
            },
            data: {}


        }).then(function successCallback(response) {

            console.log(response.data[0]);







            $http({

                method: 'PUT',
                url: myProvider.putEstado_cuenta()+"/"+response.data[0]._id, //MODIFICAR eSTADO CUENTA
                headers: {
                    // 'Content-Type': 'application/json',
                    //'Authorization': token
                },
                data: {


                    //id_usuario: $scope.docenteingresar._id, IMPORTANTE INGRESAR

                    valor_acarreo_mes_anterior: objeto.valor,
                    valor_x_pagar:response.data[0].valor_x_pagar+objeto.valor



                }


            }).then(function successCallback(response) {

                console.log(response.data);


                $http({
                    method: 'POST',
                    url: myProvider.postSaveDescuento(),
                    headers: {
                        // 'Content-Type': 'application/json',
                        //'Authorization': token
                    },
                    data: {

                        id_catalogo:"5993682845f4a949eca9bddf",
                        id_local:"5993682845f4a949eca9bddf",
                        nombre_local:"APUNACH",
                        id_estado_cuenta:response.data._id,
                        descripcion:objeto.observacion,
                        valor_descuento:objeto.valor,
                        cantidad:0,
                        fecha:objeto.fecha



                    }




                }).then(function successCallback(response) {
                    console.log(response.data);



                    //actulizar





                }, function errorCallback(response) {

                    alert('error al realizar Ingreso');

                });














            }, function errorCallback(response) {

                alert('error al realizar Ingreso');

            });








        }, function errorCallback(response) {

            alert('error al realizar Ingreso');

        });




        $http({
            method: 'GET',
            url: myProvider.putIngresos() + "?fecha=" + fecha1, //Buscar estado de cuenta por od docente y fecha
            headers: {
                // 'Content-Type': 'application/json',
                //'Authorization': token
            },
            data: {}


        }).then(function successCallback(response) {

            console.log(response.data[0]);


            var nuevoValor=response.data[0].valor-objeto.valor;

console.log(nuevoValor,objeto.valor);



            $http({

                method: 'PUT',
                url: myProvider.putIngresos()+"/"+response.data[0]._id, //MODIFICAR eSTADO CUENTA
                headers: {
                    // 'Content-Type': 'application/json',
                    //'Authorization': token
                },
                data: {


                    //id_usuario: $scope.docenteingresar._id, IMPORTANTE INGRESAR

                    valor: nuevoValor




                }


            }).then(function successCallback(response) {

                console.log("final ingreso",response.data);



                $http({
                    method: 'POST',
                    url: 'http://localhost:3000/mail/SendMail1',
                    headers: {
                        'Content-Type': 'application/json',
                        //'Authorization': token
                    },
                    data: {
                        "mail": $scope.docente.correo_electronico,
                        "nombre": $scope.docente.nombres,
                        "cedula": $scope.docente.cedula,
                        "fecha": fecha1,
                        "valorPagar": objeto.valor,
                        "detalle": objeto.observacion
                    }


                }).then(function successCallback(response) {
                    console.log(response.data);


                    $scope.mensaje="se a enviado la notificacion al correo del docente"

                }, function errorCallback(response) {

                    alert('error al realizar Ingreso');

                });









            }, function errorCallback(response) {

                alert('error al realizar Ingreso');

            });








        }, function errorCallback(response) {

            alert('error al realizar Ingreso');

        });





        
        








    }
    
    
    $scope.registrarCuentaEgreso=function(){
        console.log($scope.id_cuenta);
        console.log($('#idfecha_egre').val());
        var fecha = $('#idfecha_egre').val();
        var fecha_del_sistema = new Date();
        console.log(fecha_del_sistema);

        $http({
            method: 'POST',
            url: myProvider.postSaveCuentaEgreso(),
            headers: {
                // 'Content-Type': 'application/json',
                //'Authorization': token
            },
            data: {

                id_cuenta:$scope.id_cuenta,
                valor:$scope.valor,
                fecha:fecha,
                fecha_sistema:fecha_del_sistema,
                usuario: $scope.id_cuenta,
                estado:0
                
            }


        }).then(function successCallback(response) {
            console.log(response.data);

            if (response.data.length == 0) {

                swal("Error!", "No se ingreso correctamente la cuenta de egreso!", "error");
            } else {

                swal("Exito!", "Cuenta de egreso se ah ingresado correctamente!", "success");
                $scope.id_cuenta = "";
                $scope.valor = "";
                $scope.fecha_egre = "";

            }


        }, function errorCallback(response) {

            alert('error al realizar Ingreso');

        });

    }

    $scope.initModificarEgresos=function(){

        $scope.egresos = JSON.parse(window.localStorage.getItem('egresos'));
        console.log($scope.egresos);
        var fecha = $scope.egresos.fecha.split("T");
        $scope.fecha_fin = fecha[0];
        $scope.initListarTipoCuentasEgreso();



    }




    $scope.ModificarEgreso=function(){

        var fecha = $('#idfecha_egre').val();


        $http({
            method: 'PUT',
            url: myProvider.putEgresos()+"/"+$scope.egresos._id,
            headers: {
                // 'Content-Type': 'application/json',
                //'Authorization': token
            },
            data: {

                id_cuenta:$scope.egresos.id_cuenta,
                valor:$scope.egresos.valor,
                fecha:fecha,
                usuario: $scope.egresos.id_cuenta

            }


        }).then(function successCallback(response) {
            console.log(response.data);

            if (response.data.length == 0) {

                swal("Error!", "No se pudo modificar los egresos!", "error");
            } else {

                swal("Exito!", "La cuenta de egreso se a modificado correctamente!", "success");
                $location.path("/ListaEgresos");


            }


        }, function errorCallback(response) {

            alert('error al realizar Ingreso');

        });



    }

    $scope.eliminarEgresos=function(egresos){


        swal({
                title: "Eliminar la cuenta de Egreso",
                text: "Estas seguro que quieres eliminar la cuenta?",
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
                        url: myProvider.putEgresos()+"/"+egresos._id,
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

                            swal("Error!", "No pudo eliminar la de cuenta de egresos!", "error");
                        } else {
                            swal("Exito!", "La cuenta de egresos se elimino correctamente!", "success");
                            $scope.initEgresosListar();

                        }

                    }, function errorCallback(response) {

                        alert('error al eliminar el usuario');

                    });


                } else {


                }
            });

    }
    

}]);
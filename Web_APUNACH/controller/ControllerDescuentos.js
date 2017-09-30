app.controller('descuentosController', ['$scope', '$http', '$location','myProvider','$localStorage','$timeout',  function ($scope,$http,$location,myProvider,$localStorage,$timeout) {

    $('#idfechaacuerdo').datepicker({
        autoclose: true,
        changeMonth: true,
        changeYear: true,
        format: 'yyyy-mm-dd', //Se especifica como deseamos representarla
        firstDay: 1

    });

    $scope.initDescuentos=function(){
       $('#Agm').hide();
        $('#Ml').hide();


        $http({
            method: 'GET',
            url: myProvider.getParametros(), //Buscar estado de cuenta por od docente y fecha
            headers: {
                // 'Content-Type': 'application/json',
                //'Authorization': token
            },
            data: {}


        }).then(function successCallback(response) {


            console.log(response.data[2].valor);
            if(response.data[2].valor == 0)
            {
                $('#Agm').show();
                $('#Ml').hide();
            }else {
                $('#Agm').hide();
                $('#Ml').show();
            }


        }, function errorCallback(response) {

            alert('error al realizar Ingreso');

        });





       

    }



    $scope.initListarLocal_Des=function(){
        console.log("que hay");

        //inicializar todos los usuarios
        $http({
            method: 'GET',
            url: myProvider.getLocales()+"?estado="+0,
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
        }, 500, false);


    }

  
    $scope.initListarDocentes_Des=function(){



        console.log("lista docentes");

        $scope.localingresar = JSON.parse(window.localStorage.getItem('local'));




        if($scope.localingresar.nombre == "APUNACH")
        {


            cargar_listaDocentes("?estado=0");
        }
        else {



            cargar_listaDocentes("?estado=0&&miembro_asociacion=Si");


        }




        function cargar_listaDocentes(parametros) {


            console.log(parametros);



            //inicializar todos los usuarios
            $http({
                method: 'GET',
                url: myProvider.getAllDocentes()+parametros,
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





    }




    $scope.initListarDocentes_Des1=function(){





        $http({
            method: 'GET',
            url: myProvider.getParametros(), //Buscar estado de cuenta por od docente y fecha
            headers: {
                // 'Content-Type': 'application/json',
                //'Authorization': token
            },
            data: {}


        }).then(function successCallback(response) {


            console.log(response.data[1]);

            $scope.porcentaje = response.data[1].valor;




        }, function errorCallback(response) {

            alert('error al realizar Ingreso');

        });






            cargar_listaDocentes("?estado=0&&miembro_asociacion=Si");






        function cargar_listaDocentes(parametros) {


            console.log(parametros);



            //inicializar todos los usuarios
            $http({
                method: 'GET',
                url: myProvider.getAllDocentes()+parametros,
                headers: {
                    // 'Content-Type': 'application/json',
                    //'Authorization': token
                },

            }).then(function successCallback(response) {
                console.log(response.data);

                $scope.listDocentes = response.data;


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





    }



    $scope.initListarTipoDescuento_Des=function(){

        //inicializar todos los usuarios
        $http({
            method: 'GET',
            url: myProvider.getTipoDescuento()+"?estado="+0,
            headers: {
                // 'Content-Type': 'application/json',
                //'Authorization': token
            },

        }).then(function successCallback(response) {
            console.log(response.data);

            if (response.data.length == 0) {

                swal("Advertencia!", "No existen tipo descuentos en la BD!", "warning");
            } else {

                $scope.listTipoDescuento = response.data;

            }


        }, function errorCallback(response) {

            alert('error al realizar Ingreso');

        });

        $timeout(function(){

            $('#datatabledes').DataTable({
                "language": {
                    "url": "http://cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json"
                }


            });
        }, 500, false);


    }

    $scope.initListarDescuentos=function(){






                $http({
            method: 'GET',
            url: myProvider.getEstadoCuenta_Docente(),
            headers: {
                // 'Content-Type': 'application/json',
                //'Authorization': token
            },

        }).then(function successCallback(response) {
            console.log(response.data);

            if (response.data.length == 0) {

                swal("Advertencia!", "No existen usuarios en la BD!", "warning");
                $scope.listEstado_Docente = response.data;
            } else {

                $scope.listEstado_Docente = response.data;

            }


        }, function errorCallback(response) {

            alert('error al realizar Ingreso');

        });

        $timeout(function(){

            $('#tableEstado_cuenta').DataTable({
                "language": {
                    "url": "http://cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json"
                }


            });
        }, 500, false);



    }

    $scope.initVerDescuentos=function(){

        $scope.docenteConsulta  =  JSON.parse(window.localStorage.getItem('docenteConsultas'));
        console.log($scope.docenteConsulta[0].cedula);



        $http({
            method: 'POST',
            url: myProvider.getVerDescuentos(),
            headers: {
                // 'Content-Type': 'application/json',
                //'Authorization': token
            },
            data: {

               cedula:$scope.docenteConsulta[0].cedula



            }

        }).then(function successCallback(response) {
            console.log(response.data);

            if (response.data.length == 0) {

                swal("Advertencia!", "No existen usuarios en la BD!", "warning");
                $scope.listEstado_Docente = response.data;
            } else {

                $scope.listEstado_Docente = response.data;

            }


        }, function errorCallback(response) {

            alert('error al realizar Ingreso');

        });

        $timeout(function(){

            $('#tableVerEstado_cuenta').DataTable({
                "language": {
                    "url": "http://cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json"
                }


            });
        }, 500, false);



    }

    $scope.initCierreDefini=function() {



        $http({
            method: 'GET',
            url: myProvider.getMesFechaC(),
            headers: {
                // 'Content-Type': 'application/json',
                //'Authorization': token
            },

        }).then(function successCallback(response) {
            console.log(response.data);

            $scope.fechaMesT=response.data.fecha;




        }, function errorCallback(response) {

            alert('error al realizar Ingreso');

        });






    };


    $scope.initListarDescuentosImpri=function(){

       // $('#tableEstado_cuenta1').hide();

    console.log("hola");

        $http({
            method: 'GET',
            url: myProvider.getEstadoCuenta_Docente(),
            headers: {
                // 'Content-Type': 'application/json',
                //'Authorization': token
            },

        }).then(function successCallback(response) {
            console.log(response.data);

            if (response.data.length == 0) {

                swal("Advertencia!", "No existen usuarios en la BD!", "warning");
                $scope.listEstado_Docente = response.data;
            } else {

                $scope.listEstado_Docente = response.data;

            }


        }, function errorCallback(response) {

            alert('error al realizar Ingreso');

        });

        $timeout(function(){

            $('#datatableuser').DataTable({
                "language": {
                    "url": "http://cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json"
                }


            });
           // window.print();
        }, 500, false);



    }

    $scope.listSeleccion = [];
    $scope.listAceptado = [];
    $scope.total = 0;
    $scope.objenew ={};

    $scope.Selecion_multixLocal=function(x){


        $scope.localingresar = JSON.parse(window.localStorage.getItem('local'));




        var index = $scope.listSeleccion.indexOf(x);

        console.log(index);



        if (index==-1){



            $scope.listSeleccion.push(x);
            console.log($scope.listSeleccion);

        }else {



            $scope.listSeleccion.splice(index, 1);
            console.log($scope.listSeleccion);

        }


    }


    $scope.agreg_newxLocal=function(){

        $scope.localingresar = JSON.parse(window.localStorage.getItem('local'));

     var n =  $scope.listadoDocentesSelect.length;


        for (var i =0;i<n;i++){

            var objenew ={
                id_local:$scope.localingresar._id,
                nombre_local: $scope.localingresar.nombre,
                id_catalogo : $scope.localingresar._id,
                descripcion : $scope.nombre_descuento_new,
                valor_descuento: $scope.valor_descuento_new,
                nombre_docente:$scope.listadoDocentesSelect[i].nombres+" "+$scope.listadoDocentesSelect[i].apellidos,
                id_docente:$scope.listadoDocentesSelect[i]._id
            };


            $scope.listAceptado.push(objenew);




        }

        var fecha = new Date();
        console.log(fecha);
        $scope.total =0;

        $scope.docenteingresar = JSON.parse(window.localStorage.getItem('destallesdescuento'));


        $scope.objenew ={
            id_local:$scope.localingresar._id,
            nombre_local: $scope.localingresar.nombre,
            id_catalogo : $scope.localingresar._id,
            descripcion : $scope.nombre_descuento_new,
            valor_descuento: $scope.valor_descuento_new,
            nombre_docente:$scope.nombre_docente,
            id_docente:$scope.id_docente
        };



    }

    $scope.Selecion_multi=function(x){
        $scope.localingresar = JSON.parse(window.localStorage.getItem('local'));
        $scope.docenteingresar = JSON.parse(window.localStorage.getItem('destallesdescuento'));

        console.log( $scope.docenteingresar);

        $scope.objenew ={
            id_local:$scope.localingresar._id,
            nombre_local: $scope.localingresar.nombre,
            id_catalogo : x._id,
            descripcion : x.descripcion,
            valor_descuento: x.valor,
            nombre_docente:$scope.nombre_docente,
            id_docente:$scope.docenteingresar.R[0]._id

        };
        console.log($scope.objenew);
        $scope.listSeleccion.push($scope.objenew);





    }



    $scope.agreg_new=function(){

        var fecha = new Date();
        console.log(fecha);
        $scope.total =0;
        $scope.localingresar = JSON.parse(window.localStorage.getItem('local'));
        $scope.docenteingresar = JSON.parse(window.localStorage.getItem('destallesdescuento'));


        $scope.objenew ={
            id_local:$scope.localingresar._id,
            nombre_local: $scope.localingresar.nombre,
            id_catalogo : $scope.localingresar._id,
            descripcion : $scope.nombre_descuento_new,
            valor_descuento: $scope.valor_descuento_new,
            nombre_docente:$scope.nombre_docente,
            id_docente:$scope.docenteingresar.R[0]._id
        };
        console.log($scope.objenew);
        $scope.listAceptado.push($scope.objenew);
        for (var i=0; i < $scope.listAceptado.length;i++)
        {

            $scope.total = $scope.total + $scope.listAceptado[i].valor_descuento;

        }
        console.log( $scope.listdescuentosBorrar);
        console.log($scope.listAceptado);

    }

        $scope.AceptarLista=function(){

            console.log($scope.listadoDocentesSelect);

        console.log($scope.listSeleccion);


            $scope.localingresar = JSON.parse(window.localStorage.getItem('local'));


            for (var j=0;j<$scope.listadoDocentesSelect.length;j++){



        for (var i=0; i < $scope.listSeleccion.length;i++)
        {


            var objeto1 ={
                id_local:$scope.localingresar._id,
                nombre_local: $scope.localingresar.nombre,
                id_catalogo : $scope.localingresar._id,
                descripcion : $scope.listSeleccion[i].descripcion,
                valor_descuento: $scope.listSeleccion[i].valor,
                nombre_docente:$scope.listadoDocentesSelect[j].nombres+" "+$scope.listadoDocentesSelect[j].apellidos,
                id_docente:$scope.listadoDocentesSelect[j]._id,

            };


            $scope.listAceptado.push(objeto1);


        }
            }
        $scope.listSeleccion = [];
        $scope.initListarTipoDescuento_Des();

    }

    $scope.AceptarLista1=function(){
        console.log($scope.listSeleccion);


        for (var i=0; i < $scope.listSeleccion.length;i++)
        {

            $scope.listAceptado.push($scope.listSeleccion[i]);
            $scope.total = $scope.total + $scope.listSeleccion[i].valor_descuento;

        }
        console.log( $scope.listdescuentosBorrar);

        console.log($scope.listAceptado);
        $scope.listSeleccion = [];
        $scope.initListarTipoDescuento_Des();

    }




    $scope.AceptarListaDocente=function(){
        console.log($scope.listSeleccion);


        for (var i=0; i < $scope.listSeleccion.length;i++)
        {

            $scope.listAceptado.push($scope.listSeleccion[i]);
            $scope.total = $scope.total + $scope.listSeleccion[i].valor_descuento;

        }
        console.log( $scope.listdescuentosBorrar);

        console.log($scope.listAceptado);
        $scope.listSeleccion = [];
        $scope.initListarTipoDescuento_Des();

    }

    $scope.eliminarDescuentolist=function(x){
        console.log(x);

        var index = $scope.listAceptado.indexOf(x);

                  $scope.listAceptado.splice(index, 1);


          }

    $scope.AceptarDescuentos=function(){
        $scope.localingresar = JSON.parse(window.localStorage.getItem('local'));
        $scope.docenteingresar = JSON.parse(window.localStorage.getItem('docente'));


        $http({
            method: 'POST',
            url: myProvider.postSaveEstado_cuenta(),
            headers: {
                // 'Content-Type': 'application/json',
                //'Authorization': token
            },
            data: {

                id_docente: $scope.docenteingresar._id,
                id_usuario: $scope.docenteingresar._id,
                fecha_descuento:new Date(),
                valor_x_pagar: $scope.total,
                valor_pagado:100,
                valor_acarreo_mes_anterior:10,
                hora:new Date(),
                estado:1



            }


        }).then(function successCallback(response) {

            console.log(response.data);
            if (response.data.length == 0) {

                swal("Error!", "EL descuento no se ingreso correctamente!", "error");
            } else {

                swal("Exito!", "El descuento se ingreso correctamente!", "success");
                for (var i = 0; i<$scope.listAceptado.length;i++)
                {

                    $http({
                        method: 'POST',
                        url: myProvider.postSaveDescuento(),
                        headers: {
                            // 'Content-Type': 'application/json',
                            //'Authorization': token
                        },
                        data: {

                            id_catalogo:$scope.listAceptado[i].id_catalogo,
                            id_local:$scope.listAceptado[i].id_local,
                            nombre_local:$scope.listAceptado[i].nombre_local,
                            id_estado_cuenta:response.data._id,
                            descripcion:$scope.listAceptado[i].descripcion,
                            valor_descuento:$scope.listAceptado[i].valor_descuento,
                            cantidad:0,
                            fecha:response.data.frac_fecha



                        }


                    }).then(function successCallback(response) {
                        console.log(response.data);

                        if (response.data.length == 0) {


                        } else {



                        }


                    }, function errorCallback(response) {

                        alert('error al realizar Ingreso');

                    });



                }


            }


        }, function errorCallback(response) {

            alert('error al realizar Ingreso');

        });


    }
    $scope.listaaa = [];










    $scope.AceptarDescuentosxLocal=function(){
        

        $scope.localingresar = JSON.parse(window.localStorage.getItem('local'));
        var bandera = false;
        var fecha = new Date();
        var año = fecha.getFullYear();
        var mes = fecha.getMonth() + 1;
        var fecha_init = new Date(año + '-' + mes + '-1');
        var fecha_fin = new Date(año + '-' + mes + '-31');
        console.log(fecha_init);
        console.log(fecha_fin);

        if (mes<10){
            mes="0"+mes;
        }
        var  fechaU=mes+"/"+año;

        console.log("guardar descuentos");
console.log(fechaU);

        var n = $scope.listAceptado.length;
        var aux1=n;
        var b=0;
var i=0;

        console.log($scope.listAceptado);




        forRepetir(i);


        function forRepetir(x) {

            if(x==$scope.listAceptado.length)
            {

                swal("Exito!", "Se ingreso corectamente!", "success");
                $location.path("/Descuentos");
                
            }


            for (i=x;i<n;i++){

                $http({
                        method: 'POST',
                        url: myProvider.getEstadoCuentaxLocal() ,
                        headers: {
                            // 'Content-Type': 'application/json',
                            //'Authorization': token
                        },
                        data: {
                            
                            docente:$scope.listAceptado[i].id_docente
                            
                            
                        }


                    }).then(function successCallback(response) {

                        $scope.listEstado_cuenta_consulta = response.data[0];
                        console.log(response.data[0]);
                        console.log(i);
                        $scope.listaaa.push(response.data[0]);





                        if (typeof(response.data[0]) !== "undefined"){


                            console.log(response.data[0]);



                                console.log(b);
                                aux1=aux1-1;
                                console.log(aux1);
                                if (aux1==0){
                                    console.log(aux1);
                                    console.log(b);
                                    console.log($scope.listAceptado[b]);



                                    $http({
                                        method: 'POST',
                                        url: myProvider.postSaveDescuento(),
                                        headers: {
                                            // 'Content-Type': 'application/json',
                                            //'Authorization': token
                                        },
                                        data: {

                                            id_catalogo:$scope.listAceptado[b].id_catalogo,
                                            id_local:$scope.listAceptado[b].id_local,
                                            nombre_local:$scope.listAceptado[b].nombre_local,
                                            id_estado_cuenta:response.data[0]._id,
                                            descripcion:$scope.listAceptado[b].descripcion,
                                            valor_descuento:$scope.listAceptado[b].valor_descuento,
                                            cantidad:0,
                                            fecha:response.data[0].frac_fecha

                                        }


                                    }).then(function successCallback(response) {
                                        console.log(response.data);



                                    }, function errorCallback(response) {

                                        alert('error al realizar Ingreso');

                                    });


                                    var total = response.data[0].valor_x_pagar + $scope.listAceptado[b].valor_descuento;

                                    $http({

                                        method: 'PUT',
                                        url: myProvider.putEstado_cuenta()+"/"+response.data[0]._id,
                                        headers: {
                                            // 'Content-Type': 'application/json',
                                            //'Authorization': token
                                        },
                                        data: {

                                            valor_x_pagar: total



                                        }


                                    }).then(function successCallback(response) {

                                        console.log(response.data);

                                    }, function errorCallback(response) {

                                        alert('error al realizar Ingreso');

                                    });

                                    b++;

                                    forRepetir(b);

                                }
                                else {
                                    console.log(aux1);
                                    console.log(b);

                                    //siempre empieza aqui
                                    console.log($scope.listAceptado[b]);

                                    $http({
                                        method: 'POST',
                                        url: myProvider.postSaveDescuento(),
                                        headers: {
                                            // 'Content-Type': 'application/json',
                                            //'Authorization': token
                                        },
                                        data: {

                                            id_catalogo:$scope.listAceptado[b].id_catalogo,
                                            id_local:$scope.listAceptado[b].id_local,
                                            nombre_local:$scope.listAceptado[b].nombre_local,
                                            id_estado_cuenta:response.data[0]._id,
                                            descripcion:$scope.listAceptado[b].descripcion,
                                            valor_descuento:$scope.listAceptado[b].valor_descuento,
                                            cantidad:0,
                                            fecha:response.data[0].frac_fecha


                                        }


                                    }).then(function successCallback(response) {
                                        console.log(response.data);


                                    }, function errorCallback(response) {

                                        alert('error al realizar Ingreso');

                                    });




                                    var total = response.data[0].valor_x_pagar + $scope.listAceptado[b].valor_descuento;

                                    $http({

                                        method: 'PUT',
                                        url: myProvider.putEstado_cuenta()+"/"+response.data[0]._id,
                                        headers: {
                                            // 'Content-Type': 'application/json',
                                            //'Authorization': token
                                        },
                                        data: {

                                            valor_x_pagar: total



                                        }


                                    }).then(function successCallback(response) {

                                        console.log(response.data);

                                    }, function errorCallback(response) {

                                        alert('error al realizar Ingreso');

                                    });





                                    b++;

                                    forRepetir(b);

                                }







                        }else {

                            console.log("undefined");


                            //registro de nuevo estado de cuenta y agregar el descuento

                            console.log($scope.listAceptado[b]);

                                console.log(b);
                                aux1=aux1-1;
                                console.log(aux1);


                                console.log("aux faltante de resto:"+aux1);


                                crearNuevoEstadoCuenta(b);



                            b++;

                            








                        }








                    }, function errorCallback(response) {

                        alert('error al realizar Ingreso');

                    });





                break;



            }



        }




        console.log($scope.listaaa)




        function crearNuevoEstadoCuenta(b) {

            console.log(".........................................................................................................................................");


            var hoy = new Date();
            var dd = hoy.getDate();
            var mm = hoy.getMonth()+1; //hoy es 0!
            var yyyy = hoy.getFullYear();



            var mes = mm;

            if(mes<10) {
                mes='0'+mes
            }


            var fecha =yyyy+"-"+mes+'-'+dd+"T00:00:00.000Z";


            console.log(b);




            console.log("aqui empnieza al creaciond el nuevo ");

            $http({
                method: 'POST',
                url: myProvider.postSaveEstado_cuenta(),
                headers: {
                    // 'Content-Type': 'application/json',
                    //'Authorization': token
                },
                data: {

                    id_docente: $scope.listAceptado[b].id_docente,
                    id_usuario: $scope.listAceptado[b].id_docente,
                    fecha_descuento:fecha,
                    valor_x_pagar: $scope.listAceptado[b].valor_descuento,
                    valor_pagado:0,
                    valor_acarreo_mes_anterior:0,
                    hora:fecha,
                    frac_fecha:fecha,
                    estado:1

                }


            }).then(function successCallback(response) {


                console.log(response.data);
                console.log(b);

                if (response.data.length == 0) {

                    swal("Error!", "EL descuento no se ingreso correctamente!", "error");
                } else {

                    console.log($scope.listAceptado[b]);

                    $http({
                        method: 'POST',
                        url: myProvider.postSaveDescuento(),
                        headers: {
                            // 'Content-Type': 'application/json',
                            //'Authorization': token
                        },
                        data: {

                            id_catalogo:$scope.listAceptado[b].id_catalogo,
                            id_local:$scope.listAceptado[b].id_local,
                            nombre_local:$scope.listAceptado[b].nombre_local,
                            id_estado_cuenta:response.data._id,
                            descripcion:$scope.listAceptado[b].descripcion,
                            valor_descuento:$scope.listAceptado[b].valor_descuento,
                            cantidad:0,
                            fecha:response.data.frac_fecha

                        }


                    }).then(function successCallback(response) {
                        console.log(response.data);

                        console.log("creacion correcta nueva estado de cuenta con insercion del descuento");

                        b=b+1;

                        forRepetir(b);



                    }, function errorCallback(response) {

                        alert('error al realizar Ingreso');

                    });





                }


            }, function errorCallback(response) {

                alert('error al realizar Ingreso');

            });







        }




    }










    $scope.listdescuentosBorrar=[];
    $scope.initModificarDescuento=function(){

        $("#button1").hide();
        $("#button2").hide();

    console.clear();
        $scope.destallesdescuento = JSON.parse(window.localStorage.getItem('destallesdescuento'));
        console.log($scope.destallesdescuento);
        $http({
            method: 'GET',
            url: myProvider.getAllDescuentos()+"?id_estado_cuenta="+$scope.destallesdescuento._id,
            headers: {
                // 'Content-Type': 'application/json',
                //'Authorization': token
            },

        }).then(function successCallback(response) {
            console.log(response.data);

            if (response.data.length == 0) {

                swal("Advertencia!", "No existen descuentos en la BD!", "warning");
            } else {

                window.localStorage["listdescuentosBorrar"]= JSON.stringify(response.data);
                $scope.listAceptado = response.data;
                for (var i=0; i < $scope.listAceptado.length;i++)
                {

                    $scope.total = $scope.total + $scope.listAceptado[i].valor_descuento;

                }

            }


        }, function errorCallback(response) {

            alert('error al realizar Ingreso');

        });


    }

    $scope.seleccionarLocal=function(local){

        window.localStorage["local"]= JSON.stringify(local);
        console.log(local);
        $scope.nombre_local = local.nombre;

        if($scope.nombre_local == "APUNACH")
        {
            $("#button1").show();
            $("#button2").hide();
        }
        else {
            $("#button1").hide();
            $("#button2").show();
        }


    }

    $scope.listadoDocentesSelect=[];





    $scope.seleccionarDocentexLocal=function(docente){

       /*window.localStorage["docente"]= JSON.stringify(docente);
        console.log(docente);
        $scope.nombre_docente = docente.nombres+" "+ docente.apellidos;
        $scope.id_docente = docente._id;
*/


        var index = $scope.listadoDocentesSelect.indexOf(docente);

        console.log(index);



        if (index==-1){


            $scope.listadoDocentesSelect.push(docente);
            console.log($scope.listadoDocentesSelect);

        }else {



            $scope.listadoDocentesSelect.splice(index, 1);
            console.log($scope.listadoDocentesSelect);

        }


    }


    $scope.eliminarSelecionDocente=function(docente) {

        var index = $scope.listadoDocentesSelect.indexOf(docente);
        $scope.listadoDocentesSelect.splice(index, 1);

    }


    $scope.seleccionarDocentexLocal1=function(docente){

        window.localStorage["docente"]= JSON.stringify(docente);
        console.log(docente);
        $scope.nombre_docente = docente.nombres+" "+ docente.apellidos;


    }


    $scope.buscar=function(docente) {
        var bandera = false;
        var fecha = new Date();
        console.log(fecha);
        var año = fecha.getFullYear();
        var mes = fecha.getMonth() + 1;
        var fecha_init = new Date(año + '-' + mes + '-1');
        var fecha_fin = new Date(año + '-' + mes + '-31');
        console.log(fecha_init);
        console.log(fecha_fin);


        if($scope.listEstado_Docente.length != undefined)
        {
            for (var i = 0; i < $scope.listEstado_Docente.length; i++) {

                var fecha1 = $scope.listEstado_Docente[i].fecha_descuento.split("T");
                var fecha2 = fecha1[0];
                var fecha_desc = new Date(fecha2);
                console.log(fecha_desc);

                if ((docente._id == $scope.listEstado_Docente[i].id_docente) && (fecha_init <= fecha_desc <= fecha_fin)) {

                    bandera = true;
                }

            }
        }


        return (bandera);
    }
    $scope.seleccionarDocente=function(docente){


        if($scope.buscar(docente))
        {
            alert ("el descuento ya se encuetra ingresado para el mes actual, escoja ver detalle del decuento")
        }
        else {
            window.localStorage["docente"]= JSON.stringify(docente);
            console.log(docente);
            $scope.nombre_docente = docente.nombres +" "+docente.apellidos;
            $location.path("/IngresarDescuento");



        }



    }
    $scope.seleccionarLocalIngreso=function(local){



            window.localStorage["local"]= JSON.stringify(local);
            console.log(local);
            $scope.nombre_local = local.nombre;
            $location.path("/IngresarDescuentoxLocal");




    }
    $scope.initIngresoDescuento=function(){

        $scope.docenteingresar = JSON.parse(window.localStorage.getItem('docente'));
        $scope.nombre_docente = $scope.docenteingresar.nombres +" "+$scope.docenteingresar.apellidos;

    }
    $scope.initIngresoDescuentoxLocal=function(){

        console.log("cargarlista docentes");

        $("#button3").hide();
        $("#button4").hide();


        $scope.localingresar = JSON.parse(window.localStorage.getItem('local'));
        $scope.nombre_local = $scope.localingresar.nombre;

        console.log($scope.nombre_local);





        if($scope.nombre_local == "APUNACH")
        {

            $("#button3").show();
            $("#button4").hide();

        }
        else {

            $("#button3").hide();
            $("#button4").show();

        }

    }

    $scope.modificarDescuento=function(destallesdescuento){

        window.localStorage["destallesdescuento"]= JSON.stringify(destallesdescuento);
        $location.path("/ModificarDescuento");

    }


    $scope.modiDescuento=function(){

        $scope.localingresar = JSON.parse(window.localStorage.getItem('local'));
        $scope.destallesdescuento = JSON.parse(window.localStorage.getItem('destallesdescuento'));
        $scope.listdescuentosBorrar = JSON.parse(window.localStorage.getItem('listdescuentosBorrar'));

        ///Ingreso descuentos de la tabla descuentosborrados
        console.log($scope.listdescuentosBorrar);

        for (var i = 0; i<$scope.listdescuentosBorrar.length;i++) {
            console.log($scope.listdescuentosBorrar[i]);

            $http({
                method: 'POST',
                url: myProvider.postSaveDescuentoBorrar(),
                headers: {
                    // 'Content-Type': 'application/json',
                    //'Authorization': token
                },
                data: {

                    id_catalogo: $scope.listdescuentosBorrar[i].id_catalogo,
                    id_local: $scope.listdescuentosBorrar[i].id_local,
                    nombre_local: $scope.listdescuentosBorrar[i].nombre_local,
                    id_estado_cuenta: $scope.destallesdescuento._id,
                    descripcion: $scope.listdescuentosBorrar[i].descripcion,
                    valor_descuento: $scope.listdescuentosBorrar[i].valor_descuento,
                    cantidad: 0


                }


            }).then(function successCallback(response) {
                console.log(response.data);

                if (response.data.length == 0) {


                } else {


                }


            }, function errorCallback(response) {

                alert('error al realizar Ingreso');

            });
        }


///borrado descuentos de la tabla descuentos

        console.log($scope.listdescuentosBorrar);

        for (var i = 0; i<$scope.listdescuentosBorrar.length;i++)
        {

            $http({
                method: 'DELETE',
                url: myProvider.deleteDescuento()+"/"+$scope.listdescuentosBorrar[i]._id,
                headers: {
                    // 'Content-Type': 'application/json',
                    //'Authorization': token
                },
                data: {

                }


            }).then(function successCallback(response) {
                console.log(response.data);

            }, function errorCallback(response) {

                alert('error al realizar Ingreso');

            });



        }


     //modificar estado_cuenta y agregar nuevos descuentos



        $http({

            method: 'PUT',
            url: myProvider.putEstado_cuenta()+"/"+$scope.destallesdescuento._id,
            headers: {
                // 'Content-Type': 'application/json',
                //'Authorization': token
            },
            data: {


                //id_usuario: $scope.docenteingresar._id, IMPORTANTE INGRESAR
                valor_x_pagar: $scope.total,
                valor_pagado:100,
                valor_acarreo_mes_anterior:10,
                hora:new Date(),
                estado:1



            }


        }).then(function successCallback(response) {

            console.log(response.data);
            if (response.data.length == 0) {

                swal("Error!", "EL descuento no se ingreso correctamente!", "error");
            } else {

                swal("Exito!", "El descuento se ingreso correctamente!", "success");

                for (var i = 0; i<$scope.listAceptado.length;i++)
                {

                    $http({
                        method: 'POST',
                        url: myProvider.postSaveDescuento(),
                        headers: {
                            // 'Content-Type': 'application/json',
                            //'Authorization': token
                        },
                        data: {

                            id_catalogo:$scope.listAceptado[i].id_catalogo,
                            id_local:$scope.listAceptado[i].id_local,
                            nombre_local:$scope.listAceptado[i].nombre_local,
                            id_estado_cuenta:response.data._id,
                            descripcion:$scope.listAceptado[i].descripcion,
                            valor_descuento:$scope.listAceptado[i].valor_descuento,
                            cantidad:0,
                            fecha:response.data.frac_fecha


                        }


                    }).then(function successCallback(response) {
                        console.log(response.data);

                        if (response.data.length == 0) {


                        } else {



                        }


                    }, function errorCallback(response) {

                        alert('error al realizar Ingreso');

                    });



                }
                $location.path("/Descuentos");


            }


        }, function errorCallback(response) {

            alert('error al realizar Ingreso');

        });



    }

    $scope.cancelarIngresarDescuento=function(){
        console.log("hey");

        $location.path("/Descuentos");

    }
    $scope.newDescuento=function(){

        $location.path("/IngresarDescuento");

    }

    $scope.eliminarLocal=function(local){


        swal({
                title: "Eliminar Local",
                text: "Estas seguro que quieres eliminar el local?",
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
                        url: myProvider.putLocal()+"/"+local._id,
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

                            swal("Error!", "No se modifico el local!", "error");
                        } else {
                            swal("Exito!", "El local se modifico!", "success");
                            $scope.initListarLocal();

                        }


                    }, function errorCallback(response) {

                        alert('error al realizar Ingreso');

                    });


                } else {


                }
            });




    }

    //-------------------------------------------Prestamos Emergentes

    $scope.AceptarCreditoEmergente=function(){

        $scope.docenteingresar = JSON.parse(window.localStorage.getItem('docente'));



        console.log($scope.porcentaje);

var porcentaje=($scope.porcentaje/100);


        var totalInteres = $scope.valor_pres + $scope.valor_pres *porcentaje;

        var pago = (totalInteres / $scope.val_cuotas).toFixed(2);
        console.log(pago);




        var hoy = new Date();
        var dd = hoy.getDate();
        var mm = hoy.getMonth()+1; //hoy es 0!
        var yyyy = hoy.getFullYear();
        var mes = mm;



        if(mes<10) {
            mes='0'+mes
        }




        $http({                                            //Guardar el registro de Credito Emergente
            method: 'POST',
            url: myProvider.postSaveCredito_Emergente(),
            headers: {
                // 'Content-Type': 'application/json',
                //'Authorization': token
            },
            data: {

                valor:$scope.valor_pres,
                fecha_maxima_pago:new Date(),
                numero_cuotas:$scope.val_cuotas,
                usuario: $scope.docenteingresar._id,
                id_docente:$scope.docenteingresar._id,
                valor_a_pagar:pago,
                nombre_docente:$scope.docenteingresar.nombres +" "+ $scope.docenteingresar.apellidos,
                ci_docente:$scope.docenteingresar.cedula

            }


        }).then(function successCallback(response) {

            console.log(response.data);
            if (response.data.length == 0) {

                swal("Error!", "No se pudo registrar el credito, intentelo nuevamente!", "error");
            } else {

                swal("Exito!", "El credito emergente se registro correctamente!", "success");










                for(var i=0;i<$scope.val_cuotas;i++) {



                    var hoy = new Date();
                    var dd = hoy.getDate();
                    var mm = hoy.getMonth()+1; //hoy es 0!
                    var yyyy = hoy.getFullYear();
                    var yyyy1 = hoy.getFullYear();




                    var mes = mm+i;
                    var mes1 = mm+i+1;

                    console.log("mes de creacion :" +mes);






                    if(mes1<10) {
                        mes1='0'+mes1

                    }else {

                        if (mes1>12){
                            var auxf =mes1-12;

                            var anio= yyyy1+1;
                            mes1='0'+auxf;
                            yyyy1=anio;

                        }



                    }


                    if(mes<10) {
                        mes='0'+mes
                    }else {

                        if (mes>12){
                            var auxfr =mes-12;

                            var anio= yyyy+1;
                            mes='0'+auxfr;
                            yyyy=anio;


                        }


                    }

                    
                    ///probar q funcione el crear nuevos estados de cuenta segun el mes si se pasa de 12 

               //fecha inicio
                    var fecha =yyyy+"-"+mes+"-"+15+"T00:00:00.000Z";
                    //fecha fin

                    var fecha1 =yyyy1+"-"+mes1+"-"+15+"T00:00:00.000Z";

//fech actual q se crea en cada estado cuenta nuevo

                    var fecha2 =yyyy+"-"+mes+'-'+dd+"T00:00:00.000Z";





                    console.log(fecha);

                    $http({
                        method: 'POST',
                        url: myProvider.postSaveCuotas_credito(),   //Guardar las cuotas de credito
                        headers: {
                            // 'Content-Type': 'application/json',
                            //'Authorization': token
                        },
                        data: {

                            id_credito: response.data._id,
                            numero_cuotas: i,
                            valor_credito: pago,
                            fecha_max_pago: fecha1,
                            fecha_pago: fecha,
                            id_user: $scope.docenteingresar._id,
                            fragmento_fec:fecha2,
                            estado:"pendiente"

                        }


                    }).then(function successCallback(response) {




                        console.log(response.data);
                        var objeto = response.data;








                        console.log($scope.docenteingresar._id, response.data.fragmento_fec);


                        $http({
                                method: 'POST',
                                url: myProvider.getEstadoCuentaxLocal1() ,
                                headers: {
                                    // 'Content-Type': 'application/json',
                                    //'Authorization': token
                                },
                                data: {

                                    docente:$scope.docenteingresar._id,
                                    fecha: response.data.fecha_pago,
                                    fecha1:response.data.fecha_max_pago

                                }



                        }).then(function successCallback(response) {

                            console.log(response.data);

                            if (typeof(response.data[0]) !== "undefined") {


                                $scope.estado_cuenta = response.data[0]._id;
                                var total_anterior = response.data[0].valor_x_pagar;
                                console.log(objeto);

                                $http({
                                    method: 'POST',
                                    url: myProvider.postSaveDescuento(),    // guadar descuentos nuevos
                                    headers: {
                                        // 'Content-Type': 'application/json',
                                        //'Authorization': token
                                    },
                                    data: {

                                        id_catalogo: "5993682845f4a949eca9bddf",
                                        id_local: "5993682845f4a949eca9bddf",
                                        nombre_local: "APUNACH",
                                        id_estado_cuenta: response.data[0]._id,
                                        descripcion: "Credito Emergente",
                                        valor_descuento: objeto.valor_credito,
                                        cantidad: 0,
                                        fecha: response.data[0].frac_fecha


                                    }


                                }).then(function successCallback(response) {
                                    console.log(response.data);


                                    var total = objeto.valor_credito + total_anterior;
                                    console.log(total);
                                    $http({

                                        method: 'PUT',
                                        url: myProvider.putEstado_cuenta() + "/" + response.data.id_estado_cuenta, //MODIFICAR eSTADO CUENTA
                                        headers: {
                                            // 'Content-Type': 'application/json',
                                            //'Authorization': token
                                        },
                                        data: {


                                            //id_usuario: $scope.docenteingresar._id, IMPORTANTE INGRESAR

                                            valor_x_pagar: total,


                                        }


                                    }).then(function successCallback(response) {

                                        console.log(response.data);

                                    }, function errorCallback(response) {

                                        alert('error al realizar Ingreso 77');

                                    });


                                }, function errorCallback(response) {

                                    alert('error al realizar Ingreso yy');

                                });


                            }else {


                                console.log("undefined");



                                console.log(".........................................................................................................................................");









                                console.log("aqui empnieza al creaciond el nuevo ");

                                $http({
                                    method: 'POST',
                                    url: myProvider.postSaveEstado_cuenta(),
                                    headers: {
                                        // 'Content-Type': 'application/json',
                                        //'Authorization': token
                                    },
                                    data: {

                                        id_docente: $scope.docenteingresar._id,
                                        id_usuario: $scope.docenteingresar._id,
                                        fecha_descuento:fecha2,
                                        valor_x_pagar: objeto.valor_credito,
                                        valor_pagado:0,
                                        valor_acarreo_mes_anterior:0,
                                        hora:fecha2,
                                        frac_fecha:objeto.fragmento_fec,
                                        estado:1

                                    }


                                }).then(function successCallback(response) {


                                    console.log(response.data);


                                    if (response.data.length == 0) {

                                        swal("Error!", "EL descuento no se ingreso correctamente!", "error");
                                    } else {


                                        $http({
                                            method: 'POST',
                                            url: myProvider.postSaveDescuento(),
                                            headers: {
                                                // 'Content-Type': 'application/json',
                                                //'Authorization': token
                                            },
                                            data: {




                                                id_catalogo: "5993682845f4a949eca9bddf",
                                                id_local: "5993682845f4a949eca9bddf",
                                                nombre_local: "APUNACH",
                                                id_estado_cuenta: response.data._id,
                                                descripcion: "Credito Emergente",
                                                valor_descuento: objeto.valor_credito,
                                                cantidad: 0,
                                                fecha: response.data.frac_fecha

                                            }


                                        }).then(function successCallback(response) {
                                            console.log(response.data);

                                            console.log("creacion correcta nueva estado de cuenta con insercion del descuento");


                                        }, function errorCallback(response) {

                                            alert('error al realizar Ingreso');

                                        });





                                    }


                                }, function errorCallback(response) {

                                    alert('error al realizar Ingreso');

                                });





                            }




                        }, function errorCallback(response) {

                            alert('error al realizar Ingreso ss');

                        });


                        if (response.data.length == 0) {

                            swal("Error!", "No se pudo registrar el credito, intentelo nuevamente!", "error");

                        } else {

                            swal("Exito!", "El credito emergente se registro correctamente!", "success");
                            $scope.initListarCreditosEmergentes();

                        }




                    }, function errorCallback(response) {

                        alert('error al realizar Ingreso por aqui');

                    });


                }


            }


        }, function errorCallback(response) {

            alert('error al realizar Ingreso');

        });



    }

    $scope.initListarCreditosEmergentes=function(){
        console.log("que hay");

        //inicializar todos los usuarios
        $http({
            method: 'GET',
            url: myProvider.getAllCreditosEmergentes(),
            headers: {
                // 'Content-Type': 'application/json',
                //'Authorization': token
            },

        }).then(function successCallback(response) {
            console.log(response.data);

            if (response.data.length == 0) {

                swal("Advertencia!", "No existen Creditos Emergentes en la BD!", "warning");
            } else {

                $scope.listCreditosEmegentes = response.data;

            }


        }, function errorCallback(response) {

            alert('error al realizar Ingreso');

        });

        $timeout(function(){

            $('#tableCreditos').DataTable({
                "language": {
                    "url": "http://cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json"
                }


            });
        }, 500, false);


    }

    $scope.initListarVerCreditosEmergentes=function(){
        console.log("que hay");
        $scope.docenteConsulta  =  JSON.parse(window.localStorage.getItem('docenteConsultas'));
        console.log($scope.docenteConsulta[0].cedula);

        //inicializar todos los usuarios
        $http({
            method: 'GET',
            url: myProvider.getAllCreditosEmergentes()+"?ci_docente="+$scope.docenteConsulta[0].cedula,
            headers: {
                // 'Content-Type': 'application/json',
                //'Authorization': token
            },

        }).then(function successCallback(response) {
            console.log(response.data);

            if (response.data.length == 0) {

               // swal("Advertencia!", "No existen locales en la BD!", "warning");
            } else {

                $scope.listCreditosEmegentes = response.data;

            }


        }, function errorCallback(response) {

            alert('error al realizar Ingreso');

        });

        $timeout(function(){

            $('#tableCreditos').DataTable({
                "language": {
                    "url": "http://cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json"
                }


            });
        }, 500, false);


    }

    $scope.selectCredito=function(credito){


        $http({
            method: 'GET',
            url: myProvider.getAllCuotasxId_Cre()+"?id_credito="+credito._id,
            headers: {
                // 'Content-Type': 'application/json',
                //'Authorization': token
            },

        }).then(function successCallback(response) {
            console.log(response.data);

            if (response.data.length == 0) {

                swal("Advertencia!", "No existen docentes en la BD!", "warning");
            } else {

                $scope.listCuotas_Cred = response.data;
                console.log($scope.listCuotas_Cred);

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

    $scope.selectEstado_cuenta=function(list_estado){
        $scope.total = 0;
        $http({
            method: 'GET',
            url: myProvider.getAllDescuentos()+"?id_estado_cuenta="+list_estado._id,
            headers: {
                // 'Content-Type': 'application/json',
                //'Authorization': token
            },

        }).then(function successCallback(response) {
            console.log(response.data);

            if (response.data.length == 0) {

                swal("Advertencia!", "No existen descuentos en la BD!", "warning");
            } else {

                $scope.listAceptado = response.data;
                for (var i=0; i < $scope.listAceptado.length;i++)
                {

                    $scope.total = $scope.total + $scope.listAceptado[i].valor_descuento;

                }

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

    $scope.imprimir=function(){

        $location.path("/ImprimirReporte");



    }


    $scope.SaveDefinitivo=function () {


        






       var totalEstado=0;

        console.log("boton");

        console.log($scope.listEstado_Docente);

        for (var i = 0; i < $scope.listEstado_Docente.length; i++) {


            totalEstado+=$scope.listEstado_Docente[i].valor_x_pagar;

            $http({

                method: 'PUT',
                url: myProvider.putEstado_cuenta() + "/" + $scope.listEstado_Docente[i]._id,
                headers: {
                    // 'Content-Type': 'application/json',
                    //'Authorization': token
                },
                data: {

                    //id_usuario: $scope.docenteingresar._id, IMPORTANTE INGRESAR

                    estado: 2,

                }


            }).then(function successCallback(response) {

                console.log("cambio estado 2");

            }, function errorCallback(response) {

                alert('error al realizar Ingreso');

            });


        }




        $http({
            method: 'GET',
            url: myProvider.getEstadoUpdate(),
            headers: {
                // 'Content-Type': 'application/json',
                //'Authorization': token
            },

        }).then(function successCallback(response) {
            console.log(response.data);
            
        }, function errorCallback(response) {

            alert('error al realizar Ingreso');

        });







        
        $scope.cuentas=[];








        var fecha_del_sistema = $scope.fechaMesT;



            $http({
            method: 'GET',
            url: myProvider.getMesPrestamos(),
            headers: {
                // 'Content-Type': 'application/json',
                //'Authorization': token
            },

        }).then(function successCallback(response) {
            console.log(response.data[0]);

            var objeto={
                id_cuenta:response.data[0]._id,
                valor:response.data[0].valor,
                fecha:fecha_del_sistema,
                fecha_sistema:fecha_del_sistema,
                usuario: response.data[0]._id,
                estado:1
                
            }


            $scope.cuentas.push(objeto);

            $http({
                method: 'GET',
                url: myProvider.getMesCuotas(),
                headers: {
                    // 'Content-Type': 'application/json',
                    //'Authorization': token
                },

            }).then(function successCallback(response) {
                console.log(response.data[0]);

                var objeto={
                    id_cuenta:response.data[0]._id,
                    valor:response.data[0].valor,
                    fecha:fecha_del_sistema,
                    fecha_sistema:fecha_del_sistema,
                    usuario: response.data[0]._id,
                    estado:1

                }


                $scope.cuentas.push(objeto);


                 totales(totalEstado,fecha_del_sistema);



            }, function errorCallback(response) {

                alert('error al realizar Ingreso');

            });
            

        }, function errorCallback(response) {

            alert('error al realizar Ingreso');

        });


        //permite cambiar el estado del mes en parametros

        $http({
            method: 'PUT',
            url: myProvider.putParametros()+"/59c68df654fe692ae0bfae2f",
            headers: {
                // 'Content-Type': 'application/json',
                //'Authorization': token
            },
            data: {
                valor: 0
            }


        }).then(function successCallback(response) {
            console.log(response.data);




        }, function errorCallback(response) {

            alert('error al realizar Ingreso');

        });





        
        
        
//envios de correos



    }

    $scope.correo=function () {


        $http({
            method: 'GET',
            url: myProvider.getEnvioCorreos(),
            headers: {
                // 'Content-Type': 'application/json',
                //'Authorization': token
            },

        }).then(function successCallback(response) {
            console.log(response.data);
            var n = response.data.length;

            var ancho=100/n;

            console.log(ancho);
            var progreso=0;

            $scope.correosTotales=n;
            $scope.numero=0;

            for (var  i=0;i<response.data.length;i++){



                console.log( $scope.numero);

//aqui pasar datos de correo



            $http({
                method: 'POST',
                url: 'http://localhost:3000/mail/SendMail',
                headers: {
                    'Content-Type': 'application/json',
                    //'Authorization': token
                },
                data: {
                    "mail": response.data[i].correo_electronico,
                    "nombre": response.data[i].nombres,
                    "cedula": response.data[i].cedula,
                    "fecha": response.data[i].estadocuenta.fecha_descuento,
                    "valorPagar": response.data[i].estadocuenta.valor_x_pagar,
                    "valorArrastre": response.data[i].estadocuenta.valor_acarreo_mes_anterior,
                    "detalle": response.data[i].estadocuenta.descuentos
                }


            }).then(function successCallback(response) {
                console.log(response.data);


                    progreso += ancho;
                $('#bar1').css('width', progreso + '%');
                $scope.numero+=1;

            }, function errorCallback(response) {

                alert('error al realizar Ingreso');

            });
            }


        }, function errorCallback(response) {

            alert('error al realizar Ingreso');

        });






    }

function totales(totalEstado,fecha_del_sistema) {

    console.log($scope.cuentas,totalEstado);

    var locales=totalEstado-($scope.cuentas[0].valor+$scope.cuentas[1].valor);
    console.log(locales);

    
 





    var objeto={
        id_cuenta:"599f1d9034917b1ea454e64d",
        valor:locales,
        fecha:fecha_del_sistema,
        fecha_sistema:fecha_del_sistema,
        usuario: "599f1d9034917b1ea454e64d",
        estado:1

    }



    

    $scope.cuentas.push(objeto);

    console.log($scope.cuentas);







    $http({
        method: 'POST',
        url: myProvider.postCuentaIngresos(),
        headers: {
            // 'Content-Type': 'application/json',
            //'Authorization': token
        },
        data: $scope.cuentas


    }).then(function successCallback(response) {
        console.log(response.data);



    }, function errorCallback(response) {

        alert('error al realizar Ingreso');

    });

}

    function getBase64Image(img) {

        var canvas = document.createElement("canvas");

        canvas.width = img.width;
        canvas.height = img.height;
        var ctx = canvas.getContext("2d");

        ctx.drawImage(img, 0, 0);

        var dataURL = canvas.toDataURL("image/jpeg");

        return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");

    }
    var img = new Image();

    img.onload = function(){
        var dataURI = getBase64Image(img);
        return dataURI;

    }

    img.src = "images/grande.svg";

    //---------------------------------------------sello apunach

    function getBase64Image(img1) {

        var canvas = document.createElement("canvas");

        canvas.width = img1.width;
        canvas.height = img1.height;
        var ctx = canvas.getContext("2d");

        ctx.drawImage(img1, 0, 0);

        var dataURL = canvas.toDataURL("image/jpeg");

        return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");

    }
    var img1 = new Image();

    img1.onload = function(){
        var dataURI = getBase64Image(img1);
        return dataURI;

    }

    img1.src = "images/selloApunach.JPG";
    
    $scope.ReporteCuenta_estado=function(lista){

        if(lista.length == 0)
        {
            swal("Advertencia!", "No existen datos para imprimir!", "warning");
        }else {

            console.log(lista[0].fecha_descuento);

            var fecha = new Date(lista[0].fecha_descuento);
            var año = fecha.getFullYear();
            var mes = fecha.getMonth() + 1;
            var dia = fecha.getDate();
            if (mes < 10) {
                mes = '0' + mes
            }
            if (dia < 10) {
                dia = '0' + dia
            }

            var fecha1 = new Date();
            var año1 = fecha1.getFullYear();
            var mes1 = fecha1.getMonth() + 1;
            var dia1 = fecha1.getDate();
            if (mes1 < 10) {
                mes1 = '0' + mes1
            }
            if (dia1 < 10) {
                dia1 = '0' + dia1
            }
            console.log(dia1);

            var fecha_act = dia1 + '-' + mes1 + '-' + año1;
            var fecha_init = '01' + '-' + mes + '-' + año;
            var fecha_fin = '31' + '-' + mes + '-' + año;

            console.log(lista);


            var doc = new jsPDF('p', 'mm', [297, 210]);

            var x = 25;
            var y = 25;


            doc.addImage(img.onload(), 'PNG', x, y - 10, 15, 15);
            doc.addImage(img1.onload(), 'PNG', x + 148, y - 10, 18, 18);
            doc.setFontSize(16);
            doc.setFontType("bold");
            doc.text("REPORTE DE DESCUENTOS AL ROL DE PAGO ", x + 18, y + 0);
            doc.rect(x, y + 10, 165, 10, 'S')
            doc.setFontSize(10);
            doc.setFontType("bold");
            doc.text("LISTADO DE DOCENTES", x + 60, y + 16);

            doc.setFontSize(8);
            doc.setFontType("bold");
            doc.text("PERIODO: ", x, y + 25);
            doc.setFontType("normal");
            doc.text("desde " + fecha_init + " hasta " + fecha_fin, x + 15, y + 25);
            doc.setFontType("bold");
            doc.text("FECHA DE IMPRESION: ", x, y + 30);
            doc.setFontType("normal");
            doc.text(fecha_act, x + 33, y + 30);

            // doc.rect(x, y+35, 165,220, 'S')

            doc.setFontSize(10);
            doc.setFontType("bold");
            doc.text("Num", x + 1, y + 39);
            doc.text("Cedula", x + 20, y + 39);
            doc.text("Nombre Completo", x + 70, y + 39);
            doc.text("Monto", x + 140, y + 39);
            doc.line(x, y + 40, x + 165, y + 40);
            doc.line(x, y + 35, x + 165, y + 35);
            //verticales estaticas
            doc.line(x, y + 35, x, y + 40);
            doc.line(x + 10, y + 35, x + 10, y + 40);
            doc.line(x + 40, y + 35, x + 40, y + 40);
            doc.line(x + 130, y + 35, x + 130, y + 40);
            doc.line(x + 165, y + 35, x + 165, y + 40);

            doc.setFontSize(8);
            doc.setFontType("normal");
            var z = 44;
            var num = 1;
            var aun = 40;
            var prueba = 300;
            var b = 1;
            var registros = 0;

            for (var i = 0; i < lista.length; i++) {

                var fecha1 = lista[i].fecha_descuento.split("T");
                var fecha2 = fecha1[0];

                doc.text(num.toString(), x + 4, y + z);
                doc.text(lista[i].R[0].cedula, x + 18, y + z);
                doc.text(lista[i].R[0].nombres + " " + lista[i].R[0].apellidos, x + 65, y + z);
                doc.text(lista[i].valor_x_pagar.toString(), x + 141, y + z);
                z = z + 5;
                num = num + 1;
                doc.line(x, y + aun + 5, x + 165, y + aun + 5)
                aun = aun + 5;


                //lineas vertivales
                doc.line(x, y + aun - 5, x, y + aun);
                doc.line(x + 10, y + aun - 5, x + 10, y + aun);
                doc.line(x + 40, y + aun - 5, x + 40, y + aun);
                doc.line(x + 130, y + aun - 5, x + 130, y + aun);
                doc.line(x + 165, y + aun - 5, x + 165, y + aun);
                registros = registros + 1;

                if (i == 42) {

                    z = -1;
                    aun = -5;
                    doc.addPage();
                    doc.line(x, y + aun, x + 165, y + aun);
                    registros = 0;

                }
                if (registros == 50) {
                    b = b + 1;
                    z = -1;
                    aun = -5;
                    doc.addPage();
                    doc.line(x, y + aun, x + 165, y + aun);
                    registros = 0;


                }


            }

            doc.line(x + 10, y + aun + 30, x + 55, y + aun + 30);
            doc.text("Tes. de la APUNACH", x + 18, y + aun + 35);

            //doc.line(x+80, y+35, x+80,y+255)


            doc.save('Listado.pdf');
        }



    }

    $(document).ready(function() {
        $("#btnExport").click(function(e) {
            e.preventDefault();

            //getting data from our table
            var data_type = 'data:application/vnd.ms-excel';
            var table_div = document.getElementById('tableEstado_cuenta1');
            var table_html = table_div.outerHTML.replace(/ /g, '%20');

            var a = document.createElement('a');
            a.href = data_type + ', ' + table_html;
            a.download = 'lista_docentes' + Math.floor((Math.random() * 9999999) + 1000000) + '.xls';
            a.click();
        });
    });


    $scope.genrarReportesInit=function() {

        //$("#tableEstado_cuenta1").hide();
        var fecha = new Date();
        var año = fecha.getFullYear();
        var mes = fecha.getMonth() + 1;
        if(mes < 10)
        {
            mes = "0"+mes;
        }
        var fecha_init = año + '-' + mes;
        console.log(fecha_init);
        $scope.fecha_global = mes + '-' + año;
        document.getElementById("mes").value = fecha_init;



    }





    $scope.ReporteCierreMes=function(fecha) {

        console.log("cierre del mes");

        console.log(fecha);







        $http({
            method: 'POST',
            url: myProvider.VerIngresosMes(),
            headers: {
                // 'Content-Type': 'application/json',
                //'Authorization': token
            },
            data: {

                fecha:fecha



            }

        }).then(function successCallback(response) {
            console.log(response.data);

        $scope.listaMesIngresos=response.data;


        }, function errorCallback(response) {

            alert('error al realizar Ingreso');

        });




        $http({
            method: 'POST',
            url: myProvider.VerEgresosMes(),
            headers: {
                // 'Content-Type': 'application/json',
                //'Authorization': token
            },
            data: {

                fecha:fecha

            }

        }).then(function successCallback(response) {
            console.log(response.data);

            $scope.listaMesEgresos=response.data;


        }, function errorCallback(response) {

            alert('error al realizar Ingreso');

        });











    }
    
    $scope.fecha_buscar=function() {

       var fecha_para_consulta = $('#mes').val();
        var fecha = fecha_para_consulta.split("-");
        var año = fecha[0];
        var mes = fecha[1];
        var fecha_fin = mes+"/"+año;
        $scope.fecha_global = mes+"-"+año

        console.log(fecha_para_consulta);

var mesFecha = año+"-"+mes+"-";
        
        $scope.ReporteCierreMes(mesFecha);






        $http({
            method: 'POST',
            url: myProvider.VerEstadoCuentaFecha(),
            headers: {
                // 'Content-Type': 'application/json',
                //'Authorization': token
            },
            data: {

                frac_fecha:fecha_fin



            }

        }).then(function successCallback(response) {
            console.log(response.data);

            if (response.data.length == 0) {

                swal("Advertencia!", "No existen datos para este mes!", "warning");
                $scope.listEstado_Docente = response.data;
            } else {

                $scope.listEstado_Docente = response.data;

            }


        }, function errorCallback(response) {

            alert('error al realizar Ingreso');

        });

    }

    $scope.genera_tabla=function()  {


        var miArrayDeObjetos = [
            { CODE: "ORA-00001", ERROR: "unique constraint (string.string) violated", DATE: "2015-10-01" },
            { CODE: "ORA-00017", ERROR: "session requested to set trace event", DATE: "2015-10-29" },
            { CODE: "ORA-02142", ERROR: "missing or invalid ALTER TABLESPACE option", DATE: "2015-11-09" },
            { CODE: "ORA-19500", ERROR: "device block size string is invalid", DATE: "2015-11-14" }
        ];

        var miArrayDeObjetos1 = $scope.listEstado_Docente;
        console.log($scope.listEstado_Docente);

//comprobamos compatibilidad
        if(window.Blob && (window.URL || window.webkitURL)){
            var contenido = "",
                d = new Date(),
                blob,
                reader,
                save,
                clicEvent;
            //creamos contenido del archivo
            for (var i = 0; i < miArrayDeObjetos.length; i++) {
                //construimos cabecera del csv
                if (i == 0)
                    contenido += Object.keys(miArrayDeObjetos[i]).join(";") + "\n";
                //resto del contenido
                contenido += Object.keys(miArrayDeObjetos[i]).map(function(key){
                        return miArrayDeObjetos[i][key];
                    }).join(";") + "\n";
            }
            //creamos el blob
            blob =  new Blob(["\ufeff", contenido], {type: 'text/csv'});
            //creamos el reader
            var reader = new FileReader();
            reader.onload = function (event) {
                //escuchamos su evento load y creamos un enlace en dom
                save = document.createElement('a');
                save.href = event.target.result;
                save.target = '_blank';
                //aquí le damos nombre al archivo
                save.download = "log_"+ d.getDate() + "_" + (d.getMonth()+1) + "_" + d.getFullYear() +".csv";
                try {
                    //creamos un evento click
                    clicEvent = new MouseEvent('click', {
                        'view': window,
                        'bubbles': true,
                        'cancelable': true
                    });
                } catch (e) {
                    //si llega aquí es que probablemente implemente la forma antigua de crear un enlace
                    clicEvent = document.createEvent("MouseEvent");
                    clicEvent.initEvent('click', true, true);
                }
                //disparamos el evento
                save.dispatchEvent(clicEvent);
                //liberamos el objeto window.URL
                (window.URL || window.webkitURL).revokeObjectURL(save.href);
            }
            //leemos como url
            reader.readAsDataURL(blob);
        }else {
            //el navegador no admite esta opción
            alert("Su navegador no permite esta acción");
        }

    }

    $scope.ReporteCuenta_estadoEcxel=function(lista){

        var miArrayDeObjetos = [];

        for (var i = 0; i < lista.length; i++) {

            miArrayDeObjetos[i]={Num : i + 1,
                Cedulas: lista[i].R[0].cedula,
                Nombre_Completo: lista[i].R[0].apellidos + " " + lista[i].R[0].nombres,
                Monto: lista[i].valor_x_pagar


            }


        }


        console.log(miArrayDeObjetos);

        if(window.Blob && (window.URL || window.webkitURL)){
            var contenido = "",
                d = new Date(),
                blob,
                reader,
                save,
                clicEvent;
            //creamos contenido del archivo
            for (var i = 0; i < miArrayDeObjetos.length; i++) {
                //construimos cabecera del csv
                if (i == 0)
                    contenido += Object.keys(miArrayDeObjetos[i]).join(";") + "\n";
                //resto del contenido
                contenido += Object.keys(miArrayDeObjetos[i]).map(function(key){
                        return miArrayDeObjetos[i][key];
                    }).join(";") + "\n";
            }
            //creamos el blob
            blob =  new Blob(["\ufeff", contenido], {type: 'text/csv'});
            //creamos el reader
            var reader = new FileReader();
            reader.onload = function (event) {
                //escuchamos su evento load y creamos un enlace en dom
                save = document.createElement('a');
                save.href = event.target.result;
                save.target = '_blank';
                //aquí le damos nombre al archivo
                save.download = "Estado_cuenta_"+ d.getDate() + "_" + (d.getMonth()+1) + "_" + d.getFullYear() +".csv";
                try {
                    //creamos un evento click
                    clicEvent = new MouseEvent('click', {
                        'view': window,
                        'bubbles': true,
                        'cancelable': true
                    });
                } catch (e) {
                    //si llega aquí es que probablemente implemente la forma antigua de crear un enlace
                    clicEvent = document.createEvent("MouseEvent");
                    clicEvent.initEvent('click', true, true);
                }
                //disparamos el evento
                save.dispatchEvent(clicEvent);
                //liberamos el objeto window.URL
                (window.URL || window.webkitURL).revokeObjectURL(save.href);
            }
            //leemos como url
            reader.readAsDataURL(blob);
        }else {
            //el navegador no admite esta opción
            alert("Su navegador no permite esta acción");
        }



    }


    $scope.ReporteConsolidado=function(){

        $http({
            method: 'GET',
            url: myProvider.getConsolidado(),
            headers: {
                // 'Content-Type': 'application/json',
                //'Authorization': token
            },

        }).then(function successCallback(response) {




        }, function errorCallback(response) {

            alert('error al realizar Ingreso');

        });
        
    }


    $scope.ReporteCerrar_mes=function(lista){

        var miArrayDeObjetos = [];

        for (var i = 0; i < lista.length; i++) {

            miArrayDeObjetos[i]={Num : i + 1,
                Cedulas: lista[i].R[0].cedula,
                Nombre_Completo: lista[i].R[0].apellidos + " " + lista[i].R[0].nombres,
                Monto: lista[i].valor_x_pagar


            }


        }


        console.log(miArrayDeObjetos);

        if(window.Blob && (window.URL || window.webkitURL)){
            var contenido = "",
                d = new Date(),
                blob,
                reader,
                save,
                clicEvent;
            //creamos contenido del archivo
            for (var i = 0; i < miArrayDeObjetos.length; i++) {
                //construimos cabecera del csv
                if (i == 0)
                    contenido += Object.keys(miArrayDeObjetos[i]).join(";") + "\n";
                //resto del contenido
                contenido += Object.keys(miArrayDeObjetos[i]).map(function(key){
                        return miArrayDeObjetos[i][key];
                    }).join(";") + "\n";
            }
            //creamos el blob
            blob =  new Blob(["\ufeff", contenido], {type: 'text/csv'});
            //creamos el reader
            var reader = new FileReader();
            reader.onload = function (event) {
                //escuchamos su evento load y creamos un enlace en dom
                save = document.createElement('a');
                save.href = event.target.result;
                save.target = '_blank';
                //aquí le damos nombre al archivo
                save.download = "Estado_cuenta_"+ d.getDate() + "_" + (d.getMonth()+1) + "_" + d.getFullYear() +".csv";
                try {
                    //creamos un evento click
                    clicEvent = new MouseEvent('click', {
                        'view': window,
                        'bubbles': true,
                        'cancelable': true
                    });
                } catch (e) {
                    //si llega aquí es que probablemente implemente la forma antigua de crear un enlace
                    clicEvent = document.createEvent("MouseEvent");
                    clicEvent.initEvent('click', true, true);
                }
                //disparamos el evento
                save.dispatchEvent(clicEvent);
                //liberamos el objeto window.URL
                (window.URL || window.webkitURL).revokeObjectURL(save.href);
            }
            //leemos como url
            reader.readAsDataURL(blob);
        }else {
            //el navegador no admite esta opción
            alert("Su navegador no permite esta acción");
        }



    }


    $scope.AgregarMes=function(){

        //permite cambiar el estado del mes en parametros


        $http({
            method: 'PUT',
            url: myProvider.putParametros()+"/59c68df654fe692ae0bfae2f",
            headers: {
                // 'Content-Type': 'application/json',
                //'Authorization': token
            },
            data: {
                valor: 1
            }


        }).then(function successCallback(response) {
            console.log(response.data);

        }, function errorCallback(response) {

            alert('error al realizar Ingreso');

        });



        $http({
            method: 'GET',
            url: myProvider.getAllDocentes()+"?estado=0&&miembro_asociacion=Si",
            headers: {
                // 'Content-Type': 'application/json',
                //'Authorization': token
            },

        }).then(function successCallback(response) {
            console.log(response.data);

            if (response.data.length == 0) {

                swal("Advertencia!", "No existen docentes en la BD!", "warning");
            } else {

                $scope.listAceptado = response.data;



                ////////////////////////Inicio////////////////////////////
                $scope.localingresar = JSON.parse(window.localStorage.getItem('local'));
                var bandera = false;
                var fecha = new Date();
                var año = fecha.getFullYear();
                var mes = fecha.getMonth() + 1;
                var fecha_init = new Date(año + '-' + mes + '-1');
                var fecha_fin = new Date(año + '-' + mes + '-31');
                console.log(fecha_init);
                console.log(fecha_fin);

                if (mes<10){
                    mes="0"+mes;
                }
                var  fechaU=mes+"/"+año;

                console.log("guardar descuentos");
                console.log(fechaU);

                var n = $scope.listAceptado.length;
                var aux1=n;
                var b=0;
                var i=0;

                console.log($scope.listAceptado);
                
                forRepetir(i);


                function forRepetir(x) {

                    if(x==$scope.listAceptado.length)
                    {
                        $scope.initDescuentos()
                        $scope.initListarDescuentos();

                    }



                    for (i=x;i<n;i++){

                


                        $http({
                                method: 'POST',
                                url: myProvider.getEstadoCuentaxLocal() ,
                                headers: {
                                    // 'Content-Type': 'application/json',
                                    //'Authorization': token
                                },
                                data: {

                                    docente:$scope.listAceptado[i].id_docente


                                }
                            


                        }).then(function successCallback(response) {

                            $scope.listEstado_cuenta_consulta = response.data[0];
                            console.log(response.data[0]);
                            console.log(i);
                            $scope.listaaa.push(response.data[0]);




                            if (typeof(response.data[0]) !== "undefined"){


                                console.log(response.data[0]);

                                console.log(b);
                                aux1=aux1-1;
                                console.log(aux1);
                                if (aux1==0){
                                    console.log(aux1);
                                    console.log(b);
                                    console.log($scope.listAceptado[b]);



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
                                            id_estado_cuenta:response.data[0]._id,
                                            descripcion:"Valor cuota inicial",
                                            valor_descuento:$scope.listAceptado[b].valor_cuota,
                                            cantidad:0,
                                            fecha:response.data[0].frac_fecha

                                        }


                                    }).then(function successCallback(response) {
                                        console.log(response.data);



                                    }, function errorCallback(response) {

                                        alert('error al realizar Ingreso');

                                    });


                                    var total = response.data[0].valor_x_pagar + $scope.listAceptado[b].valor_cuota;

                                    console.log("antes de actulizar "+response.data[0].valor_x_pagar + $scope.listAceptado[b].valor_cuota);

                                    $http({

                                        method: 'PUT',
                                        url: myProvider.putEstado_cuenta()+"/"+response.data[0]._id,
                                        headers: {
                                            // 'Content-Type': 'application/json',
                                            //'Authorization': token
                                        },
                                        data: {

                                            valor_x_pagar: total



                                        }


                                    }).then(function successCallback(response) {

                                        console.log(response.data);
                                        swal("Exito!", "El mes se creo corectamente!", "success");




                                    }, function errorCallback(response) {

                                        alert('error al realizar Ingreso');

                                    });

                                    b++;

                                    forRepetir(b);

                                }
                                else {
                                    console.log(aux1);
                                    console.log(b);

                                    //siempre empieza aqui
                                    console.log($scope.listAceptado[b]);

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
                                            id_estado_cuenta:response.data[0]._id,
                                            descripcion:"Valor cuota inicial",
                                            valor_descuento:$scope.listAceptado[b].valor_cuota,
                                            cantidad:0,
                                            fecha:response.data[0].frac_fecha


                                        }


                                    }).then(function successCallback(response) {
                                        console.log(response.data);


                                    }, function errorCallback(response) {

                                        alert('error al realizar Ingreso');

                                    });




                                    var total = response.data[0].valor_x_pagar + $scope.listAceptado[b].valor_cuota;

                                    console.log("antes de actulizar "+response.data[0].valor_x_pagar + $scope.listAceptado[b].valor_cuota);

                                    $http({

                                        method: 'PUT',
                                        url: myProvider.putEstado_cuenta()+"/"+response.data[0]._id,
                                        headers: {
                                            // 'Content-Type': 'application/json',
                                            //'Authorization': token
                                        },
                                        data: {

                                            valor_x_pagar: total



                                        }


                                    }).then(function successCallback(response) {

                                        console.log(response.data);
                                        swal("Exito!", "El mes se creo corectamente!", "success");


                                    }, function errorCallback(response) {

                                        alert('error al realizar Ingreso');

                                    });





                                    b++;

                                    forRepetir(b);

                                }



                            }else {


                                //registro de nuevo estado de cuenta y agregar el descuento

                                console.log($scope.listAceptado[b]);

                                console.log(b);
                                aux1=aux1-1;
                                console.log(aux1);


                                console.log("aux faltante de resto:"+aux1);


                                crearNuevoEstadoCuenta(b);



                                b++;





                            }








                        }, function errorCallback(response) {

                            alert('error al realizar Ingreso');

                        });





                        break;



                    }



                }




                console.log($scope.listaaa)




                function crearNuevoEstadoCuenta(b) {

                    console.log(".........................................................................................................................................");
                    var hoy = new Date();
                    var dd = "28";
                    var mm = hoy.getMonth()+1; //hoy es 0!
                    var yyyy = hoy.getFullYear();

                    var mes = mm;

                    if(mes<10) {
                        mes='0'+mes
                    }

                    var fecha = mes+'/'+dd+'/'+yyyy;
                    var fecha1 = mes+'/'+yyyy;


                    console.log(b);
                    console.log($scope.listAceptado[b]._id);
                    console.log($scope.listAceptado[b].valor_descuento);





                    console.log("aqui empnieza al creaciond el nuevo ");

                    $http({
                        method: 'POST',
                        url: myProvider.postSaveEstado_cuenta(),
                        headers: {
                            // 'Content-Type': 'application/json',
                            //'Authorization': token
                        },
                        data: {

                            id_docente: $scope.listAceptado[b]._id,
                            id_usuario: $scope.listAceptado[b]._id,
                            fecha_descuento:fecha,
                            valor_x_pagar: $scope.listAceptado[b].valor_cuota,
                            valor_pagado:0,
                            valor_acarreo_mes_anterior:0,
                            hora:fecha,
                            frac_fecha:fecha,
                            estado:1

                        }


                    }).then(function successCallback(response) {


                        console.log(response.data);
                        console.log(b);

                        if (response.data.length == 0) {

                            swal("Error!", "EL descuento no se ingreso correctamente!", "error");
                        } else {

                            console.log($scope.listAceptado[b]);

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
                                    descripcion:"Valor cuota inicial",
                                    valor_descuento:$scope.listAceptado[b].valor_cuota,
                                    cantidad:0,
                                    fecha:response.data.frac_fecha

                                }


                            }).then(function successCallback(response) {
                                console.log(response.data);

                                console.log("creacion correcta nueva estado de cuenta con insercion del descuento");

                                b=b+1;

                                forRepetir(b);



                            }, function errorCallback(response) {

                                alert('error al realizar Ingreso');

                            });





                        }


                    }, function errorCallback(response) {

                        alert('error al realizar Ingreso');

                    });


                }







            }


        }, function errorCallback(response) {

            alert('error al realizar Ingreso');

        });










    }




}]);
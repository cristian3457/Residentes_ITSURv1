
$(document).ready(function () {
    // Se obtienen los cotroles del formulario y se almacenan en variables para un mejor manejo
    var txtEmpresa = document.getElementById("contenido_txtEmpresa");
    var txtEmail = document.getElementById("contenido_txtEmail");
    var txtDomicilio = document.getElementById("contenido_txtDomicilio");
    var txtCP = document.getElementById("contenido_txtCP");
    var txtTelefono = document.getElementById("contenido_txtTelefono");
    var txtMision = document.getElementById("contenido_txtMision");
    var rbtnSectorPublico = document.getElementById("contenido_RadioPublico");
    var rbtnSectorPrivado = document.getElementById("contenido_RadioPrivado");
    var rbtnRamoIndustrial = document.getElementById("contenido_RadioIndustrial");
    var rbtnRamoServicios = document.getElementById("contenido_RadioServicios");
    var rbtnRamoOtro = document.getElementById("contenido_RadioOtro");
    // variables que almacenan expresiones regulares que tienen que cumplir algunos campos del formulario
    var validarCP = /(^([0-9]{5,5})|^)$/
    var validarEmail = new RegExp("^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.([a-zA-Z]{2,4})+$");
    var validarTelefono = /^[(]{0,1}[+]*[0-9]{2,2}[)]{0,1}[-\s\./0-9]*$/g;
    // Función que se dispara cuando se presiona el boton con el id btnRegistrar que tiene el texto Registrar
    $("#btnRegistrar").click(function () {
        // Este código pregunta si se el formulario ha cumplido con los requisitos de cada campo o no
        $("#FrmRegistrarDatos").data('bootstrapValidator').validate();
        // Se entra a esta validación si se cumplen los requisitos de cada campo del formulario
        if ($("#FrmRegistrarDatos").data('bootstrapValidator').isValid()) {
            // Variables que contienen el texto que el usuario ingreso en cada campo del formulario
            var empresa = txtEmpresa.value.trim();
            var email = txtEmail.value.trim();
            var cp = txtCP.value.trim();
            var domicilio = txtDomicilio.value.trim();
            var telefono = txtTelefono.value.trim();
            var mision = txtMision.value.trim();
            var sectorPublico = rbtnSectorPublico.checked;
            var sectorPrivado = rbtnSectorPrivado.checked;
            var ramoIndustrial = rbtnRamoIndustrial.checked;
            var ramoServicios = rbtnRamoServicios.checked;
            var ramoOtro = rbtnRamoOtro.checked;
            var id_estado = document.getElementById('contenido_ddlEstado').value;
            var id_municipio = document.getElementById('contenido_ddlMunicipio').value;
            // Esta variable almacena al boton con el id btnAceptar
            var btnAceptar = document.getElementById("btnAceptar");
            // Escuchador que se dispara cuando se presiona el boton con el id btnAceptar y cierra el modal
            btnAceptar.addEventListener('click', cerrar_modal);
            // Variables que almacenaran el giro y el sector que se haya seleccionado, las variables se llenaran de acuero
            // a la condición que se cumpla dependiendo del sector o giro que se haya seleccionado y sea igual a tru
            var giro = "";
            var sector = "";
            if (sectorPublico) {
                sector = "Público";
            }
            else if (sectorPrivado) {
                sector = "Privado";
            }
            if (ramoIndustrial) {
                giro = "Industrial";
            }
            else if (ramoOtro) {
                giro = "Otro";
            }
            else if (ramoServicios) {
                giro = "Servicios";
            }
            // Se arma el objeto json que sera pasado a la petición ajax que ejecutara la instrucción para 
            // registrar los datos de contacto de la empresa
            let obj = {}; obj.nombre = empresa; obj.email = email; obj.id_estado = id_estado; obj.id_municipio = id_municipio;
            obj.codigo_postal = cp; obj.domicilio = domicilio; obj.giro = giro; obj.sector = sector;
            obj.telefono = telefono; obj.mision = mision;
            var json = "{'info' : '" + JSON.stringify(obj) + "'}";
            // Esta variable almacena al boton con el id btnRegistrar
            var btn = document.getElementById("btnRegistrar");
            // Si el valor del boton es igual a Registrar se entra a esta validación y se hace la petición ajax que ejecutara
            // el servicio web insert para registrar los datos de contacto de la empresa, el administrador registra los datos
            if (btn.value == "Registrar") {
                $.ajax({
                    type: 'POST',
                    url: 'ws/WSDatosContacto.asmx/insert',
                    data: json,
                    contentType: 'application/json; utf-8',
                    dataType: 'json',
                    success: function (data) {
                        if (parseInt(data.d) > 0) {
                            $('#mdlInformacion').modal('show');
                        }
                        else {
                            $("#msgError").text("HA OCURRIDO UN ERROR, POR FAVOR VUELVELO A INTENTAR");
                            $("#mdlError").modal().show();
                        }
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        if (jqXHR.responseJSON.ExceptionType == "System.Exception") {
                            $("#msgError").text(jqXHR.responseJSON.Message);
                            $("#mdlError").modal().show();
                        } else if (jqXHR.responseJSON.ExceptionType == "System.Security.SecurityException") {
                            Response.load("FrmLogin.aspx");
                        }
                    }
                });
            }
             // Si el valor del boton es igual a Editar se entra a esta validación y se hace la petición ajax que ejecutara
            // el servicio web update que actualizara los datos de contacto de la empresa
            else if (btn.value == "Editar") {
                // Variable que almacena el texto que contenga la variable de sesion id_empresa 
                id = localStorage.getItem("id_empresa");
                // Entra a esta validación si el contenido de la variable id es diferente de null
                if (id != null) {
                    // Se arma el objeto json que sera pasado a la petición ajax
                    let obj = {}; obj.id_empresa = id; obj.nombre = empresa; obj.email = email; obj.id_estado = id_estado; obj.id_municipio = id_municipio;
                    obj.codigo_postal = cp; obj.domicilio = domicilio; obj.giro = giro; obj.sector = sector;
                    obj.telefono = telefono; obj.mision = mision;
                    var json = "{'info' : '" + JSON.stringify(obj) + "'}";
                    $.ajax({
                        type: 'POST',
                        url: 'ws/WSDatosContacto.asmx/update',
                        data: json,
                        contentType: 'application/json; utf-8',
                        dataType: 'json',
                        success: function (data) {
                            if (data.d) {
                                $('#mdlInformacion').modal('show');
                                localStorage.removeItem("id_empresa");
                            }
                            else {
                                $("#msgError").text("HA OCURRIDO UN ERROR, POR FAVOR VUELVELO A INTENTAR");
                                $("#mdlError").modal().show();
                            }
                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                            if (jqXHR.responseJSON.ExceptionType == "System.Exception") {
                                $("#msgError").text(jqXHR.responseJSON.Message);
                                $("#mdlError").modal().show();
                            } else if (jqXHR.responseJSON.ExceptionType == "System.Security.SecurityException") {
                                Response.load("FrmLogin.aspx");
                            }
                        }
                    });
                } // Entra a esta validación si el valor de la variable id es igual a null y se van a registrar los datos de la
                // empresa, en esta validación es cuando la empresa se logueo y va registrar sus propios datps
                else if (id == null) {
                    var email_usuario = $("#contenido_txtEmailUsuario").val();
                    // Se arma el objeto json que sera pasado a la petición ajax
                    let obj = {};obj.nombre = empresa; obj.email = email; obj.id_estado = id_estado; obj.id_municipio = id_municipio;
                    obj.codigo_postal = cp; obj.domicilio = domicilio; obj.giro = giro; obj.sector = sector;
                    obj.telefono = telefono; obj.mision = mision; obj.email_usuario = email_usuario; 
                    var json = "{'info' : '" + JSON.stringify(obj) + "'}";
                    $.ajax({
                        type: 'POST',
                        url: 'ws/WSDatosContacto.asmx/updatePorEmail',
                        data: json,
                        contentType: 'application/json; utf-8',
                        dataType: 'json',
                        success: function (data) {
                            if (data.d) {
                                $('#mdlInformacion').modal('show');
                            }
                            else {
                                $("#msgError").text("HA OCURRIDO UN ERROR, POR FAVOR VUELVELO A INTENTAR");
                                $("#mdlError").modal().show();
                            }
                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                            if (jqXHR.responseJSON.ExceptionType == "System.Exception") {
                                $("#msgError").text(jqXHR.responseJSON.Message);
                                $("#mdlError").modal().show();
                            } else if (jqXHR.responseJSON.ExceptionType == "System.Security.SecurityException") {
                                Response.load("FrmLogin.aspx");
                            }
                        }
                    });
                }
            }
        }

    });
        // Código que verifica que cada campo del formulario cumpla con lo que se especifica dentro de esta función
    $('#FrmRegistrarDatos').bootstrapValidator({
        framework: 'bootstrap',
        excluded: [':disabled', ':hidden'],
        fields: {
            ctl00$contenido$txtEmpresa: {
                message: 'Nombre de la Empresa no valido',
                validators: {
                    notEmpty: {
                        message: 'Este campo es obligatorio y no debe estar vacio.'
                    },
                    regexp: {
                        regexp: /^[a-zA-Z\s0-9]+$/,
                        message: 'Se debe colocar un nombre valido y no puede tener caracteres especiales.'
                    },
                    stringLength: {
                        min: 5,
                        max: 60,
                        message: 'El nombre de la empresa debe tener entre 5 y 60 caracteres'
                    }
                }
            },
            ctl00$contenido$txtEmail: {
                message: 'Email no valido',
                validators: {
                    notEmpty: {
                        message: 'Este campo es obligatorio y no debe estar vacio.'
                    },
                    regexp: {
                        regexp: /^([\w-]+\.)*?[\w-]+@[\w-]+\.([\w-]+\.)*?[\w]+$/,
                        message: 'El Email no es valido un ejmeplo es: ejemplo@emplo.com'
                    }
                }
            },
            ctl00$contenido$ddlEstado: {
                validators: {
                    notEmpty: {
                        message: 'Debes seleccionar un estado de la lista desplegable.'
                    },
                    callback: {
                        message: 'Se debe seleccionar un estado.',

                        callback: function (value, validator, $field) {
                            return (value > 0 && value < 33);
                        }
                    }
                }
            },
            ctl00$contenido$ddlMunicipio: {
                validators: {
                    notEmpty: {
                        message: 'Debes seleccionar un municipio de la lista desplegable.'
                    },
                    callback: {
                        message: 'Se debe seleecionar un municipio.',

                        callback: function (value, validator, $field) {
                            return (value > 0 && value < 2279);
                        }
                    }
                }
            },
            ctl00$contenido$txtCP: {
                message: 'Codigo postal no valido.',
                validators: {
                    notEmpty: {
                        message: 'Este campo es obligatorio y no debe estar vacio.'
                    },
                    regexp: {
                        regexp: /(^([0-9]{5,5})|^)$/,
                        message: 'El código postal se debe componer de 5 dígitos numéricos'
                    }
                }
            },
            ctl00$contenido$txtDomicilio: {
                message: 'Domicilio no valido',
                validators: {
                    notEmpty: {
                        message: 'Este campo es obligatorio y no debe estar vacio.'
                    },
                    regexp: {
                        regexp: /^[a-zA-Z\s]+([#]?[0-9\s]{1,4})?([a-zA-Z\s]{1,1})?$/,
                        message: 'La direccion debe contener al menos 5 caracteres y debe iniciar con letras ej: itsur ó itsur#23 ó itsur#1234A'
                    },
                    stringLength: {
                        min: 5,
                        max: 80,
                        message: 'La longitud del domicilio de ser entre 5 y 80 caracteres'
                    }
                }
            },
            ctl00$contenido$Giro: {
                validators: {
                    notEmpty: {
                        message: 'Es necesario indicar que tipo de GIRO tiene la empresa.'
                    },
                    callback: {
                        message: 'Es necesario indicar que tipo de GIRO tiene la empresa',
                        callback: function (value, validator, $field) {
                            return (value.length > 3 || value.length < 11);
                        }
                    }
                }
            },
            ctl00$contenido$Sector: {
                validators: {
                    notEmpty: {
                        message: 'Es necesario indicar de que tipo de sector es la empresa'
                    },
                    callback: {
                        message: 'Es necesario indicar el tipo de sector de la empresa',

                        callback: function (value, validator, $field) {
                            return (value.length > 6 || value.length < 11);
                        }
                    }
                }
            },
            ctl00$contenido$txtTelefono: {
                message: 'El Telefono no es valido',
                validators: {
                    notEmpty: {
                        message: 'Este campo es obligatorio y no debe estar vacio.'
                    },
                    phone: {
                        country: 'US',
                        message: 'El número de teléfono no es valido, solo debe contener 10 digitos numéricos'
                    }
                }
            }, ctl00$contenido$txtMision: {
                message: 'Mision no valida',
                validators: {
                    notEmpty: {
                        message: 'Este campo es obligatorio y no debe estar vacio.'
                    },
                    regexp: {
                        regexp: /^[a-zA-Z\s]+$/,
                        message: 'La mision debe ser valida y solamente se admiten letras'
                    },
                    stringLength: {
                        min: 5,
                        max: 100,
                        message: 'Indica las características más importantes de la mision con una longitud de 5 a 100 caracteres'
                    }
                }
            }


        }
    });
// Variable que almacena el valor de la variable de sesión id_empresa
    var id = localStorage.getItem("id_empresa");
    // Se cambia el valor de la variable de sesion id_municipio a null
    localStorage.setItem("id_municipio", null);
    // Variable que almacena el valor que contiene el campo oculto del lado del sevidor contenido_txtEmailUsuario
    var email_usuario = $("#contenido_txtEmailUsuario").val();
    if (id == "vacio") {

    }
    // Validación que si se cumple carga los datos de la empresa que se va a editar, cuando se ingresa como usuario de tipo empresa
    else if (email_usuario != null && email_usuario != "" && id == null) {
        var datos = "{ 'email' : '" + email_usuario + "'}";
        $.when(cargarDatosEmail(datos)).then(function () {
            setTimeout(function () {
                var id_mun = localStorage.getItem("id_municipio");
                if (id_mun != 0 && id_mun > 0) {
                    $("#contenido_ddlMunicipio").val(id_mun);
                    $('#contenido_ddlMunicipio').change();
                }
            }, 150);
        });
    }// Validación que si se cumple carga los datos de la empresa que se selcciona para editar de la tabla, cuando se esta logueado como Administrador
    else if (id != null) {
        $.when(cargarDatosID()).then(function () {
            setTimeout(function () {
                var id_mun = localStorage.getItem("id_municipio");
                if (id_mun != 0 && id_mun > 0) {
                    $("#contenido_ddlMunicipio").val(id_mun);
                    $('#contenido_ddlMunicipio').change();
                }
            }, 150);
        });
    }
    // Código que se ejecuta cuando se detecta que se ha seleccionado un estado diferente de la lista desplegable
    // Y en la lista de municipios solo carga los municipios que pertenecen a ese estado
    $("#contenido_ddlEstado").change(function () {
        var nombre_estado = $('#contenido_ddlEstado :selected').text();
        var datos = "{ 'estado' : '" + nombre_estado + "'}";
        cambiarMunicipios(datos);
    });
     // Función que se dispara cuando se presiona el boton cancelar del formulario y se carga el formulario FrmContenedor.aspx
    $("#btnCancelar").click(function () {
        localStorage.removeItem("id_empresa");
        window.location.assign("FrmContenedor.aspx");
    });
});

// Función que realiza una petición ajax para que ejecute el método web getDatos para saber si la empresa que esta logueada
// ya ha registrado sus datos de contacto o no
function cargarDatosEmail(datos) {
    $.ajax({
        type: 'POST',
        url: 'ws/WSEmpresas.asmx/getDatos',
        data: datos,
        contentType: 'application/json; utf-8',
        dataType: 'json',
        success: function (data) {
            // Si el método web getDatos devuelve que el valor de data.d es mayor a 0 carga los datos de esa empresa en el formulario
            // En caso contrario no entra a la validación y por lo tanto no carga datos porque esa empresa aun no ha registrado sus datos
            // Y se muesta el formulario para que la emprese registre sus datos de contacto
            if (data.d > 0) {
                $("#titulo").text("EDITAR DATOS DE CONTACTO");
                $("#btnRegistrar").val("Editar");
                $.ajax({
                    type: 'POST',
                    url: 'ws/WSEmpresas.asmx/getOneEmail',
                    data: datos,
                    contentType: 'application/json; utf-8',
                    dataType: 'json',
                    success: function (data) {
                        let empresa = JSON.parse(data.d);
                        // Código que carga los datos de la empresa en los campos del formualario
                        localStorage.setItem("id_municipio", empresa[0].id_municipio);
                        $("#contenido_txtEmpresa").val(empresa[0].nombre);
                        $("#contenido_txtEmail").val(empresa[0].email);
                        $("#contenido_ddlEstado").val(empresa[0].id_estado);
                        $('#contenido_ddlEstado').change();
                        $("#contenido_txtCP").val(empresa[0].codigo_postal);
                        $("#contenido_txtDomicilio").val(empresa[0].domicilio);
                        $("#contenido_txtTelefono").val(empresa[0].telefono);
                        $("#contenido_txtMision").val(empresa[0].mision);
                        if (empresa[0].giro == "Industrial") {
                            document.getElementById('contenido_RadioIndustrial').checked = true;
                        }
                        else if (empresa[0].giro == "Servicios") {
                            document.getElementById('contenido_RadioServicios').checked = true;
                        }
                        else if (empresa[0].giro == "Otro") {
                            document.getElementById('contenido_RadioOtro').checked = true;
                        }
                        if (empresa[0].sector == "Público") {
                            document.getElementById('contenido_RadioPublico').checked = true;
                        }
                        else if (empresa[0].sector == "Privado") {
                            document.getElementById('contenido_RadioPrivado').checked = true;
                        }
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        if (jqXHR.responseJSON.ExceptionType == "System.Exception") {
                            $("#msgError").text(jqXHR.responseJSON.Message);
                            $("#mdlError").modal().show();
                        } else if (jqXHR.responseJSON.ExceptionType == "System.Security.SecurityException") {
                            Response.load("FrmLogin.aspx");
                        }
                    }
                });
            } else {
                localStorage.setItem("id_municipio", 0);
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            if (jqXHR.responseJSON.ExceptionType == "System.Exception") {
                $("#msgError").text(jqXHR.responseJSON.Message);
                $("#mdlError").modal().show();
            } else if (jqXHR.responseJSON.ExceptionType == "System.Security.SecurityException") {
                Response.load("FrmLogin.aspx");
            }
        }
    });
}
// Función que hace una petición ajax para que ejecute el método web getOne para que cargue los datos de contacto de la 
// empresa que el administrador selecciono de la tabla
function cargarDatosID() {
    $("#titulo").text("EDITAR DATOS DE CONTACTO");
    $("#btnRegistrar").val("Editar");
    var id = localStorage.getItem("id_empresa");
    var datos = "{ 'id_empresa' : '" + parseInt(id) + "'}";
    $.ajax({
        type: 'POST',
        url: 'ws/WSEmpresas.asmx/getOne',
        data: datos,
        contentType: 'application/json; utf-8',
        dataType: 'json',
        success: function (data) {
            let empresa = JSON.parse(data.d);
            // Código que carga los datos de la empresa en los campos del formualario
            localStorage.setItem("id_municipio", empresa[0].id_municipio);
            $("#contenido_txtEmpresa").val(empresa[0].nombre);
            $("#contenido_txtEmail").val(empresa[0].email);
            $("#contenido_ddlEstado").val(empresa[0].id_estado);
            $('#contenido_ddlEstado').change();
            $("#contenido_txtCP").val(empresa[0].codigo_postal);
            $("#contenido_txtDomicilio").val(empresa[0].domicilio);
            $("#contenido_txtTelefono").val(empresa[0].telefono);
            $("#contenido_txtMision").val(empresa[0].mision);
            if (empresa[0].giro == "Industrial") {
                document.getElementById('contenido_RadioIndustrial').checked = true;
            }
            else if (empresa[0].giro == "Servicios") {
                document.getElementById('contenido_RadioServicios').checked = true;
            }
            else if (empresa[0].giro == "Otro") {
                document.getElementById('contenido_RadioOtro').checked = true;
            }
            if (empresa[0].sector == "Público") {
                document.getElementById('contenido_RadioPublico').checked = true;
            }
            else if (empresa[0].sector == "Privado") {
                document.getElementById('contenido_RadioPrivado').checked = true;
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            if (jqXHR.responseJSON.ExceptionType == "System.Exception") {
                $("#msgError").text(jqXHR.responseJSON.Message);
                $("#mdlError").modal().show();
            } else if (jqXHR.responseJSON.ExceptionType == "System.Security.SecurityException") {
                Response.load("FrmLogin.aspx");
            }
        }
    });
}
// Función que hace una petición ajax para que ejecute el método web getMunicipios que muestra los municipios que se encuentran
// dentro del estado selccionado de la lista desplegable
function cambiarMunicipios(datos) {
    $.ajax({
        type: 'POST',
        url: 'ws/WSDatosContacto.asmx/getMunicipios',
        data: datos,
        contentType: 'application/json; utf-8',
        dataType: 'json',
        success: function (data) {
            let municipios = JSON.parse(data.d);
            $('#contenido_ddlMunicipio').empty();
            for (i = 0; i < municipios.length; i++) {
                $('#contenido_ddlMunicipio').append('<option value="' + municipios[i].id_municipio + '">' + municipios[i].municipio + '</option>');
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            $("#msgError").text("HA OCURRIDO UN ERROR, POR FAVOR VUELVELO A INTENTAR");
            $("#mdlError").modal().show();
        }
    });
}
// Función que cierra el modal y muesta el formulario FrmContenedor.aspx
function cerrar_modal(evento) {
    window.location.assign("FrmContenedor.aspx")
}

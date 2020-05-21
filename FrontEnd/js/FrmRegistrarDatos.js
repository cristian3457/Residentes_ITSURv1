
$(document).ready(function () {
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

    var validarCP = /(^([0-9]{5,5})|^)$/
    var validarEmail = new RegExp("^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.([a-zA-Z]{2,4})+$");
    var validarTelefono = /^[(]{0,1}[+]*[0-9]{2,2}[)]{0,1}[-\s\./0-9]*$/g;




    $("#btnRegistrar").click(function () {
        $("#FrmRegistrarDatos").data('bootstrapValidator').validate();
        if ($("#FrmRegistrarDatos").data('bootstrapValidator').isValid()) {

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

            var btnAceptar = document.getElementById("btnAceptar");
            btnAceptar.addEventListener('click', cerrar_modal);
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
            let obj = {}; obj.nombre = empresa; obj.email = email; obj.id_estado = id_estado; obj.id_municipio = id_municipio;
            obj.codigo_postal = cp; obj.domicilio = domicilio; obj.giro = giro; obj.sector = sector;
            obj.telefono = telefono; obj.mision = mision;
            var json = "{'info' : '" + JSON.stringify(obj) + "'}";
            var btn = document.getElementById("btnRegistrar");
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
                            alert("nacho ocurrio un error");
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
            else if (btn.value == "Editar") {
                id = localStorage.getItem("id_empresa");
                if (id != null) {
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
                                alert("nacho ocurrio un error");
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
                } else if (id == null) {
                    var email_usuario = $("#contenido_txtEmailUsuario").val();
                    //var actualizar_datos = "{'nombre' : '" + empresa + "',";
                    //actualizar_datos += "'email' : '" + email + "',";
                    //actualizar_datos += "'id_estado' : '" + id_estado + "',";
                    //actualizar_datos += "'id_municipio' : '" + id_municipio + "',";
                    //actualizar_datos += "'codigo_postal' : '" + cp + "',";
                    //actualizar_datos += "'domicilio' : '" + domicilio + "',";
                    //actualizar_datos += "'giro' : '" + giro + "',";
                    //actualizar_datos += "'sector' : '" + sector + "',";
                    //actualizar_datos += "'telefono' : '" + telefono + "',";
                    //actualizar_datos += "'mision' : '" + mision + "',";
                    //actualizar_datos += "'email_usuario' : '" + email_usuario + "'}";
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
                                alert("nacho ocurrio un error");
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

    var id = localStorage.getItem("id_empresa");
    localStorage.setItem("id_municipio", null);
    var email_usuario = $("#contenido_txtEmailUsuario").val();
    if (id == "vacio") {

    }
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
    } else if (id != null) {
        $.when(cargarDatosID()).then(function () {
            setTimeout(function () {
                var id_mun = localStorage.getItem("id_municipio");
                if (id_mun != 0 && id_mun > 0) {
                    $("#contenido_ddlMunicipio").val(id_mun);
                    $('#contenido_ddlMunicipio').change();
                }
            }, 150);
        });
    } else {

    }
    $("#contenido_ddlEstado").change(function () {
        var nombre_estado = $('#contenido_ddlEstado :selected').text();
        var datos = "{ 'estado' : '" + nombre_estado + "'}";
        cambiarMunicipios(datos);
    });

    $("#btnCancelar").click(function () {
        localStorage.removeItem("id_empresa");
        window.location.assign("FrmContenedor.aspx");
    });
});


function cargarDatosEmail(datos) {
    $.ajax({
        type: 'POST',
        url: 'ws/WSEmpresas.asmx/getDatos',
        data: datos,
        contentType: 'application/json; utf-8',
        dataType: 'json',
        success: function (data) {
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
            alert(textStatus + " --- " + errorThrown + "--- ");
        }
    });
}
function cerrar_modal(evento) {
    window.location.assign("FrmContenedor.aspx")
}



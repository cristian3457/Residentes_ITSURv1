
function validar(evento) {
    //Obtener los controles a validar
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
    var id_estado = document.getElementById('contenido_ddlEstado').value;
    var id_municipio = document.getElementById('contenido_ddlMunicipio').value;
    var validarCP = /(^([0-9]{5,5})|^)$/
    var validarEmail = new RegExp("^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.([a-zA-Z]{2,4})+$");
    var validarTelefono = /^[(]{0,1}[+]*[0-9]{2,2}[)]{0,1}[-\s\./0-9]*$/g;
    try {
        //Limpiar los estilos de validación
        txtEmpresa.classList.remove('is-valid', 'is-invalid');
        txtEmail.classList.remove('is-valid', 'is-invalid');
        txtCP.classList.remove('is-valid', 'is-invalid');
        txtDomicilio.classList.remove('is-valid', 'is-invalid');
        txtTelefono.classList.remove('is-valid', 'is-invalid');
        txtMision.classList.remove('is-valid', 'is-invalid');
        rbtnSectorPublico.classList.remove('is-valid', 'is-invalid');
        rbtnSectorPrivado.classList.remove('is-valid', 'is-invalid');
        rbtnRamoServicios.classList.remove('is-valid', 'is-invalid');
        rbtnRamoIndustrial.classList.remove('is-valid', 'is-invalid');
        rbtnRamoOtro.classList.remove('is-valid', 'is-invalid');
        //Obtener los valores ingresados en los controles
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
        //Verificar si se ha ingresado datos en ellos
        if (empresa.length < 5 || empresa.length > 60 || !validarEmail.test(email) || !validarCP.test(cp) ||
            domicilio.length < 10 || domicilio.length > 80 || !validarTelefono.test(telefono) ||
            mision.length < 10 || sectorPublico == false && sectorPrivado == false || cp.length != 5 ||
            ramoIndustrial == false && ramoServicios == false && ramoOtro == false || parseInt(id_estado) < 0 || parseInt(id_municipio) < 0) {
            if (empresa.length < 5 || empresa.length > 60) {
                txtEmpresa.classList.add('is-invalid');
            } else {
                txtEmpresa.classList.add('is-valid');
            }
            if (!validarEmail.test(email)) {
                txtEmail.classList.add('is-invalid');
            } else {
                txtEmail.classList.add('is-valid');
            }
            if (!validarCP.test(cp) || cp.length != 5) {
                txtCP.classList.add('is-invalid');
            } else {
                txtCP.classList.add('is-valid');
            }
            if (domicilio.length < 10 || domicilio.length > 80) {
                txtDomicilio.classList.add('is-invalid');
            } else {
                txtDomicilio.classList.add('is-valid');
            }
            if (!validarTelefono.test(telefono)) {
                txtTelefono.classList.add('is-invalid');
            } else {
                txtTelefono.classList.add('is-valid');
            }
            if (mision.length < 10) {
                txtMision.classList.add('is-invalid');
            } else {
                txtMision.classList.add('is-valid');
            }
            if (parseInt(id_estado) < 0) {
                id_estado.classList.add('is-invalid');
            } else {
                id_estado.classList.add('is-valid');
            }
            if (parseInt(id_municipio) < 0) {
                id_municipio.classList.add('is-invalid');
            } else {
                id_municipio.classList.add('is-valid');
            }

            if (sectorPublico == false && sectorPrivado == false) {
                rbtnSectorPrivado.classList.add('is-invalid');
                rbtnSectorPublico.classList.add('is-invalid');
            } else {
                rbtnSectorPrivado.classList.add('is-valid');
                rbtnSectorPublico.classList.add('is-valid');
            }
            if (ramoIndustrial == false && ramoServicios == false && ramoOtro == false) {
                rbtnRamoIndustrial.classList.add('is-invalid');
                rbtnRamoServicios.classList.add('is-invalid');
                rbtnRamoOtro.classList.add('is-invalid');
            } else {
                rbtnRamoIndustrial.classList.add('is-valid');
                rbtnRamoServicios.classList.add('is-valid');
                rbtnRamoOtro.classList.add('is-valid');
            }

            //Cancelar el submit 
            evento.preventDefault();
        } else {
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

            var datos = "{ 'nombre' : '" + empresa + "',";
            datos += "'email' : '" + email + "',";
            datos += "'id_estado' : '" + id_estado + "',";
            datos += "'id_municipio' : '" + id_municipio + "',";
            datos += "'codigo_postal' : '" + cp + "',";
            datos += "'domicilio' : '" + domicilio + "',";
            datos += "'giro' : '" + giro + "',";
            datos += "'sector' : '" + sector + "',";
            datos += "'telefono' : '" + telefono + "',";
            datos += "'mision' : '" + mision + "'}";
            var btn = document.getElementById("btnRegistrar");
            if (btn.value == "Registrar") {
                $.ajax({
                    type: 'POST',
                    url: 'ws/WSDatosContacto.asmx/insert',
                    data: datos,
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
                        alert(textStatus + " --- " + errorThrown + "--- ");
                    }
                });
            }
            else if (btn.value == "Editar") {
                id = localStorage.getItem("id_empresa");
                if (id != null) {
                    var actualizar_datos = "{ 'id_empresa' : '" + id + "'," + "'nombre' : '" + empresa + "',";
                    actualizar_datos += "'email' : '" + email + "',";
                    actualizar_datos += "'id_estado' : '" + id_estado + "',";
                    actualizar_datos += "'id_municipio' : '" + id_municipio + "',";
                    actualizar_datos += "'codigo_postal' : '" + cp + "',";
                    actualizar_datos += "'domicilio' : '" + domicilio + "',";
                    actualizar_datos += "'giro' : '" + giro + "',";
                    actualizar_datos += "'sector' : '" + sector + "',";
                    actualizar_datos += "'telefono' : '" + telefono + "',";
                    actualizar_datos += "'mision' : '" + mision + "'}";
                    $.ajax({
                        type: 'POST',
                        url: 'ws/WSDatosContacto.asmx/update',
                        data: actualizar_datos,
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
                            alert(textStatus + " --- " + errorThrown + "--- ");
                        }
                    });
                } else if (id == null) {
                    var email_usuario = $("#contenido_txtEmailUsuario").val();
                    var actualizar_datos = "{'nombre' : '" + empresa + "',";
                    actualizar_datos += "'email' : '" + email + "',";
                    actualizar_datos += "'id_estado' : '" + id_estado + "',";
                    actualizar_datos += "'id_municipio' : '" + id_municipio + "',";
                    actualizar_datos += "'codigo_postal' : '" + cp + "',";
                    actualizar_datos += "'domicilio' : '" + domicilio + "',";
                    actualizar_datos += "'giro' : '" + giro + "',";
                    actualizar_datos += "'sector' : '" + sector + "',";
                    actualizar_datos += "'telefono' : '" + telefono + "',";
                    actualizar_datos += "'mision' : '" + mision + "',";
                    actualizar_datos += "'email_usuario' : '" + email_usuario + "'}";
                    $.ajax({
                        type: 'POST',
                        url: 'ws/WSDatosContacto.asmx/updatePorEmail',
                        data: actualizar_datos,
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
                            alert(textStatus + " --- " + errorThrown + "--- ");
                        }
                    });
                }
            }
        }

    } catch (e) {
        $('#contenido_divMsg').css('display', 'block');
        //Cancelar el submit
        evento.preventDefault();
    }
}
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
                        alert(textStatus + " --- " + errorThrown + "--- ");
                    }
                });
            } else {
                localStorage.setItem("id_municipio", 0);
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert(textStatus + " --- " + errorThrown + "--- ");
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
            alert(textStatus + " --- " + errorThrown + "--- ");
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
                //alert(municipios[i].municipio);
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
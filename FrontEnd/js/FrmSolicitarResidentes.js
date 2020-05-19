
$(document).ready(function () {

    //Obtener los controles a validar
    var txtPerfil = document.getElementById("contenido_txtPerfil");
    var txtSolicito = document.getElementById("txtSolicito");
    var txtRequisitos = document.getElementById("txtRequisitos");
    var txtActividades = document.getElementById("txtActividades");
    var txtCarrera = document.getElementById("contenido_ddlCarrera");

    //Obtener los valores ingresados en los controles
    var perfil = txtPerfil.value.trim();
    var solicito = txtSolicito.value.trim();
    var requisitos = txtRequisitos.value.trim();
    var actividades = txtActividades.value.trim();
    var carrera = txtCarrera.value;

    $("#btnRegistrar").click(function () {
        $("#FrmSolicitarResidentes").data('bootstrapValidator').validate();
        if ($("#FrmSolicitarResidentes").data('bootstrapValidator').isValid()) {

            var perfil = txtPerfil.value.trim();
            var solicito = txtSolicito.value.trim();
            var requisitos = txtRequisitos.value.trim();
            var actividades = txtActividades.value.trim();
            var carrera = txtCarrera.value;

            var email_usuario = $("#contenido_txtEmailUsuario").val();
            var id_oferta = localStorage.getItem("id_oferta");
            if (email_usuario != null && id_oferta == null) {
                var email_usuario = $("#contenido_txtEmailUsuario").val();
                var sueldo = $("#contenido_txtSueldo").val();
                var datos = "{ 'perfil' : '" + perfil + "',";
                datos += "'carrera' : '" + carrera + "',";
                datos += "'sueldo' : '" + sueldo + "',";
                datos += "'solicito' : '" + solicito + "',";
                datos += "'requisitos' : '" + requisitos + "',";
                datos += "'actividades' : '" + actividades + "',";
                datos += "'email' : '" + email_usuario + "'}";
                var btn = document.getElementById("btnRegistrar");

                if (btn.value == "REGISTRAR") {
                    $.ajax({
                        type: 'POST',
                        url: 'ws/WSOfertas.asmx/insert',
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
                    var btnAceptar = document.getElementById("btnAceptar");
                    btnAceptar.addEventListener('click', cerrar_modal);
                }
            }

        } else {
            alert('con errores');
        }
    });


    $('#FrmSolicitarResidentes').bootstrapValidator({
        framework: 'bootstrap',
        excluded: [':disabled', ':hidden'],
        fields: {
            ctl00$contenido$txtPerfil: {
                message: 'Contraseña no valida',
                validators: {
                    notEmpty: {
                        message: 'El Campo es obligatorio'
                    },
                    regexp: {
                        regexp: /^[a-zA-Z\s]+$/,
                        message: 'Debe ser solamente letras'
                    },
                    stringLength: {
                        min: 7,
                        max: 50,
                        message: 'La longitud del municipio debe ser entre 5 y 50 caracteres'
                    }
                }
            }, 
            ctl00$contenido$ddlCarrera: {
                validators: {
                    notEmpty: {
                        message: 'Es necesario indicar que tipo de usiario sera'
                    },
                    callback: {
                        message: 'El tipo de usuario no es válido',

                        callback: function (value, validator, $field) {
                            return (value.length > 8 && value.length < 28);
                        }
                    }
                }
            },
            txtSolicito: {
                message: 'Contraseña no valida',
                validators: {
                    notEmpty: {
                        message: 'El Campo es obligatorio'
                    },
                    regexp: {
                        regexp: /^[a-zA-Z\s]+$/,
                        message: 'Debe ser solamente letras'
                    },
                    stringLength: {
                        min: 7,
                        max: 50,
                        message: 'La longitud del municipio debe ser entre 5 y 50 caracteres'
                    }
                }
            },
            txtRequisitos: {
                message: 'Contraseña no valida',
                validators: {
                    notEmpty: {
                        message: 'El Campo es obligatorio'
                    },
                    regexp: {
                        regexp: /^[a-zA-Z\s]+$/,
                        message: 'Debe ser solamente letras'
                    },
                    stringLength: {
                        min: 7,
                        max: 50,
                        message: 'La longitud del municipio debe ser entre 5 y 50 caracteres'
                    }
                }
            },
            txtActividades: {
                message: 'Contraseña no valida',
                validators: {
                    notEmpty: {
                        message: 'El Campo es obligatorio'
                    },
                    regexp: {
                        regexp: /^[a-zA-Z\s]+$/,
                        message: 'Debe ser solamente letras'
                    },
                    stringLength: {
                        min: 7,
                        max: 50,
                        message: 'La longitud del municipio debe ser entre 5 y 50 caracteres'
                    }
                }
            }


        }
    });



    var btnEditar = $("#btnRegistrar").val();
    if (id_oferta != null && btnEditar == "Editar") {
        var email_usuario = $("#contenido_txtEmailUsuario").val();
        var sueldo = $("#contenido_txtSueldo").val();
        var datos = "{ 'id_oferta' : '" + id_oferta + "',";
        datos += "'perfil' : '" + perfil + "',";
        datos += "'carrera' : '" + carrera + "',";
        datos += "'sueldo' : '" + sueldo + "',";
        datos += "'solicito' : '" + solicito + "',";
        datos += "'requisitos' : '" + requisitos + "',";
        datos += "'actividades' : '" + actividades + "'}";
        $.ajax({
            type: 'POST',
            url: 'ws/WSOfertas.asmx/update',
            data: datos,
            contentType: 'application/json; utf-8',
            dataType: 'json',
            success: function (data) {
                if (data.d) {
                    localStorage.removeItem("id_oferta");
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
    var email_usuario = $("#contenido_txtEmailUsuario").val();
    var id_oferta = localStorage.getItem("id_oferta");
    if (id_oferta != null) {
        $("#btnRegistrar").val("Editar");
        $(".titleOfertas").text("EDITAR DATOS PARA LAS OFERTAS DE RESIDENCIAS");
        var datos = "{ 'id_oferta' : '" + id_oferta + "'}";
        cargarDatosEditar(datos);
    }
    //var btn = document.getElementById("btnRegistrar");
    //btn.addEventListener('click', validar);
    var btnAceptar = document.getElementById("btnAceptar");
    btnAceptar.addEventListener('click', cerrar_modal);
    $("#btnCancelar").click(function () {
        localStorage.removeItem("id_oferta");
        window.location.assign("FrmContenedor.aspx");
    });
});

function cerrar_modal(evento) {
    localStorage.removeItem("id_oferta");
    window.location.assign("FrmContenedor.aspx")
}
function cargarDatosEditar(datos) {
    $.ajax({
        type: 'POST',
        url: 'ws/WSOfertas.asmx/getOne',
        data: datos,
        contentType: 'application/json; utf-8',
        dataType: 'json',
        success: function (data) {
            let ofertas = JSON.parse(data.d);
            $("#contenido_txtPerfil").val(ofertas[0].perfil);
            $("#contenido_txtSueldo").val(ofertas[0].sueldo);
            $("#contenido_ddlCarrera").val(ofertas[0].carrera);
            $('#contenido_ddlCarrera').change();
            $("#txtSolicito").val(ofertas[0].solicito);
            $("#txtRequisitos").val(ofertas[0].requisitos);
            $("#txtActividades").val(ofertas[0].actividades);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert(textStatus + " --- " + errorThrown + "--- ");
        }
    });
}

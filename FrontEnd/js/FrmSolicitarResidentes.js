// Función inicial que se carga cuando se manda llamar este script
$(document).ready(function () {
    // Variables que almacenan los campos del formulario 
    var txtPerfil = document.getElementById("contenido_txtPerfil");
    var txtSolicito = document.getElementById("txtSolicito");
    var txtRequisitos = document.getElementById("txtRequisitos");
    var txtActividades = document.getElementById("txtActividades");
    var txtCarrera = document.getElementById("contenido_ddlCarrera");

// Variables que almacenan el texto que el usuario escribio en los campos del formulario
    var perfil = txtPerfil.value.trim();
    var solicito = txtSolicito.value.trim();
    var requisitos = txtRequisitos.value.trim();
    var actividades = txtActividades.value.trim();
    var carrera = txtCarrera.value;
    // Función que se dispara cuando el usuario presiona el boton con el id btnRegistrar que tiene el texto Registrar
    $("#btnRegistrar").click(function () {
        // Este código pregunta si se el formulario ha cumplido con los requisitos de cada campo o no
        $("#FrmSolicitarResidentes").data('bootstrapValidator').validate();
        // Entra a esta validación si se cumplen los requisitos de cada campo del formulario
        if ($("#FrmSolicitarResidentes").data('bootstrapValidator').isValid()) {
            // variables que almacenan el texto que ingreso el usuario en los campos del formualrio
            var perfil = txtPerfil.value.trim();
            var solicito = txtSolicito.value.trim();
            var requisitos = txtRequisitos.value.trim();
            var actividades = txtActividades.value.trim();
            var carrera = txtCarrera.value;
            // Variable que almacena el valor que tiene el campo oculto del lado del servidor, el valor que almacena es el email del usuario registrado como tipo empresa
            var email_usuario = $("#contenido_txtEmailUsuario").val();
            // Variable que almacena el id de la oferta que se selecciona
            var id_oferta = localStorage.getItem("id_oferta");
            if (email_usuario != null && id_oferta == null) {
                var email_usuario = $("#contenido_txtEmailUsuario").val();
                var sueldo = $("#contenido_txtSueldo").val();
                // Se arma el objeto json con los valores de los campos que escribio el usuario de tipo empresa
                let obj = {}; obj.perfil = perfil; obj.carrera = carrera; obj.sueldo = sueldo;
                obj.solicito = solicito; obj.requisitos = requisitos; obj.actividades = actividades; obj.email = email_usuario;
                // Variable que almacena el control del boton Registrar
                var btn = document.getElementById("btnRegistrar");
                // Si el texto del boton es igual a Registrar se hace una petición ajax que mandara llamr al método web insert
                // para registrar los datos de la oferta que ingreso el usuario de tipo empresa
                if (btn.value == "REGISTRAR") {
                    var json = "{'info' : '" + JSON.stringify(obj) + "'}";
                    $.ajax({
                        type: 'POST',
                        url: 'ws/WSOfertas.asmx/insert',
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
            }
            // Variable que almacena el control del boton Registrar
            var btnEditar = $("#btnRegistrar").val();
            // Si el texto del boton es igual a Editar se hace una petición ajax que mandara llamr al método web update
            // para actualizar los datos de la oferta que ingreso el usuario de tipo empresa
            if (id_oferta != null && btnEditar == "Editar") {
                var email_usuario = $("#contenido_txtEmailUsuario").val();
                var sueldo = $("#contenido_txtSueldo").val();
                // Se arma el objeto json con los valores de los campos que escribio el usuario de tipo empresa
                let obj = {}; obj.id_oferta = id_oferta; obj.perfil = perfil; obj.carrera = carrera; obj.sueldo = sueldo;
                obj.solicito = solicito; obj.requisitos = requisitos; obj.actividades = actividades;
                var json = "{'info' : '" + JSON.stringify(obj) + "'}";
                $.ajax({
                    type: 'POST',
                    url: 'ws/WSOfertas.asmx/update',
                    data: json,
                    contentType: 'application/json; utf-8',
                    dataType: 'json',
                    success: function (data) {
                        if (data.d) {
                            localStorage.removeItem("id_oferta");
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
            // Variable que almacena el boton Aceptar del modal
            var btnAceptar = document.getElementById("btnAceptar");
            // Función que se dispara cuando se presiona el boton Aceptar del modal y cierra el modal
            btnAceptar.addEventListener('click', cerrar_modal);
        } else {
            $('#mdlValidacionCampos').modal('show'); 
        }
    });

        // Código que verifica que cada campo del formulario cumpla con lo que se especifica dentro de esta función
    $('#FrmSolicitarResidentes').bootstrapValidator({
        framework: 'bootstrap',
        excluded: [':disabled', ':hidden'], 
        fields: {
            ctl00$contenido$txtPerfil: {
                message: 'Perfil no valido',
                validators: {
                    notEmpty: {
                        message: 'Este campo es obligatorio y no debe estar vacio.'
                    },
                    regexp: {
                        regexp: /^[a-zA-Z\s]+$/,
                        message: 'El perfil deben solamente de letras'
                    },
                    stringLength: {
                        min: 5,
                        max: 50,
                        message: 'La longitud del perfil debe ser entre 5 y 50 caracteres'
                    }
                }
            }, 
            ctl00$contenido$txtSueldo: {
                message: 'Sueldo no valido',
                validators: {
                    stringLength: {
                        max: 20,
                        message: 'La longitud del sueldo puede contener hasta 20 caracteres'
                    }
                }
            }, 
            ctl00$contenido$ddlCarrera: {
                validators: {
                    notEmpty: {
                        message: 'Este campo es obligatorio y no debe estar vacio.'
                    },
                    callback: {
                        message: 'La carrera no es valida se debe seleccionar una correcta',

                        callback: function (value, validator, $field) {
                            return (value.length > 8 && value.length < 28);
                        }
                    }
                }
            },
            txtSolicito: {
                message: 'texto no valido',
                validators: {
                    notEmpty: {
                        message: 'Este campo es obligatorio y no debe estar vacio.'
                    },
                    regexp: {
                        regexp: /^[a-zA-Z0-9\s\-]+$/,
                        message: 'El campo no acepta caracteres especiales'
                    },
                    stringLength: {
                        min: 10,
                        max: 150,
                        message: 'La longitud de este campo debe ser de entre 10 y 150 caracteres'
                    }
                }
            },
            txtRequisitos: {
                message: 'texto no valido',
                validators: {
                    notEmpty: {
                        message: 'Este campo es obligatorio y no debe estar vacio.'
                    },
                    regexp: {
                        regexp: /^[a-zA-Z0-9\s\-]+$/,
                        message: 'El campo no acepta caracteres especiales'
                    },
                    stringLength: {
                        min: 10,
                        max: 150,
                        message: 'La longitud de este campo debe ser de entre 10 y 150 caracteres'
                    }
                }
            },
            txtActividades: {
                message: 'Texto no valido',
                validators: {
                    notEmpty: {
                        message: 'Este campo es obligatorio y no debe estar vacio.'
                    },
                    regexp: {
                        regexp: /^[a-zA-Z\s\-]+$/,
                        message: 'El campo no acepta caracteres especiales'
                    },
                    stringLength: {
                        min: 10,
                        max: 150,
                        message: 'La longitud de este campo debe ser de entre 10 y 150 caracteres'
                    }
                }
            }


        }
    });
    // Variables que almacenan el email del usario registrado y el id de la oferta seleccionada respectivamente
    var email_usuario = $("#contenido_txtEmailUsuario").val();
    var id_oferta = localStorage.getItem("id_oferta");
    // Si el id de la oferta es diferente de null, se indica en el formulario que se va a editar una oferta ya registrada
    if (id_oferta != null) {
        $("#btnRegistrar").val("Editar");
        $(".titleOfertas").text("EDITAR DATOS PARA LAS OFERTAS DE RESIDENCIAS");
        var datos = "{ 'id_oferta' : '" + id_oferta + "'}";
        cargarDatosEditar(datos);
    }
    // Variable que almacena el boton Aceptar del modal
    var btnAceptar = document.getElementById("btnAceptar");
    // Función que se dispara cuando se presiona el boton Aceptar del modal y cierra el modal
    btnAceptar.addEventListener('click', cerrar_modal);
    // Función que se dispara cuando se presiona el boton cancelar del formulario y se carga el formulario FrmContenedor.aspx
    $("#btnCancelar").click(function () {
        localStorage.removeItem("id_oferta");
        window.location.assign("FrmContenedor.aspx");
    });
});
// Función que cierra el modal y muestra el formulario FrmContenedor.aspx
function cerrar_modal(evento) {
    localStorage.removeItem("id_oferta");
    window.location.assign("FrmContenedor.aspx")
}
// Función que hace una petición ajax que mandara llamar al método web getOne que obtendra los datos de la oferta a editar
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
            if (jqXHR.responseJSON.ExceptionType == "System.Exception") {
                $("#msgError").text(jqXHR.responseJSON.Message);
                $("#mdlError").modal().show();
            } else if (jqXHR.responseJSON.ExceptionType == "System.Security.SecurityException") {
                Response.load("FrmLogin.aspx");
            }
        }
    });
}

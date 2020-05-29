// Función inicial que se carga cuando se manda llamar este script
$(document).ready(function () {
    // Variables que almacenan los campos del formulario 
    var txtContraseña = document.getElementById("contenido_txtPassword");
    var txtConfirmarContraseña = document.getElementById("contenido_txtConfirmarPassword");
    // Variables que almacenan el texto que el usuario escribio en los campos del formulario
    var contraseña = txtContraseña.value.trim();
    var confirmar_contraseña = txtConfirmarContraseña.value.trim();
    // Función que se dispara cuando el usuario presiona el boton con el id btncambiar que tiene el texto Aceptar
    $("#btncambiar").click(function () {
        // Este código pregunta si se el formulario ha cumplido con los requisitos de cada campo o no
        $("#FrmCambiarPassword").data('bootstrapValidator').validate();
        // Se entra a esta validación si se cumplen los requisitos de cada campo del formulario
        if ($("#FrmCambiarPassword").data('bootstrapValidator').isValid()) {
            // Variables que toman el texto que contienen los campos del lado del servidor, las varibles de sesión que se crean cuando un usuario se loguea
            var email_usuario = $("#contenido_txtEmailUsuario").val();
            var tipo_usuario = $("#contenido_txtTipoUsuario").val();
            // variable que almacena el texto que ingreso el usuario en el campo password
            var password = $("#contenido_txtPassword").val();
            // Validación que se cumple si el texto de la variable email_usuario es difernte de null y si se cumple 
            // manda ejecutar a la función cambiarPassword y le pasa la constante let que contiene la contraseña nueva del usuario
            if (email_usuario != null) {
                let obj = {}; obj.email = email_usuario; obj.password = password;
                cambiarPassword(obj);
            }
        }// Se muestra el mensaje si no se ha cumplido con los requisitos de cada campo del formulario
        else {
            $('#mdlValidacionCampos').modal('show'); 
        }
    });
    // Código que verifica que cada campo del formulario cumpla con lo que se especifica dentro de esta función
    $('#FrmCambiarPassword').bootstrapValidator({
        framework: 'bootstrap',
        excluded: [':disabled', ':hidden'],
        fields: {
            ctl00$contenido$txtPassword: {
                message: 'Contraseña no valida',
                validators: {
                    notEmpty: {
                        message: 'Este campo es obligatorio y no debe estar vacio.'
                    },
                    identical: {
                        field: 'ctl00$contenido$txtConfirmarPassword',
                        message: 'Las contraseñas no coinciden.'
                    },
                    regexp: {
                        regexp: /(?=^.{8,16}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
                        message: 'La contraseña Debe tener entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula, al menos una mayúscula'
                    }
                }
            }, ctl00$contenido$txtConfirmarPassword: {
                message: 'Contraseña no valida',
                validators: {
                    notEmpty: {
                        message: 'Este campo es obligatorio y no debe estar vacio.'
                    },
                    identical: {
                        field: 'ctl00$contenido$txtPassword',
                        message: 'Las contraseñas no coinciden.'
                    },
                    regexp: {
                        regexp: /(?=^.{8,16}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
                        message: 'La contraseña Debe tener entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula, al menos una mayúscula'
                    }
                }
            }
        }
    });
    // Función que se dispara cuando se presiona el boton del modal con el id btnAceptarInfo y se carga el formulario FrmContenedor.aspx
    $("#btnAceptarInfo").click(function () {
        window.location.assign("FrmContenedor.aspx")
    });
        // Función que se dispara cuando se presiona el boton cancelar del formulario y se carga el formulario FrmContenedor.aspx
    $("#btncancelar").click(function () {
        window.sessionStorage.removeItem("email");
        window.location.assign("FrmContenedor.aspx");
    });

});

// Función que recibe la nueva contraseña y hace una petición ajax para que ejecute el servicio web que cambiara la contraseña en la base de datos
function cambiarPassword(datos) {
    var json = "{'info' : '" + JSON.stringify(datos) + "'}";
    $.ajax({
        type: 'POST',
        url: 'ws/WSUsuarios.asmx/updatePassword',
        data: json,
        contentType: 'application/json; utf-8',
        dataType: 'json',
        success: function (data) {
            if (data.d) {
                $('#mdlInformacion').modal('show');
                window.sessionStorage.removeItem("email");
            } else {
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

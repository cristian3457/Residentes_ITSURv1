
$(document).ready(function () {
    var txtContraseña = document.getElementById("contenido_txtPassword");
    var txtConfirmarContraseña = document.getElementById("contenido_txtConfirmarPassword");

    var contraseña = txtContraseña.value.trim();
    var confirmar_contraseña = txtConfirmarContraseña.value.trim();

    $("#btncambiar").click(function () {
        $("#FrmCambiarPassword").data('bootstrapValidator').validate();

        if ($("#FrmCambiarPassword").data('bootstrapValidator').isValid()) {
            var email = localStorage.getItem("email");
            var password = $("#contenido_txtPassword").val();
            var email_usuario = $("#contenido_txtEmailUsuario").val();
            var tipo_usuario = $("#contenido_txtTipoUsuario").val();
            if (email != null) {
                var datos = "{ 'email' : '" + email + "','password' : '" + password + "'}";
                cambiarPassword(datos);
            }
            else if (email_usuario != null) {
                var datos = "{ 'email' : '" + email_usuario + "','password' : '" + password + "'}";
                cambiarPassword(datos);
            }
        } else {
            alert('con errores');
        }
    });

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

    $("#btnAceptarInfo").click(function () {
        window.location.assign("FrmContenedor.aspx")
    });
    $("#btncancelar").click(function () {
        localStorage.removeItem("email");
        window.location.assign("FrmContenedor.aspx");
    });

});


function cambiarPassword(datos) {
    $.ajax({
        type: 'POST',
        url: 'ws/WSUsuarios.asmx/updatePassword',
        data: datos,
        contentType: 'application/json; utf-8',
        dataType: 'json',
        success: function (data) {
            if (data.d) {
                $('#mdlInformacion').modal('show');
                localStorage.removeItem("email");
            } else {
                alert("Ocurrio un error");
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert(textStatus + " --- " + errorThrown + "--- ");
        }
    });
}

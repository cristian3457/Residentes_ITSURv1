
$(document).ready(function () {
    var txtEmail = document.getElementById("contenido_txtEmail");
    var tipo_usuario = document.getElementById('contenido_ddlTipoUsuario');
    var txtContraseña = document.getElementById("contenido_txtPassword");
    var txtConfirmarContraseña = document.getElementById("contenido_txtConfirmarPassword");
    var validarPassword = /(?=^.{8,16}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
    var validarEmail = new RegExp("^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.([a-zA-Z]{2,4})+$");

    var contraseña = txtContraseña.value.trim();
    var confirmar_contraseña = txtConfirmarContraseña.value.trim();
    var email = txtEmail.value.trim();
    var tipo = tipo_usuario.value;



    $("#btncrear").click(function () {
        $("#FrmCrearUsuarios").data('bootstrapValidator').validate();

        if ($("#FrmCrearUsuarios").data('bootstrapValidator').isValid()) {
            var email = $("#contenido_txtEmail").val();
            var password = $("#contenido_txtPassword").val();
            var tipo_usuario = $('#contenido_ddlTipoUsuario').val();
            var idUsuario = localStorage.getItem("id_usuario");
            let obj = {}; obj.email = email; obj.password = password; obj.tipo_usuario = tipo_usuario;
            var btn = document.getElementById("btncrear");
            if (btn.value == "Registrar") {
                crearUsuario(obj);
            } else if (btn.value == "Editar") {
                let obj = {}; obj.id_usuario = idUsuario; obj.email = email; obj.password = password; obj.tipo_usuario = tipo_usuario;
                actualizarUsuario(obj);
            }
        } else {
            alert('con errores');
        }
    });


    $('#FrmCrearUsuarios').bootstrapValidator({
        framework: 'bootstrap',
        excluded: [':disabled', ':hidden'],
        fields: {
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
            ctl00$contenido$txtPassword: {
                message: 'Contraseña no valida',
                validators: {
                    notEmpty: {
                        message: 'Este campo es obligatorio y no debe estar vacio.'
                    },
                    identical: {
                        field: 'ctl00$contenido$txtConfirmarPassword',
                        message: 'Las contraseñas no coinciden'
                    },
                    regexp: {
                        regexp: /(?=^.{8,16}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
                        message: 'La contraseña Debe tener entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula, al menos una mayúscula'
                    }
                }
            },
            ctl00$contenido$txtConfirmarPassword: {
                message: 'Contraseña no valida',
                validators: {
                    notEmpty: {
                        message: 'El Campo es obligatorio'
                    },
                    identical: {
                        field: 'ctl00$contenido$txtPassword',
                        message: 'Las contraseñas no coinciden'
                    },
                    regexp: {
                        regexp: /(?=^.{8,16}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
                        message: 'La contraseña Debe tener entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula, al menos una mayúscula'
                    }
                }
            }, ctl00$contenido$ddlTipoUsuario: {
                message: 'Tipo de usuario no valido',
                validators: {
                    notEmpty: {
                        message: 'Es necesario indicar el tipo de usuario'
                    },
                    callback: {
                        message: 'El tipo de usuario no es válido',

                        callback: function (value, validator, $field) {
                            return (value == "Empresa" || value == "Administrador");
                        }
                    }
                }
            }

        }
    });


    var idUsuario = localStorage.getItem("id_usuario");
    if (idUsuario != null) {
        $("#tituloUsuarios").text("EDITAR DATOS DE USUARIO")
        $("#btncrear").val("Editar");
        cargarDatos(idUsuario);
    }

    $("#btnAceptarInfo").click(function () {
        $('#divContenido').load('FrmGestionarUsuarios.aspx');
    });
    $("#btncancelar").click(function () {
        localStorage.removeItem("id_usuario");
        $('#divContenido').load('FrmGestionarUsuarios.aspx');
    });
    var btn = document.getElementById("btncrear");
});

function cargarDatos(id) {
    var datos = "{ 'id_usuario' : '" + parseInt(id) + "'}";
    $.ajax({
        type: 'POST',
        url: 'ws/WSUsuarios.asmx/getOne',
        data: datos,
        contentType: 'application/json; utf-8',
        dataType: 'json',
        success: function (data) {
            let usuario = JSON.parse(data.d);
            $("#contenido_txtEmail").val(usuario[0].email);
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


function crearUsuario(data) {
    var json = "{'info' : '" + JSON.stringify(data) + "'}";
    $.ajax({
        type: 'POST',
        url: 'ws/WSUsuarios.asmx/insert',
        data: json,
        contentType: 'application/json; utf-8',
        dataType: 'json',
        success: function (data) {
            if (data.d > 0) {
                $('#mdlInformacion').modal('show');
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
function actualizarUsuario(data) {
    var json = "{'info' : '" + JSON.stringify(data) + "'}";
    $.ajax({
        type: 'POST',
        url: 'ws/WSUsuarios.asmx/update',
        data: json,
        contentType: 'application/json; utf-8',
        dataType: 'json',
        success: function (data) {
            if (data.d) {
                $('#mdlInformacion').modal('show');
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



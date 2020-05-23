// función inicial de javascript
$(document).ready(function () {
    // Se obtienen los cotroles del formulario y se almacenan en variables para un mejor manejo
    var txtEmail = document.getElementById("contenido_txtEmail");
    var tipo_usuario = document.getElementById('contenido_ddlTipoUsuario');
    var txtContraseña = document.getElementById("contenido_txtPassword");
    var txtConfirmarContraseña = document.getElementById("contenido_txtConfirmarPassword");
    // variables que almacenan expresiones regulares que tienen que cumplir algunos campos del formulario
    var validarPassword = /(?=^.{8,16}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
    var validarEmail = new RegExp("^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.([a-zA-Z]{2,4})+$");
    // Variables que contienen el texto que se ingreso en los campos del formulario
    var contraseña = txtContraseña.value.trim();
    var confirmar_contraseña = txtConfirmarContraseña.value.trim();
    var email = txtEmail.value.trim();
    var tipo = tipo_usuario.value;
    // Función que se dispara cuando se presiona el boton con el id btncrear que tiene el texto Registrar
    $("#btncrear").click(function () {
        $("#FrmCrearUsuarios").data('bootstrapValidator').validate();
        // Si los campos del formulario cumplen con las validaciones arma el objeto json que contendra los datos del usuario a crear
        if ($("#FrmCrearUsuarios").data('bootstrapValidator').isValid()) {
            var email = $("#contenido_txtEmail").val();
            var password = $("#contenido_txtPassword").val();
            var tipo_usuario = $('#contenido_ddlTipoUsuario').val();
            var idUsuario = localStorage.getItem("id_usuario");
            // Se arma el objeto json con los valores de los campos que escribio el administrador
            let obj = {}; obj.email = email; obj.password = password; obj.tipo_usuario = tipo_usuario;
            var btn = document.getElementById("btncrear");
            // Si se cumple la validación de que el texto del boton sea Registrar se manda llamar a la función crearUsuario
            if (btn.value == "Registrar") {
                crearUsuario(obj);
            }// Si se cumple la validación de que el texto del boton sea Editar se manda llamar a la función actualizarUsuario
            else if (btn.value == "Editar") {
                // Se arma el objeto json con los valores de los campos que escribio el administrador
                let obj = {}; obj.id_usuario = idUsuario; obj.email = email; obj.password = password; obj.tipo_usuario = tipo_usuario;
                actualizarUsuario(obj);
            }
        }// Se muestra el mensaje si no se ha cumplido con los requisitos de cada campo del formulario
        else {
            $('#mdlValidacionCampos').modal('show'); 
        }
    });

    // Función que valida al tiempo de que el usuario va ingresando los datos si son correctos, si no le va dando retroalimentación
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

    // Variable que almacena el id del usuario que se va a editar
    var idUsuario = localStorage.getItem("id_usuario");
    // Si el id del usuario es diferente de null se cambia el texto del h1 y del boton del formulario para indicar que se va editar la información
    if (idUsuario != null) {
        $("#tituloUsuarios").text("EDITAR DATOS DE USUARIO")
        $("#btncrear").val("Editar");
        cargarDatos(idUsuario);
    }
    // Función que se dispara cuando se presiona el boton del modal con el id btnAceptarInfo y se llena el divContenido con el formulario FrmGestionarUsuarios.aspx
    $("#btnAceptarInfo").click(function () {
        $('#divContenido').load('FrmGestionarUsuarios.aspx');
    });
    // Función que se dispara cuando se presiona el boton cancelar del formulario y se llena el divContenido con el formulario FrmGestionarUsuarios.aspx
    $("#btncancelar").click(function () {
        // Se remueve el valor que contenga la variable de sesión id_usuario para que cuando se quiera registrar un usuario, no muestre que se va a editar
        localStorage.removeItem("id_usuario");
        $('#divContenido').load('FrmGestionarUsuarios.aspx');
    });
});
// Función que carga los datos del usuario que se selecciono de la tabla al presionar el boton editar
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
// Función que sirve para crear un usuario
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
// Función que sirve para actualizar los datos de los usuarios
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

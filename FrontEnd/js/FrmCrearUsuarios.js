
function validarDatos() {
    //Obtener los controles a validar
    var txtEmail = document.getElementById("contenido_txtEmail");
    var tipo_usuario = document.getElementById('contenido_ddlTipoUsuario');
    var txtContraseña = document.getElementById("contenido_txtPassword");
    var txtConfirmarContraseña = document.getElementById("contenido_txtConfirmarPassword");
    var validarPassword = /(?=^.{8,16}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
    var validarEmail = new RegExp("^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.([a-zA-Z]{2,4})+$");
    try {
        //Limpiar los estilos de validación
        txtEmail.classList.remove('is-valid', 'is-invalid');
        tipo_usuario.classList.remove('is-valid', 'is-invalid');
        txtContraseña.classList.remove('is-valid', 'is-invalid');
        txtConfirmarContraseña.classList.remove('is-valid', 'is-invalid');
        //Obtener los valores ingresados en los controles
        var contraseña = txtContraseña.value.trim();
        var confirmar_contraseña = txtConfirmarContraseña.value.trim();
        var email = txtEmail.value.trim();
        var tipo = tipo_usuario.value;
        //Verificar si se ha ingresado datos en ellos
        if (contraseña.length < 8 || confirmar_contraseña < 8 || contraseña != confirmar_contraseña || tipo.length < 0 ||
            !validarPassword.test(contraseña) || !validarPassword.test(confirmar_contraseña) || !validarEmail.test(email)) {
            if (!validarEmail.test(email)) {
                txtEmail.classList.add('is-invalid');
            } else {
                txtEmail.classList.add('is-valid');
            }
            if (tipo.length < 0) {
                tipo_usuario.classList.add('is-invalid');
            } else {
                tipo_usuario.classList.add('is-valid');
            }
            if (contraseña.length < 8 || contraseña.length > 16) {
                txtContraseña.classList.add('is-invalid');
            } else {
                txtContraseña.classList.add('is-valid');
            }
            if (confirmar_contraseña.length < 8 || confirmar_contraseña.length > 16) {
                txtConfirmarContraseña.classList.add('is-invalid');
            } else {
                txtConfirmarContraseña.classList.add('is-valid');
            }
            if (contraseña != confirmar_contraseña) {
                txtConfirmarContraseña.classList.add('is-invalid');
            } else {
                txtConfirmarContraseña.classList.add('is-valid');
            }
            if (!validarPassword.test(contraseña)) {
                txtContraseña.classList.add('is-invalid');
            } else {
                txtContraseña.classList.add('is-valid');
            }
            if (!validarPassword.test(confirmar_contraseña)) {
                txtConfirmarContraseña.classList.add('is-invalid');
            } else {
                txtConfirmarContraseña.classList.add('is-valid');
            }

            //Cancelar el submit
            event.preventDefault();

        } else {
            var email = $("#contenido_txtEmail").val();
            var password = $("#contenido_txtPassword").val();
            var tipo_usuario = $('#contenido_ddlTipoUsuario').val();
            var idUsuario = localStorage.getItem("id_usuario");
            var datos = "{ 'email' : '" + email + "','password' : '" + password + "','tipo_usuario' : '" + tipo_usuario + "'}";
            var btn = document.getElementById("btncrear");
            if (btn.value == "Registrar") {
                crearUsuario(datos);
            } else if (btn.value == "Editar") {
                var datos = "{'id_usuario' : '"+idUsuario+"',"+" 'email' : '" + email + "','password' : '" + password + "','tipo_usuario' : '" + tipo_usuario + "'}";
                actualizarUsuario(datos);
            }
        }
    } catch (e) {
        alert(e);
        //mandar mensaje
        document.getElementById('contenido_divMsg').style.display = 'block';
        //cancelar submit
        event.preventDefault();
        //salirme del método
    }
}
function crearUsuario(data) {
            $.ajax({
                type: 'POST',
                url: 'ws/WSUsuarios.asmx/insert',
                data: data,
                contentType: 'application/json; utf-8',
                dataType: 'json',
                success: function (data) {
                    if (data.d > 0) {
                        $('#mdlInformacion').modal('show');
                    } else {
                        alert("Ese correo ya esta registrado, intenta utilizando uno diferente");
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    alert(textStatus + " --- " + errorThrown + "--- ");
                }
            });
}
function actualizarUsuario(data) {
    $.ajax({
        type: 'POST',
        url: 'ws/WSUsuarios.asmx/update',
        data: data,
        contentType: 'application/json; utf-8',
        dataType: 'json',
        success: function (data) {
            if (data.d) {
                $('#mdlInformacion').modal('show');
            } else {
                alert("Ese correo ya esta registrado, intenta utilizando uno diferente");
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert(textStatus + " --- " + errorThrown + "--- ");
        }
    });
}

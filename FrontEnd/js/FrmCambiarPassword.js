$(document).ready(function () {
});
function validarPassword() {
    //Obtener los controles a validar
    var txtContraseña = document.getElementById("contenido_txtPassword");
    var txtConfirmarContraseña = document.getElementById("contenido_txtConfirmarPassword");
    var validarPassword = /(?=^.{8,16}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
    try {
        //Limpiar los estilos de validación
        txtContraseña.classList.remove('is-valid', 'is-invalid');
        txtConfirmarContraseña.classList.remove('is-valid', 'is-invalid');
        //Obtener los valores ingresados en los controles
        var contraseña = txtContraseña.value.trim();
        var confirmar_contraseña = txtConfirmarContraseña.value.trim();
        //Verificar si se ha ingresado datos en ellos
        if (contraseña.length < 8 || confirmar_contraseña < 8 || contraseña != confirmar_contraseña || !validarPassword.test(contraseña) || !validarPassword.test(confirmar_contraseña)) {
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

        }
        else {
            var email = localStorage.getItem("email");
            var password = $("#contenido_txtPassword").val();
            var email_usuario = $("#contenido_txtEmailUsuario").val();
            //var tipo_usuario = $("#contenido_txtTipoUsuario").val();
            if (email != null) {
                var datos = "{ 'email' : '" + email + "','password' : '" + password + "'}";
                cambiarPassword(datos);
            }
            else if (email_usuario != null) {
                var datos = "{ 'email' : '" + email_usuario + "','password' : '" + password + "'}";
                cambiarPassword(datos);
            }

        }
    } catch (e) {
        alert("Error:"+e);
        //mandar mensaje
        document.getElementById('contenido_divMsg').style.display = 'block';
        //cancelar submit
        event.preventDefault();
        //salirme del método
    }
}
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
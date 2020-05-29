$(document).ready(function () {
    $("#btnIniciarSesion").on('click', validar);
});
function validar(evento) {
    //alert("has hecho clic");
    //Obtener los controles a validar
    var txtEmail = document.getElementById("txtEmail");
    var txtPassword = document.getElementById("txtPassword");
    var validarEmail = new RegExp("^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.([a-zA-Z]{2,4})+$");
    try {
        //Limpiar los estilos de validación
        txtEmail.classList.remove('is-valid', 'is-invalid');
        txtPassword.classList.remove('is-valid', 'is-invalid');
        //Obtener los valores ingresados en los controles
        var email = txtEmail.value.trim();
        var password = txtPassword.value.trim();

        //Verificar si se ha ingresado datos en ellos
        if (!validarEmail.test(email) || password.length < 8 || password.length > 16) {
            if (!validarEmail.test(email)) {
                txtEmail.classList.add('is-invalid');
            } else {
                txtEmail.classList.add('is-valid');
            }

            if (password.length < 8 || password.length > 16) {
                txtPassword.classList.add('is-invalid');
            } else {
                txtPassword.classList.add('is-valid');
            }
            //Cancelar el submit
            evento.preventDefault();
        }
    } catch (e) {
        //mandar mensaje
        document.getElementById('divMsg').style.display = 'block';
        //cancelar submit
        evento.preventDefault();
        //salirme del método
    }
}
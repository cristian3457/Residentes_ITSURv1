
$(document).ready(function () {
    // Función que detecta que elemento de la barra de navegación se presiono y le agrega la clase activo para cambiar su color de fondo
    // y de esta manera indicarle al usuario que se encuentra seleccionada esa opción
    $("div ul li a").click(function () {
        $("div ul li a").removeClass("activo");
        $(this).addClass("activo");
    });
    // Codigo que se dispara cuando se detecta que se ha presionado una opción del header y llena el divContenido con
// el formulario que corresponda segun la opción que se haya seleccionado de la barra del header
    $("#principal").click(function () {
        $("#divContenido").load("FrmPrincipal.aspx");
    });
    $("#buscar_residencias").click(function () {
        $("#divContenido").load("FrmBuscarResidencias.aspx");
    });
    $("#solicitar_residentes").click(function () {
        window.sessionStorage.removeItem("id_oferta");
        $("#divContenido").load("FrmSolicitarResidentes.aspx");
    });
    $("#registrar_datos").click(function () {
        $("#divContenido").load("FrmRegistrarDatos.aspx");
    });
    $("#cambiar_contraseña").click(function () {
        $("#divContenido").load("FrmCambiarPassword.aspx");
    });
    $("#generar_documento").click(function () {
        $("#divContenido").load("FrmGenerarDocumento.aspx");
    });
    $("#gestionar_usuarios").click(function () {
        $("#divContenido").load("FrmGestionarUsuarios.aspx");
    });
});
// Función que se ejecuta cuando el usuario cierra sesión, esta función destruye todas las variables de sesión que se hayan creado
function destruir_sesion() {
    window.sessionStorage.clear();
    window.sessionStorage.removeItem("email");
    window.sessionStorage.removeItem("id_empresa");
    location.assign("FrmLogin.aspx");
}

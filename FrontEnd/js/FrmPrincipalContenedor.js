$(document).ready(function () {
    $("#principal").click(function () {
        $("#divContenido").load("FrmPrincipal.aspx");
    });
    $("#buscar_residencias").click(function () {
        $("#divContenido").load("FrmBuscarResidencias.aspx");
    });
    $("#solicitar_residentes").click(function () {
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
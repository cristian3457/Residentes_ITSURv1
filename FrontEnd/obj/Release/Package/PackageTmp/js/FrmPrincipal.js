// función inicial de javascript
$(document).ready(function () {
    $("#btnRegistrar").click(function () {
        window.sessionStorage.removeItem("id_empresa");
        $("#divContenido").load("FrmRegistrarDatos.aspx");
    });
    // Variable que almacena el id de la tabla que cargara los datos de contacto de las empresas registradas
    let tabla = $('#grvLista');
    // Función que sirve para limpiar todo lo que tenga la tabla
    tabla.empty();
    // Función que carga los datos de contacto de las empresas registradas
    cargarDatos();
    $("#btnAceptar").unbind("click");
    // Cuando se presiona el boton del modal con el id btnAceptar se borra lo que tenga la tabla y se vuelve a llenar al llamar a la función cargarDatos
    $("#btnAceptar").click(function () {
        let tabla = $('#grvLista');
        tabla.empty();
        cargarDatos();
    });
    // Variable que almacena el tipo de usuario que se encuentra logueado en ese momento
    var tipo_usuario = $("#contenido_txtTipoUsuario").val();
    // Si el tipo de usuario es igual a empresa el divOfertas se llena con el formulario FrmPresentarOfertas.aspx
    if (tipo_usuario == "Empresa") {
        $("#divOfertas").load("FrmPresentarOfertas.aspx");
    }
});
// Función que genera los datos de la tabla con el id grvListacon los datos de contacto de las empresa que estan registradas
function cargarDatos() {
    let tabla = $('#grvLista');
    tabla.append("<thead><tr><th> Código</th><th> Nombre</th> <th> Email </th><th>" +
                    "Estado</th> <th>Municipio</th>" +
                    "<th>Editar</th><th>Eliminar</th></tr><thead/>");
    tabla.append("<tbody>");
    $.ajax({
        type: 'POST',
        url: 'ws/WSEmpresas.asmx/getAll',
        contentType: 'application/json; utf-8',
        dataType: 'json',
        success: function (data) {
            let empresas = JSON.parse(data.d);
            // ciclo que itera el número de veces que devuelve el método web y va tomando los datos para mostrar todos los datos de contacto de las empresas registradas
            for (i = 0; i < empresas.length; i++) {
                tabla.append("<tr><td>" + empresas[i].id_empresa + " </td><td>" + empresas[i].nombre + " </td> <td>" + empresas[i].email + "</td><td>" +
                    empresas[i].estado + " </td> <td>" + empresas[i].municipio +
                    "<td><input id='btnEditar' type='button' onclick='Editar(this)' value='Editar' class='btn btn-info mb-4'/></td>" +
                    "<td><input id='btnEliminar' onclick='Eliminar(this)' type='button' value='Eliminar' class='btn btn-danger mb-4'/></td></tr>");
            }
            tabla.append("</tbody>");
            //Activamos el plugin del jtable
            $('#grvLista').DataTable();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            if (jqXHR.responseJSON.ExceptionType == "System.Security.SecurityException") {
                Response.load("FrmLogin.aspx");
            }
        }
    });

}
// Función que hace una petición ajax al servico web delete para eliminar los datos de contacto de la empresa con el id de la tabla que se selecciono
function eliminar(id) {
    var datos = "{ 'id' : '" + id + "'}";
    $.ajax({
        type: 'POST',
        url: 'ws/WSEmpresas.asmx/delete',
        data: datos,
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
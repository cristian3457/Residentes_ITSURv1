// función que genera los datos de la tabla con el id listaUsuarios con los datos de los usuarios que estan registrados
function cargarDatos() {
    let tabla = $('#listaUsuarios');
    tabla.append("<thead><tr><th> Código</th><th> Email</th><th>Editar Datos</th><th>Eliminar</th></tr><thead/>");
    tabla.append("<tbody>");
    $.ajax({
        type: 'POST',
        url: 'ws/WSUsuarios.asmx/getAll',
        contentType: 'application/json; utf-8',
        dataType: 'json',
        success: function (data) {
            let usuarios = JSON.parse(data.d);
            // ciclo que itera el número de veces que devuelve el método web y va tomando los datos para mostrar todos los datos de los usuarios registrados
            for (i = 0; i < usuarios.length; i++) {
                tabla.append("<tr><td>" + usuarios[i].id_usuario + " </td><td>" + usuarios[i].email + "</td>" +
                    "<td><input id='btnEditar' type='button' onclick='Editar(this)' value='Editar Datos' class='btn btn-info mb-4'/></td>" +
                    "<td><input id='btnEliminar' onclick='Eliminar(this)' type='button' value='Eliminar' class='btn btn-danger mb-4'/></td></tr>");
            }
            tabla.append("</tbody>");
            //Activamos el plugin de jtables
            $('#listaUsuarios').DataTable();
        },
        error: function (jqXHR, textStatus, errorThrown) {
        if (jqXHR.responseJSON.ExceptionType == "System.Security.SecurityException") {
                Response.load("FrmLogin.aspx");
            }
        }
    });

}
// Función que se dispara cuando se presiona el boton eliminar de la tabla
function Eliminar(btn) {
    $('#mdlConfirmar').modal('show');
    let id = $(btn).closest("tr").children().first().text();
    $("#confirmarEliminar").unbind("click");
    // Si se presiona el boton del modal con el id confirmarEliminar se manda llamar a la función eliminar para eliminar al usuario que se selecciono
    $("#confirmarEliminar").click(function () {
        eliminar(id);
        window.sessionStorage.removeItem("id_usuario");
    });
}
// Función que hace una petición ajax al servico web delete para eliminar al usuario con el id de la tabla que se selecciono
function eliminar(id) {
    var datos = "{ 'id' : '" + id + "'}";
    $.ajax({
        type: 'POST',
        url: 'ws/WSUsuarios.asmx/delete',
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
// Función que se dispara cuando se presiona el coton Editar y llena el divContenido con el formulario FrmCrearUsuarios.aspx
// Cuando se presiona el boton se obtiene el id de ese usuario, ese id servira para cargar los datos del usuario a editar
function Editar(btn) {
    let id = $(btn).closest("tr").children().first().text();
    window.sessionStorage.removeItem("id_usuario");
    window.sessionStorage.setItem("id_usuario", id);
    $('#divContenido').load('FrmCrearUsuarios.aspx');
}

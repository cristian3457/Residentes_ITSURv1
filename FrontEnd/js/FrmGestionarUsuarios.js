
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
            for (i = 0; i < usuarios.length; i++) {
                tabla.append("<tr><td>" + usuarios[i].id_usuario + " </td><td>" + usuarios[i].email + "</td>" +
                    "<td><input id='btnEditar' type='button' onclick='Editar(this)' value='Editar Datos' class='btn btn-info mb-4'/></td>" +
                    "<td><input id='btnEliminar' onclick='Eliminar(this)' type='button' value='Eliminar' class='btn btn-danger mb-4'/></td></tr>");
            }
            tabla.append("</tbody>");
            //Activamos el plugin
            $('#listaUsuarios').DataTable();
        },
        error: function (jqXHR, textStatus, errorThrown) {
        if (jqXHR.responseJSON.ExceptionType == "System.Security.SecurityException") {
                Response.load("FrmLogin.aspx");
            }
        }
    });

}
function Eliminar(btn) {
    $('#mdlConfirmar').modal('show');
    let id = $(btn).closest("tr").children().first().text();
    $("#confirmarEliminar").unbind("click");
    $("#confirmarEliminar").click(function () {
        eliminar(id);
        localStorage.removeItem("id_usuario");
    });
}
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
function Editar(btn) {
    let id = $(btn).closest("tr").children().first().text();
    localStorage.removeItem("id_usuario");
    localStorage.setItem("id_usuario", id);
    $('#divContenido').load('FrmCrearUsuarios.aspx');
}

$(document).ready(function () {
    let tabla = $('#grvLista');
    tabla.empty();
    cargarDatos();
    $("#btnAceptar").unbind("click");
    $("#btnAceptar").click(function () {
        let tabla = $('#grvLista');
        tabla.empty();
        cargarDatos();
    });
    var tipo_usuario = $("#contenido_txtTipoUsuario").val();
    if (tipo_usuario == "Empresa") {
        $("#divOfertas").load("FrmPresentarOfertas.aspx");
    }
});
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

            for (i = 0; i < empresas.length; i++) {
                tabla.append("<tr><td>" + empresas[i].id_empresa + " </td><td>" + empresas[i].nombre + " </td> <td>" + empresas[i].email + "</td><td>" +
                    empresas[i].estado + " </td> <td>" + empresas[i].municipio +
                    "<td><input id='btnEditar' type='button' onclick='Editar(this)' value='Editar' class='btn btn-info mb-4'/></td>" +
                    "<td><input id='btnEliminar' onclick='Eliminar(this)' type='button' value='Eliminar' class='btn btn-danger mb-4'/></td></tr>");
            }
            tabla.append("</tbody>");
            //Activamos el plugin
            $('#grvLista').DataTable();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert(textStatus + " --- " + errorThrown + "--- ");
        }
    });

}
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
            alert(textStatus + " --- " + errorThrown + "--- ");
        }
    });
}
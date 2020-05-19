<%@ Page Title="" Language="C#" MasterPageFile="~/Site2.Master" AutoEventWireup="true" CodeBehind="FrmCrearUsuarios.aspx.cs" Inherits="FrontEnd.FrmCrearUsuarios" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="contenido" runat="server">
    <form runat="server">
      <!-------------------INICIA MODAL INFORMACIÓN---------------------->
        <div class="modal" data-backdrop="static" id="mdlInformacion" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">INFORMACIÓN DE LOS CAMBIOS</h5>
                    </div>
                    <div class="modal-body">
                        <p>LOS CAMBIOS FUERON REALIZADOS CORRECTAMENTE</p>
                    </div>
                    <div class="modal-footer">
                        <input id="btnAceptarInfo" data-dismiss="modal" class="btn btn-primary" type="button" value="Aceptar" />
                    </div>
                </div>
            </div>
        </div>
                        <!--Termina modal información -->

    <div class="contenedorPassword">
       <div id="divMsg" class="alert alert-danger" style="display:none;" runat="server">
            Ha ocurrido un error  
       </div>
        <asp:HiddenField ID="txtTipoUsuario" runat="server" />
        <asp:HiddenField ID="txtEmailUsuario" runat="server" />
        <h2 class="text-center mt-2 mb-4" id="tituloUsuarios">CREAR USUARIO DE LA EMPRESA</h2>
        <div class="form-row justify-content-center mb-2">
            <div class="text-right col-md-4">
                <label for="txtEmail" class="text-right texto">Usuario:</label>
            </div>
            <asp:TextBox ID="txtEmail" type="text" placeholder="info@info.com" autocomplete="off" class="form-control col-md-4" runat="server" required></asp:TextBox>
            <div class="invalid-feedback form-row col-md-6 text-justify">
                El Usuario debe ser el correo electrónico de la empresa y debe tener un formato válido
            </div>
        </div>
        <div class="form-row justify-content-center mb-2">
            <div class="text-right col-md-4">
                <label for="ddlTipoUsuario" class="text-right texto">Tipo de Usuario:</label>
            </div>
            <asp:DropDownList ID="ddlTipoUsuario" runat="server" class="form-control col-md-4">
            </asp:DropDownList>
            <div class="invalid-feedback form-row col-md-2">
                Debes seleccionar un tipo de usuario de los que aparecen en la lista desplegable
            </div>
        </div>
        <div class="form-row justify-content-center mb-2">
            <div class="text-right col-md-4">
                <label for="txtPassword" class="text-right texto">Nueva Contraseña:</label>
            </div>
            <asp:TextBox ID="txtPassword" type="password" placeholder="Nueva Contraseña" autocomplete="off" class="form-control col-md-4" runat="server" required></asp:TextBox>
            <div class="invalid-feedback form-row col-md-6 text-justify">
                La contraseña debe tener entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula y al menos una mayúscula
            </div>
        </div>
        <div class="form-row justify-content-center mb-2">
            <div class="text-right col-md-4">
                <label for="txtConfirmarPassword" class="text-right texto">Confirmar Contraseña:</label>
            </div>
            <asp:TextBox ID="txtConfirmarPassword" type="password" placeholder="Confirmar Contraseña" autocomplete="off" class="form-control col-md-4" runat="server" required></asp:TextBox>
            <div class="invalid-feedback form-row col-md-6 text-justify">
                El campo confirmar contraseña debe tener entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula, al menos una mayúscula y deben coincidir con el texto del campo contraseña
            </div>
        </div>
            <div class="form-row justify-content-center mb-3 mt-3">
                <input id="btncrear" class="btn btn-success ml-5" type="button" value="Registrar"/>
                <input id="btncancelar" class="btn btn-danger ml-5" type="button" value="Cancelar"/>
            </div>
    </div>
</form>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="scripts" runat="server">
    <script src="js/FrmCrearUsuarios.js"></script>
    <script>
        $(document).ready(function () {
            var idUsuario = localStorage.getItem("id_usuario");
            if (idUsuario != null) {
                $("#tituloUsuarios").text("EDITAR DATOS DE USUARIO")
                $("#btncrear").val("Editar");
                cargarDatos(idUsuario);
            }
            $("#btnAceptarInfo").click(function () {
                $('#divContenido').load('FrmGestionarUsuarios.aspx');
            });
            $("#btncrear").click(function () {
                validarDatos();
            });
            $("#btncancelar").click(function () {
                localStorage.removeItem("id_usuario");
                $('#divContenido').load('FrmGestionarUsuarios.aspx');
            });
            var btn = document.getElementById("btncrear");
        });
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
                    alert(textStatus + " --- " + errorThrown + "--- ");
                }
            });
        }
</script>

</asp:Content>


<%@ Page Title="" Language="C#" MasterPageFile="~/Site2.Master" AutoEventWireup="true" CodeBehind="FrmCambiarPassword.aspx.cs" Inherits="FrontEnd.FrmCambiarPassword" %>
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
                        <input id="btnAceptarInfo" class="btn btn-primary" type="button" value="Aceptar" />
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
        <h2 class="text-center mt-2 mb-4">CAMBIAR CONTRASEÑA</h2>
        <div class="form-row justify-content-center mb-4">
            <div class="text-right col-md-4">
                <label for="txtPassword" class="text-right texto">Nueva Contraseña:</label>
            </div>
            <asp:TextBox ID="txtPassword" type="password" placeholder="Nueva Contraseña" autocomplete="off" class="form-control col-md-4" runat="server" required></asp:TextBox>
            <div class="invalid-feedback form-row col-md-6 text-justify">
                La contraseña debe tener entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula y al menos una mayúscula
            </div>
        </div>
        <div class="form-row justify-content-center mb-3">
            <div class="text-right col-md-4">
                <label for="txtConfirmarPassword" class="text-right texto">Confirmar Contraseña:</label>
            </div>
            <asp:TextBox ID="txtConfirmarPassword" type="password" placeholder="Confirmar Contraseña" autocomplete="off" class="form-control col-md-4" runat="server" required></asp:TextBox>
            <div class="invalid-feedback form-row col-md-6 text-justify">
                El campo confirmar contraseña debe tener entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula, al menos una mayúscula y deben coincidir con el texto del campo contraseña
            </div>
        </div>
            <div class="form-row justify-content-center mb-3 mt-3">
                <input id="btncambiar" class="btn btn-success ml-5" type="button" value="Aceptar"/>
                <input id="btncancelar" class="btn btn-danger ml-5" type="button" value="Cancelar"/>
            </div>
    </div>
</form>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="scripts" runat="server">
    <script src="js/FrmCambiarPassword.js"></script>
    <script>
        $(document).ready(function () {
            $("#btnAceptarInfo").click(function(){
                window.location.assign("FrmContenedor.aspx")
            });
            $("#btncambiar").click(function () {
                validarPassword();
            });
            $("#btncancelar").click(function () {
                localStorage.removeItem("email");
                window.location.assign("FrmContenedor.aspx");
            });
        });
</script>
</asp:Content>


<%@ Page Title="" Language="C#" MasterPageFile="~/Site2.Master" AutoEventWireup="true" CodeBehind="FrmPresentarOfertas.aspx.cs" Inherits="FrontEnd.FrmPresentarOfertas" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <%--        <link rel="stylesheet" href="css/estilos.css"/>--%>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="contenido" runat="server">
    <!-------------------INICIA MODAL ERROR---------------------->
    <div class="modal" data-backdrop="static" id="mdlError" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">HA OCURRIDO UN ERROR</h5>
                </div>
                <div class="modal-body">
                    <p><span id="msgError"></span></p>
                </div>
                <div class="modal-footer">
                    <input id="btnAceptarError" data-dismiss="modal" class="btn btn-primary" type="button" value="Aceptar" />
                </div>
            </div>
        </div>
    </div>
    <!--Termina modal Error -->
    <% 
        if (Session["tipo_usuario"] == null || Session["tipo_usuario"].ToString() == "")
        {
            Response.Redirect("FrmLogin.aspx");
            Session["tipo_usuario"] = "";
        }
        else if (Session["tipo_usuario"].ToString() == "Empresa")
        {
                    %>
    <form runat="server">
        <asp:HiddenField ID="txtEmailUsuario" runat="server" />

        <div class="contenedor">
            <div class="row mt-2 mb-3">
                <div class="tarjetas">
                </div>
                <!--fin row-->
            </div>
        </div>
        <!--fin contenedor-->
    </form>
    <%}
        else { Response.Redirect("FrmLogin.aspx"); }%>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="scripts" runat="server">
    <script src="js/FrmPresentarOfertas.min.js"></script>
</asp:Content>

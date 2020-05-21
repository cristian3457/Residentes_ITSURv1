<%@ Page Title="" Language="C#" MasterPageFile="~/Site1.Master" AutoEventWireup="true" CodeBehind="FrmContenedor.aspx.cs" Inherits="FrontEnd.FrmContenedor" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="contenido" runat="server">
                    <% 
                        if (Session["tipo_usuario"] == null || Session["tipo_usuario"].ToString() == "")
                        {
                            Response.Redirect("FrmLogin.aspx");
                            Session["tipo_usuario"] = "";
                        }
                        else if (Session["tipo_usuario"].ToString() == "Empresa" || Session["tipo_usuario"].ToString() == "Administrador")
                        {
                    %>
    <form runat="server" style="background-color:#eeeeee;">
        <div id="divContenido">

        </div>
    </form>
      <%}
        else { Response.Redirect("FrmLogin.aspx"); }%>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="scripts" runat="server">
    <script>
        $(document).ready(function () {
                $("#divContenido").load("FrmPrincipal.aspx");
        });
    </script>
</asp:Content>

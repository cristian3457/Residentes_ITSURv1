<%@ Page Title="" Language="C#" MasterPageFile="~/Site1.Master" AutoEventWireup="true" CodeBehind="FrmContenedor.aspx.cs" Inherits="FrontEnd.FrmContenedor" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="contenido" runat="server">
    <form runat="server" style="background-color:#eeeeee;">
        <div id="divContenido">

        </div>
    </form>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="scripts" runat="server">
    <script>
        $(document).ready(function () {
                $("#divContenido").load("FrmPrincipal.aspx");
        });
    </script>
</asp:Content>

<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="FrmGenerarReporte.aspx.cs" Inherits="FrontEnd.FrmGenerarReporte" %>

<%@ Register Assembly="Microsoft.ReportViewer.WebForms" Namespace="Microsoft.Reporting.WebForms" TagPrefix="rsweb" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title></title>
    <link rel="stylesheet" href="css/bootstrap.min.css" />
    <link rel="stylesheet" href="css/header_footer.css" />
</head>
<body class="d-flex flex-column h-100">
    <nav>
        <div class="row fila universal">
            <div class="col-1" id="logo">
                <a href="#">
                    <img src="imagenes/itsur.jfif" alt="logo ITSUR" /></a>
            </div>
            <div class="col-4" style="text-align: left; align-self: center; padding-left: 50px;">
                <h2><a href="#">RESIDENTES ITSUR</a></h2>
            </div>
        </div>
    </nav>
    <% 
                            if (Session["tipo_usuario"] == null || Session["tipo_usuario"].ToString() == "")
                            {
                                Response.Redirect("FrmLogin.aspx");
                                Session["tipo_usuario"] = "";
                            }
                            else if (Session["tipo_usuario"].ToString() == "Administrador")
                            {
                    %>
    <form id="form1" runat="server">
        <div>
            <div id="contenedorReporte" style="height: 500px !important;">
                <asp:ScriptManager ID="ScriptManager1" runat="server"></asp:ScriptManager>
                <rsweb:ReportViewer ID="ReportViewer1" AsyncRendering="false" runat="server" Width="90%" Height="90%" Style="margin: 20px auto;" ClientIDMode="AutoID" ViewStateMode="Inherit"></rsweb:ReportViewer>
            </div>
        </div>
    </form>
    <%}
        else { Response.Redirect("FrmLogin.aspx"); }%>
    <footer class="mt-auto py-3">
        <p id="linkItsur"><a href="http:\\www.itsur.edu.mx" target="_blank">Instituto Tecnológico Superior del Sur de Guanajuato</a></p>
        <div id="logoFooter">
            <img src="imagenes/logo.png" alt="logo ITSUR" />
        </div>
        <div id="halconFooter">
            <img src="imagenes/halcon.png" alt="Mascota halcon ITSUR" />
        </div>
        <p id="lemaITSUR" class="text-info">"Tecnología y calidad para la vida"</p>
        <p id="telefonosITSUR" class="text-info">Tels. (445) 4577468 al 71. 4588278, 4588311 y 4588312</p>
        <p id="domicilioITSUR1" class="text-info">Av. Educación Superior No. 2000, Colonia: Benito Juárez.</p>
        <p id="domicilioITSUR2" class="text-right text-info">Uriangato, Gto. C.P. 38980 Ap. Postal No.61</p>
        <p id="copyright" class="text-info">Todos los Derechos Reservados ITSUR 2020</p>
    </footer>
    <script src="js/jquery-3.4.1.min.js"></script>
    <script src="js/bootstrap.min.js"></script>
</body>
</html>


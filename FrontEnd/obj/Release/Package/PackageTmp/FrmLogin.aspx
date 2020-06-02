<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="FrmLogin.aspx.cs" Inherits="FrontEnd.FrmLogin" %>

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Login</title>
    <link rel="stylesheet" href="css/bootstrap.min.css" />
    <link rel="stylesheet" href="css/header_footer.css" />
    <link rel="stylesheet" href="css/estilos.css" />
</head>
<body>
    <form runat="server">
        <nav>
            <div class="row fila universal">
                <div class="col-1" id="logo">
                    <a href="#">
                        <img src="imagenes/itsur.jfif" alt="logo ITSUR" /></a>
                </div>
                <div class="col-4" style="text-align: left; align-self: center; padding-left: 50px;">
                    <h2><a href="#">RESIDENTES ITSUR</a></h2>
                </div>
                <div class="col-md-7 items">
                    <ul class="invitado">
                        <li><a style="font-size: 16px !important;" id="buscar_residencias" href="FrmBuscarResidencias.aspx">BUSCAR RESIDENCIAS</a></li>
                        <li><a style="font-size: 16px !important;" id="nosotros" href="FrmNosotros.aspx">NOSOTROS</a></li>
                        <li><a href="FrmLogin.aspx" class="activo" style="font-size: 16px !important;">LOGIN</a></li>
                    </ul>
                </div>
            </div>
        </nav>
        <div class="contenedorLogin px-3 py-3 mb-2">
            <div id="divMensaje" class="alert alert-danger py-3 text-center" runat="server">
                Los datos que ingresaste son incorrectos, intentalo de nuevo
           
            </div>
            <div id="divMsg" class="alert alert-danger py-3 text-center" style="display: none;">
                Ha ocurrido un error
           
            </div>
            <div class="form-row justify-content-center">
                <div class="col-md-6 mb-3">
                    <label for="txtEmail">Email</label>
                    <asp:TextBox ID="txtEmail" TextMode="Email" autocomplete="off" placeholder="info@info.com" class="form-control" runat="server" required></asp:TextBox>
                    <div class="invalid-feedback pl-3">
                        El correo electrónico es obligatorio y debe tener un formato válido
             
                   
                    </div>
                </div>
            </div>
            <div class="form-row justify-content-center">
                <div class="col-md-6 mb-3">
                    <label for="txtPassword">Contraseña</label>

                    <asp:TextBox ID="txtPassword" TextMode="Password" class="form-control" autocomplete="off" runat="server" required MaxLength="20"></asp:TextBox>
                    <div class="invalid-feedback pl-3">
                        La contraseña es obligatoria, debe contener entre 8 y 16 caracteres
                   
                    </div>
                </div>
            </div>
            <div class="form-row justify-content-center">
                <asp:Button ID="btnIniciarSesion" class="btn btn-primary px-2 py-2" runat="server" Text="Iniciar Sesión" OnClick="btnIniciarSesion_Click" />
            </div>
        </div>
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
    </form>
    <script src="js/jquery-3.4.1.min.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <script src="js/FrmLogin.min.js"></script>
</body>
</html>


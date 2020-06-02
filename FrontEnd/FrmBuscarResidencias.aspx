<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="FrmBuscarResidencias.aspx.cs" Inherits="FrontEnd.FrmBuscarResidencias" %>

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>Buscar Residencias</title>
    <link rel="stylesheet" href="css/bootstrap.css"/>
    <link rel="stylesheet" href="css/header_footer.css"/>
    <link rel="stylesheet" href="css/estilos.css"/>
</head>
<body>
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
                        <li><a style="font-size: 16px !important;" class="activo" id="buscar_residencias" href="FrmBuscarResidencias.aspx">BUSCAR RESIDENCIAS</a></li>
                        <li><a style="font-size: 16px !important;" id="nosotros" href="FrmNosotros.aspx">NOSOTROS</a></li>
                        <li><a href="FrmLogin.aspx" style="font-size: 16px !important;">LOGIN</a></li>
                    </ul>
                </div>
            </div>
        </nav>
        <div class="contenedor">
            <div class="buscador">
                <h2 class="form-row justify-content-center pt-4">BUSCA EL LUGAR PARA REALIZAR TUS RESIDENCIAS</h2>
                <div class="row justify-content-center">
                    <div class="col-md-2 mt-5 text-right text-success">
                        <label for="ddlEstadoBusqueda" class="mt-2">Seleccione un Estado:</label>
                    </div>
                    <asp:DropDownList ID="ddlEstadoBusqueda" runat="server" class="form-control col-md-2 mt-5" AutoPostBack="false"></asp:DropDownList>
                    <div class="invalid-feedback">
                        Debes seleccionar una ciudad para realizar la busqueda
                    </div>
                    <div class="col-md-2 mt-5 text-right">
                        <label for="ddlMunicipioBusqueda" class="mt-2 text-success">Seleccione un Municipio:</label>
                    </div>
                    <asp:DropDownList ID="ddlMunicipioBusqueda" runat="server" class="form-control col-md-2 mt-5" AutoPostBack="false"></asp:DropDownList>
                    <div class="invalid-feedback">
                        Debes seleccionar una ciudad para realizar la busqueda
                    </div>
                    <div class="col-md-2 mt-5">
                        <input id="btnBuscar" type="button" class="btn btn-primary btn-block" value="BUSCAR" />
                    </div>
                </div>
            </div>

            <h2 class="form-row justify-content-center mt-3 mb-3">ENCUENTRA UNA EMPRESA POR ÁREA</h2>
            <div class="row mt-5 mb-5">
                <div class="col-2 text-center">
                    <a href="#" onclick="filtrarBusquedaArea('Sistemas Computacionales')">
                        <img src="imagenes/codificacion.svg" style="width: 55px;" alt="logo ITSUR" />
                        <h4>Sistemas Computacionales
                        </h4>
                    </a>
                </div>

                <div class="col-2 text-center">
                    <a href="#" onclick="filtrarBusquedaArea('Gestion Empresarial')">
                        <img src="imagenes/equipo.svg" style="width: 55px;" alt="logo ITSUR" />
                        <h4 class="text-center">Gestión Empresarial
                        </h4>
                    </a>
                </div>
                <div class="col-2 text-center">
                    <a href="#" onclick="filtrarBusquedaArea('Industrial')">
                        <img src="imagenes/fabrica.svg" style="width: 55px;" alt="logo ITSUR" />
                        <h4 class="text-center">Industrial
                        </h4>
                    </a>
                </div>
                <div class="col-2 text-center">
                    <a href="#" onclick="filtrarBusquedaArea('Ambiental')">
                        <img src="imagenes/tierra.svg" style="width: 55px;" alt="logo ITSUR" />
                        <h4 class="text-center">Ambiental
                        </h4>
                    </a>
                </div>
                <div class="col-2 text-center">
                    <a href="#" onclick="filtrarBusquedaArea('Electrónica')">
                        <img src="imagenes/manufacturing.svg" style="width: 55px;" alt="logo ITSUR" />
                        <h4 class="text-center">Electrónica
                        </h4>
                    </a>
                </div>
                <div class="col-2 text-center">
                    <a href="#" onclick="filtrarBusquedaArea('Sistemas Automotrices')">
                        <img src="imagenes/mecanico.svg" style="width: 55px;" alt="logo ITSUR" />
                        <h4 class="text-center">Automotriz
                        </h4>
                    </a>
                </div>
            </div>
            <div id="ofertasEncontradas">

            </div>
        </div>
        <footer class="mt-auto py-3">
            <p id="linkItsur"><a href="http:\\www.itsur.edu.mx" target="_blank">Instituto Tecnológico Superior del Sur de Guanajuato</a></p>
            <div id="logoFooter">
                <img  src="imagenes/logo.png" alt="logo ITSUR" />
            </div>
            <div id="halconFooter">
                <img  src="imagenes/halcon.png" alt="Mascota halcon ITSUR" />
            </div>
            <p id="lemaITSUR" class="text-info">"Tecnología y calidad para la vida"</p>
            <p id="telefonosITSUR" class="text-info">Tels. (445) 4577468 al 71. 4588278, 4588311 y 4588312</p>
            <p id="domicilioITSUR1" class="text-info">Av. Educación Superior No. 2000, Colonia: Benito Juárez.</p>
            <p id="domicilioITSUR2" class="text-right text-info">Uriangato, Gto. C.P. 38980 Ap. Postal No.61</p>
            <p id="copyright" class="text-info">Todos los Derechos Reservados ITSUR 2020</p>
        </footer>
    </form>
    <script src="js/jquery-3.4.1.js"></script>
    <script src="js/bootstrap.js"></script>
    <script src="js/FrmBuscarResidencias.js"></script>
</body>
</html>

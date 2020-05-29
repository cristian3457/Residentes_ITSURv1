<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="FrmNosotros.aspx.cs" Inherits="FrontEnd.FrmNosotros" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Nosotros</title>
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
                        <img src="imagenes/itsur.jfif" alt="logo ITSUR" />
                    </a>
                </div>
                <div class="col-4" style="text-align: left; align-self: center; padding-left: 50px;">
                    <h2><a href="#">RESIDENTES ITSUR</a></h2>
                </div>
                <div class="col-md-7 items">
                    <ul class="invitado">
                        <li><a style="font-size: 16px !important;" id="buscar_residencias" href="FrmBuscarResidencias.aspx">BUSCAR RESIDENCIAS</a></li>
                        <li><a style="font-size: 16px !important;" class="activo" id="nosotros" href="FrmNosotros.aspx">NOSOTROS</a></li>
                        <li><a href="FrmLogin.aspx" style="font-size: 16px !important;">LOGIN</a></li>
                    </ul>
                </div>
            </div>
        </nav>
        <div class="textoNosotros">
            <div id="halcon1">
                <img src="imagenes/halcon.png" alt="Alcon del ITSUR" />
            </div>
            <div id="halcon2">
                <img src="imagenes/halcon.png" alt="Alcon del ITSUR" />
            </div>
            <h2 class="text-center text-success mb-3 mt-2">Presentación de los alumnos de Ingeniería en Sistemas Computacionales</h2>
            <h3 class="text-center text-primary">Saludos!</h3>
            <p class="text-justify" style="width: 70% !important; margin: 0 auto !important;">
                Somos un grupo de estudiantes del Instituto Tecnológico Superior del sur de Guanajuato, pertenecientes a la carrera
                de Ingeniería en Sistemas Computacionales, con el objetivo de desarrollar un proyecto que tenga una finalidad útil
                para toda la comunidad estudiantil de la institución, así como para las empresas y negocios que nos han apoyado, 
                siendo parte del cumplimiento de la acreditación de materias del desarrollo web y de investigación.                             
           
            </p>
            <div id="alumnosInvolucrados">
                <p class="text-danger">Los alumnos involucrados en este proyecto somos:</p>
                <ul>
                    <li>Cristian Fernández Nieto - Líder del proyecto</li>
                    <li>José Jesús Ramos Aguilera</li>
                    <li>Jesús Antonio Álvarez Zavala</li>
                    <li>José de Jesús Martínez Martínez</li>
                </ul>
            </div>
            <p class="text-justify" style="width: 70% !important; margin: 0 auto !important;">
                Agradecemos a las empresas enlistadas en esta página que nos han brindado su apoyo para que este proyecto
                alcance su objetivo, dándose a conocer para que los alumnos de las diferentes carreras del ITSUR conozcan todas las
                oportunidades de realizar sus residencias profesionales, así como agradecer a los docentes que nos asesoraron durante
                el desarrollo de la página.
           
            </p>
            <p class="mt-3 text-center" id="herramienta">Esperamos que esta herramienta sea de utilidad y siempre esté al alcance de todos.   <a href="#">#ITSURGEEK</a></p>
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
    <script src="js/jquery-3.4.1.js"></script>
    <script src="js/bootstrap.js"></script>
</body>
</html>

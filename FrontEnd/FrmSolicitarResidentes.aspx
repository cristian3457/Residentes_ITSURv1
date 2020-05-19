<%@ Page Title="" Language="C#" MasterPageFile="~/Site2.Master" AutoEventWireup="true" CodeBehind="FrmSolicitarResidentes.aspx.cs" Inherits="FrontEnd.FrmSolicitarResidentes" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="contenido" runat="server">
                <!-------------------INICIA MODAL INFORMACIÓN---------------------->
    <div class="modal"  data-backdrop="static" id="mdlInformacion" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">INFORMACIÓN DE LOS CAMBIOS</h5>
      </div>
      <div class="modal-body">
        <p>LOS CAMBIOS FUERON REALIZADOS CORRECTAMENTE</p>
      </div>
      <div class="modal-footer">
        <button type="button" id="btnAceptar" class="btn btn-primary">ACEPTAR</button>
      </div>
    </div>
  </div>
</div>
    <!--Termina modal información -->
    <form runat="server">
        <asp:HiddenField ID="txtEmailUsuario" runat="server" />
    <div class="formulario pb-5">
        <h2 class="text-center pt-4 mb-2 titleOfertas">REGISTRAR LOS DATOS PARA LAS OFERTAS DE RESIDENCIAS</h2>
        <div class="form-row justify-content-center mt-4 mb-2">
            <div class="text-right col-md-2">
                <label for="txtPerfil">Perfil del residente:</label>
            </div>
            <asp:TextBox ID="txtPerfil" type="text" autocomplete="off" class="form-control col-md-3" runat="server" required></asp:TextBox>
            <div class="invalid-feedback col-md-5">
                Debes de ingresar el perfil que debe tener el residente, este campo debe contener como mínimo 5 caracteres
            </div>
            <div class="text-right col-md-2">
                <label for="txtSueldo">Sueldo Mensual:</label>
            </div>
            <asp:TextBox ID="txtSueldo" placeholder="$2,500 - $3,800" type="text" autocomplete="off" class="form-control col-md-3" runat="server" required></asp:TextBox>
        </div>
        <div class="form-row justify-content-center mt-3 mb-2">
            <div class="col-md-2 mt-3 text-right">
                <label for="ddlCarrera">Carrera institucional:</label>
            </div>
            <asp:DropDownList ID="ddlCarrera" runat="server" class="form-control col-md-3 mt-3" AutoPostBack="false"></asp:DropDownList>
            <div class="invalid-feedback">
                Debes seleccionar una carrera de las que aparecen en la lista desplegable
            </div>
            <div id="divSolicito" class="text-right col-md-2">
                <label for="txtSolicito">Solicito:</label>
            </div>
            <textarea id="txtSolicito" placeholder="Misión de la empresa" style="height:120px !important;" required class="col-md-3"></textarea>
            <div class="invalid-feedback form-row col-md-5 ml-2 mt-4">
                Debes ingresar una descripción del residente que estas buscando, este campo debe contener como mínimo 10 caracteres
            </div>
        </div>
        <div class="form-row justify-content-center mt-3 mb-2">
            <div class="text-right col-md-2" id="divRequisitos">
                <label for="txtRequisitos">Requisitos:</label>
            </div>
            <textarea id="txtRequisitos" placeholder="Requisitos que debe cumplir el solicitante" style="height:120px !important;" required class="col-md-3""></textarea>
            <div class="invalid-feedback form-row col-md-5 ml-2 mt-4">
                Debes ingresar los requisitos que tiene que cumplir el residente, este campo debe contener como mínimo 10 caracteres
            </div>
            <div class="text-right col-md-2">
                <label for="txtActividades">Actividades que realizara el residente:</label>
            </div>
            <textarea id="txtActividades" placeholder="Misión de la empresa" style="height:120px !important;" required class="col-md-3"></textarea>
            <div class="invalid-feedback form-row col-md-5 ml-2 mt-4">
               Debes ingresar las actividades que desempeñara el residente, este campo debe contener como mínimo 10 caracteres
            </div>
        </div>
        <div class="form-row justify-content-center mt-4 mb-5 pb-3">
            <div class="text-center col-md-5 pt-4">
                <input id="btnRegistrar" class="btn btn-primary text-center" style="padding: 10px 25px!important;" type="button" value="REGISTRAR" />
                <input id="btnCancelar" class="btn btn-danger ml-5" style="padding: 10px 15px!important;" type="button" value="Cancelar" />
            </div>
        </div>
        </div>
    </form>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="scripts" runat="server">
    <script src="js/FrmSolicitarResidentes.js"></script>
    <script>
        $().ready(function () {
            var email_usuario = $("#contenido_txtEmailUsuario").val();
            var id_oferta = localStorage.getItem("id_oferta");
            if (id_oferta != null) {
                $("#btnRegistrar").val("Editar");
                $(".titleOfertas").text("EDITAR DATOS PARA LAS OFERTAS DE RESIDENCIAS");
                var datos = "{ 'id_oferta' : '" + id_oferta + "'}";
                cargarDatosEditar(datos);
            }
            var btn = document.getElementById("btnRegistrar");
            btn.addEventListener('click', validar);
            var btnAceptar = document.getElementById("btnAceptar");
            btnAceptar.addEventListener('click', cerrar_modal);
            $("#btnCancelar").click(function () {
                localStorage.removeItem("id_oferta");
                window.location.assign("FrmContenedor.aspx");
            });
        });
    </script>
</asp:Content>


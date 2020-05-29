<%@ Page Title="" Language="C#" MasterPageFile="~/Site2.Master" AutoEventWireup="true" CodeBehind="FrmGestionarUsuarios.aspx.cs" Inherits="FrontEnd.FrmGestionarUsuarios" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="css/datatables.css" rel="stylesheet" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="contenido" runat="server">
              <!-------------------INICIA MODAL---------------------->
    <div class="modal" id="mdlConfirmar" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Confirmar eliminación</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <p>Estás seguro que deseas eliminar?</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-danger" id="confirmarEliminar" data-dismiss="modal">Eliminar</button>
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
      </div>
    </div>
  </div>
</div>
    <!--Termina modal -->    
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
        <button type="button" id="btnAceptar" data-dismiss="modal" class="btn btn-primary">ACEPTAR</button>
      </div>
    </div>
  </div>
</div>
    <!--Termina modal información -->  
                    <% 
                        if (Session["tipo_usuario"] == null || Session["tipo_usuario"].ToString() == "")
                        {
                            Response.Redirect("FrmLogin.aspx");
                            Session["tipo_usuario"] = "";
                        }
                        else if (Session["tipo_usuario"].ToString() == "Administrador")
                        {
                    %>
    <form runat="server">
        <div id="divContenido">
        <div class="containerPrincipal pl-3 pb-3 pr-3 mb-5">
                <h1 class="pt-3 ">GESTIONAR USUARIOS</h1>
            <input id="btnRegistrar" type="button" value="Registrar" class="btn btn-success mb-4" onclick="Registrar()" />
            <table id="listaUsuarios" class="table table-bordered table-striped mb-3 mt-3 text-center"> </table>
            </div>
                </div>
    </form>
        <%}
        else { Response.Redirect("FrmLogin.aspx"); }%>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="scripts" runat="server">
    <script src="js/datatables.js"></script>
    <script src="js/FrmGestionarUsuarios.js"></script>
    <script>
        $(document).ready(function () {
            let tabla = $('#listaUsuarios');
            tabla.empty();
            cargarDatos();
            $("#btnAceptar").click(function () {
                let tabla = $('#listaUsuarios');
                tabla.empty();
                cargarDatos();
            });
        });
        function Registrar() {
            window.sessionStorage.removeItem("id_usuario");
            $('#divContenido').load('FrmCrearUsuarios.aspx');
        }
    </script>
</asp:Content>

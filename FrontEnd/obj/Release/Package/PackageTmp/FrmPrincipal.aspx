<%@ Page Title="" Language="C#" MasterPageFile="~/Site2.Master" AutoEventWireup="true" CodeBehind="FrmPrincipal.aspx.cs" Inherits="FrontEnd.FrmPrincipal" %>
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
                        else if (Session["tipo_usuario"].ToString() == "Empresa" || Session["tipo_usuario"].ToString() == "Administrador")
                        {
                    %>

    <form runat="server">
        <asp:HiddenField ID="txtTipoUsuario" runat="server" />
        <div id="divContenido">
        <%
            String tipo = Session["tipo_usuario"].ToString();
        %>
        <div class="containerPrincipal pl-3 pb-3 pr-3 mb-5">
            <h1 class="pt-3 ">Bienvenido <%= tipo %></h1>
            <%
                if (Session["tipo_usuario"].ToString()  == "Administrador")
                {
%>
            <input id="btnRegistrar" type="button" value="Registrar" class="btn btn-success mb-4" onclick="Registrar()" />
            <table id="grvLista" class="table table-bordered table-striped mb-3 mt-3"> </table>
            </div>
            <%
                }
                 %>
                        <%
                else if (Session["tipo_usuario"].ToString()  == "Empresa")
                {
%>
                    <div id="divOfertas">
                        
                    </div>
           
            <%
                }
                 %>
         </div>
       
    </form>
        <%}
        else { Response.Redirect("FrmLogin.aspx"); }%>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="scripts" runat="server">
    <script src="js/datatables.js"></script>
    <script src="js/FrmPrincipal.js"></script>
    
    <script>
        function Eliminar(btn) {
            $('#mdlConfirmar').modal('show');
            let id = $(btn).closest("tr").children().first().text();
            $("#confirmarEliminar").unbind("click");
            $("#confirmarEliminar").click(function () {
                eliminar(id);
            });
        }
        function Editar(btn) {
            let id = $(btn).closest("tr").children().first().text();
            window.sessionStorage.removeItem("id_empresa");
            window.sessionStorage.setItem("id_empresa",id);
            $('#divContenido').load('FrmRegistrarDatos.aspx');
        }
        function Registrar() {
            window.sessionStorage.removeItem("id_empresa");
            window.sessionStorage.setItem("id_empresa", "vacio");
            $("#divContenido").load("FrmRegistrarDatos.aspx");
        }
        
    </script>
</asp:Content>


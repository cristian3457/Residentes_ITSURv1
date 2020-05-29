<%@ Page Title="" Language="C#" MasterPageFile="~/Site2.Master" AutoEventWireup="true" CodeBehind="FrmRegistrarDatos.aspx.cs" Inherits="FrontEnd.FrmRegistrarDatos" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="contenido" runat="server">
    <!-------------------INICIA MODAL INFORMACIÓN---------------------->
    <div class="modal" data-backdrop="static" id="mdlInformacion" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header bg-success">
                    <h5 class="modal-title text-white">INFORMACIÓN DE LOS CAMBIOS</h5>
                </div>
                <div class="modal-body">
                    <p>LOS CAMBIOS FUERON REALIZADOS CORRECTAMENTE</p>
                </div>
                <div class="modal-footer">
                    <input id="btnAceptarInfo" data-dismiss="modal" class="btn btn-primary" type="button" value="Aceptar" />
                </div>
            </div>
        </div>
    </div>
    <!--Termina modal información -->
    <!-------------------INICIA MODAL INFORMACIÓN---------------------->
    <div class="modal" data-backdrop="static" id="mdlValidacionCampos" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header bg-warning">
                    <h5 class="modal-title text-white">REVISA LA INFORMACIÓN QUE INGRESASTE</h5>
                </div>
                <div class="modal-body">
                    <p>ALGUNOS CAMPOS DEL FORMULARIO NO CUMPLEN LOS REQUISITOS, VERIFICA LA INFORMACIÓN QUE INGRESASTE</p>
                </div>
                <div class="modal-footer">
                    <input data-dismiss="modal" class="btn btn-primary" type="button" value="Aceptar" />
                </div>
            </div>
        </div>
    </div>
    <!--Termina modal información -->
    <!-------------------INICIA MODAL ERROR---------------------->
    <div class="modal" data-backdrop="static" id="mdlError" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header bg-danger">
                    <h5 class="modal-title text-white">HA OCURRIDO UN ERROR</h5>
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
    <form id="FrmRegistrarDatos" runat="server">
        <asp:HiddenField ID="txtEmailUsuario" runat="server" />
        <div class="formulario pb-5 universal">
            <h2 class="text-center pt-4 mb-2" id="titulo">REGISTRAR DATOS DE CONTACTO</h2>
            <div class="form-row mt-4 mb-2">
                <div class="form-group col-md-6 pl-4">
                    <label class="ml-3 texto_etiquetas" for="txtEmpresa">Nombre de la Empresa</label>
                    <asp:TextBox ID="txtEmpresa" placeholder="Nombre de la Empresa" class="form-control col-md-11 ml-3" autocomplete="off" runat="server" required MaxLength="60"></asp:TextBox>
                </div>
                <div class="form-group col-md-6 pl-4">
                    <label for="txtEmail" class="texto_etiquetas ml-3">Correo Electrónico</label>
                    <asp:TextBox ID="txtEmail" placeholder="Correo Electrónico" autocomplete="off" class="form-control col-md-11" runat="server" required></asp:TextBox>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col-md-6 pl-4">
                    <label for="ddlEstado" class="ml-3 texto_etiquetas">Estado</label>
                    <asp:DropDownList ID="ddlEstado" runat="server" class="form-control col-md-10" AutoPostBack="false"></asp:DropDownList>
                </div>
                <div class="form-group col-md-6 pl-4">
                    <label for="ddlMunicipio" class="ml-3 texto_etiquetas">Municipio</label>
                    <asp:DropDownList ID="ddlMunicipio" runat="server" class="form-control col-md-10"></asp:DropDownList>
                </div>
            </div>

            <div class="form-row">
                <div class="form-group col-md-6 pl-4">
                    <label for="txtCP" class="ml-3 texto_etiquetas">Código Postal</label>
                    <asp:TextBox ID="txtCP" placeholder="Código Postal" autocomplete="off" class="form-control col-md-7" runat="server" required></asp:TextBox>
                </div>
                <div class="form-group col-md-6 pl-4">
                    <label for="txtDomicilio" class="ml-3 texto_etiquetas">Domicilio</label>
                    <asp:TextBox ID="txtDomicilio" placeholder="Domicilio" autocomplete="off" class="form-control col-md-11" runat="server" required></asp:TextBox>
                </div>
            </div>

            <div class="form-row">
                <div class="form-group col-md-6 pl-4">
                    <label class="ml-3 texto_etiquetas">Giro o Ramo:</label>
                    <asp:RadioButton ID="RadioIndustrial" GroupName="Giro" Text="Industrial" runat="server" />
                    <asp:RadioButton ID="RadioServicios" GroupName="Giro" Text="Servicios" runat="server" />
                    <asp:RadioButton ID="RadioOtro" GroupName="Giro" Text="Otro" runat="server" />
                </div>
                <div class="form-group col-md-6 pl-4">
                    <label class="ml-3 texto_etiquetas">Sector:</label>
                    <asp:RadioButton ID="RadioPublico" GroupName="Sector" Text="Público" runat="server" />
                    <asp:RadioButton ID="RadioPrivado" GroupName="Sector" Text="Privado" runat="server" />
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col-md-6 pl-4">
                    <label for="txtTelefono" class="ml-3 texto_etiquetas">Teléfono</label>
                    <asp:TextBox ID="txtTelefono" placeholder="445 445 6789" type="tel" autocomplete="off" class="form-control col-md-8" runat="server" required></asp:TextBox>
                </div>
                <div class="form-group col-md-6 pl-4">
                    <label for="txtMision" class="ml-3 texto_etiquetas">Misión</label>
                    <asp:TextBox ID="txtMision" class="col-md-10" placeholder="Misión de la empresa" required TextMode="MultiLine" runat="server"></asp:TextBox>
                </div>
            </div>
            <div class="form-row justify-content-center mt-3 mb-5">
                <input id="btnRegistrar" class="btn btn-success" type="button" value="Registrar" />
                <input id="btnCancelar" class="btn btn-danger ml-5" type="button" value="Cancelar" />
            </div>
        </div>
    </form>
    <%}
        else { Response.Redirect("FrmLogin.aspx"); }%>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="scripts" runat="server">
    <script src="js/bootstrapValidator.js"></script>
    <script src="js/FrmRegistrarDatos.js"></script>
</asp:Content>

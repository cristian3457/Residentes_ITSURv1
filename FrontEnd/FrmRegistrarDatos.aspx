<%@ Page Title="" Language="C#" MasterPageFile="~/Site2.Master" AutoEventWireup="true" CodeBehind="FrmRegistrarDatos.aspx.cs" Inherits="FrontEnd.FrmRegistrarDatos" %>
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
    <div class="formulario pb-5 universal">
        <h2 class="text-center pt-4 mb-2" id="titulo">REGISTRAR DATOS DE CONTACTO</h2>
        <div class="form-row justify-content-center mt-4 mb-2">
            <div class="text-right col-md-3">
                <label class="" for="txtEmpresa">Nombre de la Empresa:</label>
            </div>
            <asp:TextBox ID="txtEmpresa" placeholder="Nombre de la Empresa" class="form-control col-md-5" autocomplete="off" runat="server" required MaxLength="60"></asp:TextBox>
            <div class="invalid-feedback form-row col-md-3">
                El nombre de la empresa debe contener entre 5 y 60 caracteres
            </div>
        </div>

        <div class="form-row justify-content-center mb-2">
            <div class="text-right col-md-2">
                <label for="txtEmail" class="text-right texto">Correo Electrónico:</label>
            </div>
            <asp:TextBox ID="txtEmail" placeholder="Correo Electrónico" autocomplete="off" class="form-control col-md-4" runat="server" required></asp:TextBox>
            <div class="invalid-feedback form-row col-md-3">
                El correo electrónico es obligatorio y debe tener un formato válido
            </div>
        </div>

        <div class="form-row justify-content-center mb-2">
            <div class="text-right col-md-1">
                <label for="ddlEstado" class="text-right texto">Estado:</label>
            </div>
            <asp:DropDownList ID="ddlEstado" runat="server" class="form-control col-md-3" AutoPostBack="false">
            </asp:DropDownList>
            <div class="invalid-feedback form-row col-md-3">
                Debes seleccionar una estado de los que aparecen en la lista desplegable
            </div>
        </div>
        <div class="form-row justify-content-center mb-2">
            <div class="text-right col-md-1">
                <label for="ddlMunicipio" class="text-right texto">Municipio:</label>
            </div>
            <asp:DropDownList ID="ddlMunicipio" runat="server" class="form-control col-md-3">
            </asp:DropDownList>
            <div class="invalid-feedback form-row col-md-2">
                Debes seleccionar una municipio de los que aparecen en la lista desplegable
            </div>
        </div>
        <div class="form-row justify-content-center mb-2">
            <div class="text-left col-md-2 ">
                <label for="txtCP" class="text-left lbl">Código Postal:</label>
            </div>
            <asp:TextBox ID="txtCP" placeholder="Código Postal" autocomplete="off" class="form-control col-md-2" runat="server" required></asp:TextBox>
            <div class="invalid-feedback form-row col-md-3">
                El código postal debe contener 5 caracteres númericos
            </div>
        </div>
        <div class="form-row justify-content-center mb-2">
            <div class="text-right col-md-2">
                <label for="txtDomicilio" class="text-right texto">Domicilio:</label>
            </div>
            <asp:TextBox ID="txtDomicilio" placeholder="Domicilio" autocomplete="off" class="form-control col-md-4" runat="server" required></asp:TextBox>
            <div class="invalid-feedback form-row col-md-3">
                El domicilio debe contener entre 10 y 80 caracteres
            </div>
        </div>
        <div class="form-row justify-content-center mb-2">
            <div class="col-md-2">
                <label class="text-right" id="giro">Giro o Ramo:</label>
            </div>
                <asp:RadioButton ID="RadioIndustrial" GroupName="Giro" Text="Industrial" runat="server" />
                <asp:RadioButton ID="RadioServicios" GroupName="Giro" Text="Servicios" runat="server" />
                <asp:RadioButton ID="RadioOtro" GroupName="Giro" Text="Otro" runat="server" />
            <div class="invalid-feedback form-row col-md-3 ml-2">
                Debes seleccionar una opción
            </div>
        </div>
        <div class="form-row justify-content-center mb-2">
            <div class="col-md-1">
                <label class="text-left" id="sector">Sector:</label>
            </div>
                <asp:RadioButton ID="RadioPublico" GroupName="Sector" Text="Público" runat="server" />
                <asp:RadioButton ID="RadioPrivado" GroupName="Sector" Text="Privado" runat="server" />
            <div class="invalid-feedback form-row col-md-3 ml-2">
                Debes seleccionar una opción
            </div>
        </div>
        <div class="form-row justify-content-center mb-2">
            <div class="text-right col-md-1">
                <label for="txtTelefono" class="text-right texto">Teléfono:</label>
            </div>
            <asp:TextBox ID="txtTelefono" placeholder="(+52) 445 445 6789" type="tel" autocomplete="off" class="form-control col-md-3" runat="server" required></asp:TextBox>
            <div class="invalid-feedback form-row col-md-3">
                El número de télefono debe contener entre 10 y 18 caracteres
            </div>
        </div>
        <div class="form-row justify-content-center mb-2">
            <div class="text-right col-md-2 mr-3">
                <label for="txtMision" class="text-right texto">Misión:</label>
            </div>
            <asp:TextBox ID="txtMision" class="col-md-4" placeholder="Misión de la empresa" required TextMode="MultiLine" runat="server"></asp:TextBox>
            <div class="invalid-feedback form-row col-md-3">
                La misión de la empresa es obligatoria y debe contener al menos 10 caracteres
            </div>
        </div>
        <div class="form-row justify-content-center mt-3 mb-5">
            <input id="btnRegistrar" class="btn btn-success" type="button" value="Registrar" />
            <input id="btnCancelar" class="btn btn-danger ml-5" type="button" value="Cancelar" />
        </div>
    </div>

</form>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="scripts" runat="server">
        <script src="js/FrmRegistrarDatos.js"></script>
    <script>
$().ready(function () {
    var id = localStorage.getItem("id_empresa");
    localStorage.setItem("id_municipio", null);
    var email_usuario = $("#contenido_txtEmailUsuario").val();
    if (id == "vacio") {

    }
    else if (email_usuario != null && email_usuario != "" && id == null) {
        var datos = "{ 'email' : '" + email_usuario + "'}";
        $.when(cargarDatosEmail(datos)).then(function () {
            setTimeout(function () {
                var id_mun = localStorage.getItem("id_municipio");
                if (id_mun != 0 && id_mun > 0) {
                    $("#contenido_ddlMunicipio").val(id_mun);
                    $('#contenido_ddlMunicipio').change();
                }
            }, 150);
        });
    } else if (id != null) {
        $.when(cargarDatosID()).then(function () {
            setTimeout(function () {
                var id_mun = localStorage.getItem("id_municipio");
                if (id_mun != 0 && id_mun > 0) {
                    $("#contenido_ddlMunicipio").val(id_mun);
                    $('#contenido_ddlMunicipio').change();
                }
            }, 150);
        });
    } else {

    }
    $("#<%=ddlEstado.ClientID%>").change(function () {
        var nombre_estado = $('#<%=ddlEstado.ClientID%> :selected').text();
        var datos = "{ 'estado' : '" + nombre_estado + "'}";
        cambiarMunicipios(datos);
    });
    var btn = document.getElementById("btnRegistrar");
    var btnAceptar = document.getElementById("btnAceptar");
    btn.addEventListener('click', validar);
    btnAceptar.addEventListener('click', cerrar_modal);
    $("#btnCancelar").click(function () {
        localStorage.removeItem("id_empresa");
        window.location.assign("FrmContenedor.aspx");
    });
});
    </script>
</asp:Content>

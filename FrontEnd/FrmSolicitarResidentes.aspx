﻿<%@ Page Title="" Language="C#" MasterPageFile="~/Site2.Master" AutoEventWireup="true" CodeBehind="FrmSolicitarResidentes.aspx.cs" Inherits="FrontEnd.FrmSolicitarResidentes" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="contenido" runat="server">
    <% 
        if (Session["tipo_usuario"] == null || Session["tipo_usuario"].ToString() == "")
        {
            Response.Redirect("FrmLogin.aspx");
            Session["tipo_usuario"] = "";
        }
        else if (Session["tipo_usuario"].ToString() == "Empresa")
        {
    %>
    <form id="FrmSolicitarResidentes" runat="server">
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
        <asp:HiddenField ID="txtEmailUsuario" runat="server" />
        <div class="formulario pb-5">
            <h2 class="text-center pt-4 mb-2 titleOfertas">REGISTRAR LOS DATOS PARA LAS OFERTAS DE RESIDENCIAS</h2>
            <div class="form-row mt-4">
                <div class="form-group col-md-4 pl-5">
                    <label for="txtPerfil" class="ml-3 texto_etiquetas">Perfil del residente</label>
                    <asp:TextBox ID="txtPerfil" type="text" autocomplete="off" class="form-control" runat="server" required></asp:TextBox>
                </div>
                <div class="form-group col-md-4 pl-5">
                    <label for="txtSueldo" class="ml-3 texto_etiquetas">Sueldo Mensual</label>
                    <asp:TextBox ID="txtSueldo" placeholder="$2,500 - $3,800" type="text" autocomplete="off" class="form-control" runat="server"></asp:TextBox>
                </div>
                <div class="form-group col-md-4 pl-5 pr-4">
                    <label for="ddlCarrera" class="ml-3 texto_etiquetas">Carrera institucional</label>
                    <asp:DropDownList ID="ddlCarrera" runat="server" class="form-control col-md-11" AutoPostBack="false"></asp:DropDownList>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col-md-4 pl-5 pr-4">
                    <label for="txtSolicito" class="ml-3 texto_etiquetas">Solicito</label>
                    <textarea id="txtSolicito" name="txtSolicito" placeholder="Misión de la empresa" style="height: 110px !important;" required class="col-md-11"></textarea>
                </div>
                <div class="form-group col-md-4 pl-5 pr-4">
                    <label for="txtRequisitos" class="ml-3 texto_etiquetas">Requisitos</label>
                    <textarea id="txtRequisitos" name="txtRequisitos" placeholder="Requisitos que debe cumplir el solicitante" style="height: 110px !important;" required class="col-md-11"></textarea>
                </div>
                <div class="form-group col-md-4 pl-5 pr-4">
                    <label for="txtActividades" class="ml-3 texto_etiquetas">Actividades</label>
                    <textarea id="txtActividades" name="txtActividades" placeholder="Actividades que realizara el residente" style="height: 110px !important;" required class="col-md-11"></textarea>
                </div>
            </div>
            <div class="form-row justify-content-center mt-2">
                <div class="text-center col-md-5 pt-4">
                    <input id="btnRegistrar" class="btn btn-primary text-center" style="padding: 10px 25px!important;" type="button" value="REGISTRAR" />
                    <input id="btnCancelar" class="btn btn-danger ml-5" style="padding: 10px 15px!important;" type="button" value="Cancelar" />
                </div>
            </div>
        </div>
    </form>
    <%}
        else { Response.Redirect("FrmLogin.aspx"); }%>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="scripts" runat="server">
    <script src="js/bootstrapValidator.js"></script>
    <script src="js/FrmSolicitarResidentes.js"></script>
</asp:Content>


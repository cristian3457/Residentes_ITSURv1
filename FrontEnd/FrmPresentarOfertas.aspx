<%@ Page Title="" Language="C#" MasterPageFile="~/Site2.Master" AutoEventWireup="true" CodeBehind="FrmPresentarOfertas.aspx.cs" Inherits="FrontEnd.FrmPresentarOfertas" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
<%--        <link rel="stylesheet" href="css/estilos.css"/>--%>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="contenido" runat="server">
    <form runat="server">
         <asp:HiddenField ID="txtEmailUsuario" runat="server" />
    
    <div class="contenedor">
        <div class="row mt-2 mb-3">
            <div class="tarjetas">
            </div>
        <!--fin row-->
        </div>
    </div>
    <!--fin contenedor-->
        </form>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="scripts" runat="server">
    <script>
        $(document).ready(function () {
            var email_usuario = $("#contenido_txtEmailUsuario").val();
            localStorage.removeItem("id_oferta");
            if (email_usuario != null) {
                var datos = "{'email_usuario' : '" + email_usuario + "'}";
                mostrarOfertas(datos);
            }
        });
        function mostrarOcultar(btn) {
            var btnVerMas = $("#verMas" + btn);
            var valor = btnVerMas.val();
            if (valor == "Ver Más") {
                $(".card-text.pOcultar" + btn).css("display", "block");
                btnVerMas.val("Ver Menos");
            } else if (valor == "Ver Menos") {
                $(".card-text.pOcultar" + btn).css("display", "none");
                btnVerMas.val("Ver Más");
            }
        }
        function EditarOferta(id) {
            localStorage.removeItem("id_oferta");
            localStorage.setItem("id_oferta", id);
            $(".contenedor").load("FrmSolicitarResidentes.aspx");
        }
        function EliminarOferta(id) {
            $('#mdlConfirmar').modal('show');
            $("#confirmarEliminar").unbind("click");
            $("#confirmarEliminar").click(function () {
                var datos = "{ 'id_oferta' : '" + id + "'}";
                $.ajax({
                    type: 'POST',
                    url: 'ws/WSOfertas.asmx/delete',
                    data: datos,
                    contentType: 'application/json; utf-8',
                    dataType: 'json',
                    success: function (data) {
                        if (data.d) {
                            $('#mdlInformacion').modal('show');
                            $("#btnAceptar").unbind("click");
                            $("#btnAceptar").click(function () {
                                let cards = $('.tarjetas');
                                cards.empty();
                                var email_usuario = $("#contenido_txtEmailUsuario").val();
                                var datos = "{'email_usuario' : '" + email_usuario + "'}";
                                mostrarOfertas(datos);
                            });
                        }
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        alert(textStatus + " --- " + errorThrown + "--- ");
                    }
                });
            });
        }
        function mostrarOfertas(datos) {
            let cards = $('.tarjetas');
            cards.empty();
            $.ajax({
                type: 'POST',
                url: 'ws/WSOfertas.asmx/getOfertas',
                data: datos,
                contentType: 'application/json; utf-8',
                dataType: 'json',
                success: function (data) {
                    let datos_cards = JSON.parse(data.d);
                    if (datos_cards.length > 0) {
                        for (i = 0; i < datos_cards.length; i++) {
                            var divCardIndividual = $("<div class='card cardIndividual'></div>");
                            cards.append(divCardIndividual);
                            divCardIndividual.append("<h5 class='card-title tituloOferta'>RESIDENCIAS PROFESIONALES - <span id='area'>" + datos_cards[i].perfil + "</span></h5>");
                            divCardIndividual.append("<h6 class='card-subtitle mb-2 text-primary' id='empresa'><span class='bold'>" + datos_cards[i].nombre + "</span></h6>");
                            divCardIndividual.append("<p class='card-text'><span class='bold'>SUELDO: </span><span id='sueldo'>" + datos_cards[i].sueldo + "</span> MENSUAL</p>");
                            divCardIndividual.append("<p class='card-text'><span class='bold'><span id='empresa'>" + datos_cards[i].nombre + " </span>solicita: </span><span id='solicito'>" + datos_cards[i].solicito + "</span></p>");
                            divCardIndividual.append("<p class='card-text pOcultar" + i + "'><span class='bold'>REQUISITOS: </span><span id='requisitos'>" + datos_cards[i].requisitos + "</span></p>");
                            divCardIndividual.append("<p class='card-text pOcultar" + i + "'><span class='bold'>ACTIVIDADES: </span><span id='actividades'>" + datos_cards[i].actividades + "</span></p>");
                            divCardIndividual.append("<p class='card-text'><span class='bold'>UBICACIÓN: </span><span id='direccion'>" + datos_cards[i].domicilio + "</span><span id='municipio'> " + datos_cards[i].municipio + ",</span><span id='codigo_postal'> " + datos_cards[i].codigo_postal + "</span><span id='estado'> " + datos_cards[i].estado + "</span></p>");
                            divCardIndividual.append("<p class='card-text pOcultar" + i + "'><span class='bold'>DATOS DE CONTACTO: EMAIL: </span>" + datos_cards[i].email + "<span id='email'></span> <span class='bold'>TELÉFONO: </span><span id='telefono'>" + datos_cards[i].telefono + "</span></p>");
                            var divBotones = $("<div class='row botonesOfertas'></div>");
                            divCardIndividual.append(divBotones);
                            divBotones.append("<input type='button' id='verMas" + i + "' onclick='mostrarOcultar(" + i + ")' style='padding:10px 25px!important;margin:0 auto !important;' class='btn btn-primary btnVerMas' value='Ver Más' />");
                            divBotones.append("<input type='button' id='editar' onclick='EditarOferta(" + datos_cards[i].id_oferta + ")' style='padding:10px 25px!important; margin:0 auto !important;;' class='btn btn-info' value='Editar' />");
                            divBotones.append("<input type='button' id='eliminar' onclick='EliminarOferta(" + datos_cards[i].id_oferta + ")' style='padding:10px 25px!important;margin:0 auto !important;' class='btn btn-danger' value='Eliminar' />");

                            $(".card-text.pOcultar" + i).css("display", "none");
                        }
                    } else {
                        cards.append("<h2 class='text-center'>AUN NO HAS REGISTRADO OFERTAS PARA RESIDENTES</h2>");
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    alert(textStatus + " --- " + errorThrown + "--- ");
                }
            });
        }
    </script>
</asp:Content>

// Función inicial de Javascript
$(document).ready(function () {
    // Variable que almacena el email del usuario de tipo empresa que se encuentra logueado
    var email_usuario = $("#contenido_txtEmailUsuario").val();
    // Se remueve el valor de la variable de sessión de la oferta por si hubiera alguno
    window.sessionStorage.removeItem("id_oferta");
    // Si se cumple la validación se hace una petición ajax que ejecutara un método web para obtener las ofertas que ha registrado
    // el usuario de tipo empresa que se encuentra logueado
    if (email_usuario != null) {
        var datos = "{'email_usuario' : '" + email_usuario + "'}";
        mostrarOfertas(datos);
    }
});
// Función que se ejecuta cuando se presiona el boton ver más que se genera en cada card de oferta´para residentes, sirve para mostrar
// u ocultar algunos detalles de dicha oferta para residentes
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
// Función que se ejecuta cuando se presiona el boton Editar de una oferta para residentes, llenara el div con la clase contenedor con el
// formulario FrmSolicitarResidentes.aspx" y cargara los datos de la oferta que se selecciono en los controles del formulario
function EditarOferta(id) {
    window.sessionStorage.removeItem("id_oferta");
    window.sessionStorage.setItem("id_oferta", id);
    $(".contenedor").load("FrmSolicitarResidentes.aspx");
}
// Función que se ejecuta cuando se presiona el boton eliminar de una oferta, mostrara el modal de confirmación de que si se desea eliminar
// la oferta seleccionada y si se confirma la eliminación se ejecuta una petición ajax que recibe el id de la oferta seleccionada y ejecurta
// un método web para eliminar la oferta seleccionada y posteriormente se actualizan las ofertas que estan registradas
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
                if (jqXHR.responseJSON.ExceptionType == "System.Exception") {
                    $("#msgError").text(jqXHR.responseJSON.Message);
                    $("#mdlError").modal().show();
                } else if (jqXHR.responseJSON.ExceptionType == "System.Security.SecurityException") {
                    Response.load("FrmLogin.aspx");
                }
            }
        });
    });
}
// Función que genera y muestra todas las ofertas que ha registrado el usuario de tipo empresa que esta logueado 
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
            if (jqXHR.responseJSON.ExceptionType == "System.Exception") {
                $("#msgError").text(jqXHR.responseJSON.Message);
                $("#mdlError").modal().show();
            } else if (jqXHR.responseJSON.ExceptionType == "System.Security.SecurityException") {
                Response.load("FrmLogin.aspx");
            }
        }
    });
}
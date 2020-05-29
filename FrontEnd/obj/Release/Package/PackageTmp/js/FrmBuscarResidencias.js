//Función inicial de javascript
$(document).ready(function () {
    var btnBuscar = $("#btnBuscar");
    // Se dispara la función cuando se presiona el boton buscar, este cógigo llama a la función cargarOfertasMunicipio
    // si el contenido de la variable id_municipio es mayor 0 y la función antes mencionada mostrara las ofertas que hay registradas en ese municipio
    btnBuscar.click(function () {
        var id_municipio = document.getElementById('ddlMunicipioBusqueda').value;
        if (parseInt(id_municipio) > 0) {
            var datos = "{'id_municipio' : '" + parseInt(id_municipio) + "'}";
            cargarOfertasMunicipio(datos);
        }
    });
    // Función que carga los estados a la lista desplegable
    cargarEstados();
    // Código que se ejecuta cuando se detecta que se ha seleccionado un estado diferente de la lista desplegable
    // Y en la lista de municipios solo carga los municipios que pertenecen a ese estado
    $("#ddlEstadoBusqueda").change(function () {
        var nombre_estado = $('#ddlEstadoBusqueda :selected').text();
        var datos = "{ 'estado' : '" + nombre_estado + "'}";
        cambiarMunicipios(datos);
    });
});
// Función que muestra u oculta algunos datos de las cards de las ofertas para residentes
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
// Función que se dispara cuando se presiona un icono, obtiene el nombre que se presiono, para posteriormente armar
// un json que se le pasa a la función cargarOfertasArea para que se carguen las ofertas que estan registradas de esa área
function filtrarBusquedaArea(area) {
    var datos = "{'carrera' : '" + area + "'}";
    cargarOfertasArea(datos);
}
// Función que obtiene el municipio que se selecciono de la lista desplegable y que ejecuta una petición ajax al servicio web
// buscarOfertasMunicipio para que cargue las ofertas que hay registradas en ese municipio
function cargarOfertasMunicipio(datos) {
    let ofertas = $('#ofertasEncontradas');
    ofertas.empty();
    $.ajax({
        type: 'POST',
        url: 'ws/WSOfertas.asmx/buscarOfertasMunicipio',
        data: datos,
        contentType: 'application/json; utf-8',
        dataType: 'json',
        success: function (data) {
            let datos_cards = JSON.parse(data.d);
            if (datos_cards.length > 0) {
                // Ciclo que genera las cards que esten registradas hasta el momento en el municipio que se selecciono
                for (i = 0; i < datos_cards.length; i++) {
                    var divCardIndividual = $("<div class='card cardIndividual'></div>");
                    ofertas.append(divCardIndividual);
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
                    $(".card-text.pOcultar" + i).css("display", "none");
                }
            }// En caso de que aun no se hayan registrado ofertas para residentes en dicho municipio, se muestra el siguiente mensaje
            else {
                ofertas.append("<h3 class='text-center'>NO SE HAN ENCONTRADO RESULTADOS INTENTA CON OTROS MUNICIPIOS</h3>");
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
// Función que carga las ofertas por el área que se selecciono
function cargarOfertasArea(datos) {
    let ofertas = $('#ofertasEncontradas');
    ofertas.empty();
    $.ajax({
        type: 'POST',
        url: 'ws/WSOfertas.asmx/buscarOfertasArea',
        data: datos,
        contentType: 'application/json; utf-8',
        dataType: 'json',
        success: function (data) {
            let datos_cards = JSON.parse(data.d);
            if (datos_cards.length > 0) {
                // Ciclo que genera las cards de las ofertas que estan registradas hasta ese momento en dicha área
                for (i = 0; i < datos_cards.length; i++) {
                    var divCardIndividual = $("<div class='card cardIndividual'></div>");
                    ofertas.append(divCardIndividual);
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
                    $(".card-text.pOcultar" + i).css("display", "none");
                }
            }// En caso de que aun no se hayan registrado ofertas para residentes en dicha área, se muestra el siguiente mensaje
            else {
                ofertas.append("<h3 class='text-center'>NO SE HAN ENCONTRADO RESULTADOS INTENTA CON OTROS MUNICIPIOS</h3>");
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
// Función que llena la lista desplegable de los estados
function cargarEstados() {
    $.ajax({
        type: 'POST',
        url: 'ws/WSDatosContacto.asmx/getEstados',
        contentType: 'application/json; utf-8',
        dataType: 'json',
        success: function (data) {
            let estados = JSON.parse(data.d);
            $('#ddlEstadoBusqueda').empty();
            for (i = 0; i < estados.length; i++) {
                $('#ddlEstadoBusqueda').append('<option value="' + estados[i].id_estado + '">' + estados[i].estado + '</option>');
            }
            var datos = "{ 'estado' : '" + "Aguascalientes" + "'}";
            cambiarMunicipios(datos);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            $("#msgError").text("HA OCURRIDO UN ERROR, POR FAVOR VUELVELO A INTENTAR");
            $("#mdlError").modal().show();
        }
    });
}
// Función para llenar la lista desplegable de municipios con los municipios que pertenezcan al estado seleccionado en la otra lista desplegable
function cambiarMunicipios(datos) {
    $.ajax({
        type: 'POST',
        url: 'ws/WSDatosContacto.asmx/getMunicipios',
        data: datos,
        contentType: 'application/json; utf-8',
        dataType: 'json',
        success: function (data) {
            let municipios = JSON.parse(data.d);
            $('#ddlMunicipioBusqueda').empty();
            for (i = 0; i < municipios.length; i++) {
                $('#ddlMunicipioBusqueda').append('<option value="' + municipios[i].id_municipio + '">' + municipios[i].municipio + '</option>');
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            $("#msgError").text("HA OCURRIDO UN ERROR, POR FAVOR VUELVELO A INTENTAR");
            $("#mdlError").modal().show();
        }
    });
}

function validar(evento) {
    //Obtener los controles a validar
    var txtPerfil = document.getElementById("contenido_txtPerfil");
    var txtSolicito = document.getElementById("txtSolicito");
    var txtRequisitos = document.getElementById("txtRequisitos");
    var txtActividades = document.getElementById("txtActividades");
    var txtCarrera = document.getElementById("contenido_ddlCarrera");
    try {
        //Limpiar los estilos de validación
        txtPerfil.classList.remove('is-valid', 'is-invalid');
        txtCarrera.classList.remove('is-valid', 'is-invalid');
        txtSolicito.classList.remove('is-valid', 'is-invalid');
        txtRequisitos.classList.remove('is-valid', 'is-invalid');
        txtActividades.classList.remove('is-valid', 'is-invalid');
        //Obtener los valores ingresados en los controles
        var perfil = txtPerfil.value.trim();
        var solicito = txtSolicito.value.trim();
        var requisitos = txtRequisitos.value.trim();
        var actividades = txtActividades.value.trim();
        var carrera = txtCarrera.value;
        //Verificar si se ha ingresado datos en ellos
        if (perfil.length < 5 || perfil.length > 60 || solicito.length < 10 || requisitos.length < 10 || actividades.length < 10 || carrera.length < 5) {

            if (perfil.length < 5 || perfil.length > 60) {
                txtPerfil.classList.add('is-invalid');
            } else {
                txtPerfil.classList.add('is-valid');
            }
            if (carrera.length < 5) {
                txtCarrera.classList.add('is-invalid');
            } else {
                txtCarrera.classList.add('is-valid');
            }
            if (solicito.length < 10) {
                txtSolicito.classList.add('is-invalid');
                $("#contenido_ddlCarrera").addClass("marginCarreras");
                $("#solicito").addClass("marginSolicito");
                $("#contenido_ddlCarrera").css("margin-bottom", "20px");

            } else {
                txtSolicito.classList.add('is-valid');
                $("#contenido_ddlCarrera").removeClass("marginCarreras");
                $("#solicito").removeClass("marginSolicito");
                $("#contenido_ddlCarrera").css("margin-bottom", "0px");
            }
            if (requisitos.length < 10) {
                txtRequisitos.classList.add('is-invalid');
                $("#txtRequisitos").css("margin-bottom", "20px");
            } else {
                txtRequisitos.classList.add('is-valid');
                $("#txtRequisitos").css("margin-top", "0px");
            }
            if (actividades.length < 10) {
                txtActividades.classList.add('is-invalid');
            } else {
                txtActividades.classList.add('is-valid');
            }
            //Cancelar el submit 
            evento.preventDefault();
        } else {
            var email_usuario = $("#contenido_txtEmailUsuario").val();
            var id_oferta = localStorage.getItem("id_oferta");
            if (email_usuario != null && id_oferta == null) {
                var email_usuario = $("#contenido_txtEmailUsuario").val();
                var sueldo = $("#contenido_txtSueldo").val();
                var datos = "{ 'perfil' : '" + perfil + "',";
                datos += "'carrera' : '" + carrera + "',";
                datos += "'sueldo' : '" + sueldo + "',";
                datos += "'solicito' : '" + solicito + "',";
                datos += "'requisitos' : '" + requisitos + "',";
                datos += "'actividades' : '" + actividades + "',";
                datos += "'email' : '" + email_usuario + "'}";
                var btn = document.getElementById("btnRegistrar");

                if (btn.value == "REGISTRAR") {
                    $.ajax({
                        type: 'POST',
                        url: 'ws/WSOfertas.asmx/insert',
                        data: datos,
                        contentType: 'application/json; utf-8',
                        dataType: 'json',
                        success: function (data) {
                            if (parseInt(data.d) > 0) {
                                $('#mdlInformacion').modal('show');
                            }
                            else {
                                alert("nacho ocurrio un error");
                            }
                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                            alert(textStatus + " --- " + errorThrown + "--- ");
                        }
                    });
                }
            }

            var btnEditar = $("#btnRegistrar").val();
            if (id_oferta != null && btnEditar == "Editar") {
                var email_usuario = $("#contenido_txtEmailUsuario").val();
                var sueldo = $("#contenido_txtSueldo").val();
                var datos = "{ 'id_oferta' : '" + id_oferta + "',";
                datos += "'perfil' : '" + perfil + "',";
                datos += "'carrera' : '" + carrera + "',";
                datos += "'sueldo' : '" + sueldo + "',";
                datos += "'solicito' : '" + solicito + "',";
                datos += "'requisitos' : '" + requisitos + "',";
                datos += "'actividades' : '" + actividades + "'}";
                $.ajax({
                    type: 'POST',
                    url: 'ws/WSOfertas.asmx/update',
                    data: datos,
                    contentType: 'application/json; utf-8',
                    dataType: 'json',
                    success: function (data) {
                        if (data.d) {
                            localStorage.removeItem("id_oferta");
                            $('#mdlInformacion').modal('show');
                        }
                        else {
                            alert("nacho ocurrio un error");
                        }
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        alert(textStatus + " --- " + errorThrown + "--- ");
                    }
                });
            }
        }

    } catch (e) {
        $('#contenido_divMsg').css('display', 'block');
        //Cancelar el submit
        evento.preventDefault();
    }
}
function cerrar_modal(evento) {
    localStorage.removeItem("id_oferta");
    window.location.assign("FrmContenedor.aspx")
}
function cargarDatosEditar(datos) {
    $.ajax({
        type: 'POST',
        url: 'ws/WSOfertas.asmx/getOne',
        data: datos,
        contentType: 'application/json; utf-8',
        dataType: 'json',
        success: function (data) {
            let ofertas = JSON.parse(data.d);
            $("#contenido_txtPerfil").val(ofertas[0].perfil);
            $("#contenido_txtSueldo").val(ofertas[0].sueldo);
            $("#contenido_ddlCarrera").val(ofertas[0].carrera);
            $('#contenido_ddlCarrera').change();
            $("#txtSolicito").val(ofertas[0].solicito);
            $("#txtRequisitos").val(ofertas[0].requisitos);
            $("#txtActividades").val(ofertas[0].actividades);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert(textStatus + " --- " + errorThrown + "--- ");
        }
    });
}
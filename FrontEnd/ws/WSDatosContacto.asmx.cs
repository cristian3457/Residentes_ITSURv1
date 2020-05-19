using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using BackEnd.Datos;
using BackEnd.Modelo;
using System.Web.Script.Serialization;
using System.Text.RegularExpressions;
namespace FrontEnd.ws
{
    /// <summary>
    /// Descripción breve de WSDatosContacto
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // Para permitir que se llame a este servicio web desde un script, usando ASP.NET AJAX, quite la marca de comentario de la línea siguiente. 
    [System.Web.Script.Services.ScriptService]
    public class WSDatosContacto : System.Web.Services.WebService
    {
        String mensaje = "";
        public int validarCamposInsertar(String nombre, String email, String id_estado, String id_municipio, String codigo_postal,
            String domicilio, String giro, String sector, String telefono, String mision)
        {
            if (nombre.Length < 4 || nombre.Length > 25)
                mensaje += "El nombre es un dato obligatorio, debe contener entre 4 y 25 caracteres<br>";
            Regex validarEmail = new Regex("^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.([a-zA-Z]{2,4})+");
            if (!validarEmail.IsMatch(email))
                mensaje += "El email es un dato obligatorio y debe tener un formato válido<br>";
            return mensaje.Length;
        }
        [WebMethod]
        public List<Estados> getEstados()
        {
            EstadosDao estados = new EstadosDao();
            return estados.getAll().ToList();
        }
        [WebMethod]
        public String getMunicipios(string estado)
        {
            JavaScriptSerializer jss = new JavaScriptSerializer();
            return jss.Serialize(new MunicipiosDao().getAll(estado));
        }
        [WebMethod(EnableSession = true)]
        public int insert(String nombre, String email, String id_estado, String id_municipio, String codigo_postal,
            String domicilio, String giro, String sector, String telefono, String mision)
        {
            if (Session["tipo_usuario"] != null)
            {
                if (Session["tipo_usuario"].ToString() == "Administrador" || Session["tipo_usuario"].ToString() == "Empresa")
                {
                    DatosContacto datos = new DatosContacto();
                    datos.nombre = nombre;
                    datos.email = email;
                    datos.id_estado = int.Parse(id_estado);
                    datos.id_municipio = int.Parse(id_municipio);
                    datos.codigo_postal = int.Parse(codigo_postal);
                    datos.domicilio = domicilio;
                    datos.giro = giro;
                    datos.sector = sector;
                    datos.telefono = telefono;
                    datos.mision = mision;
                    int resultado = new DatosContactoDao().insert(datos);
                    return resultado;
                }
            }
            return 0;
        }
        [WebMethod(EnableSession = true)]
        public bool update(int id_empresa, String nombre, String email, String id_estado, String id_municipio, String codigo_postal,
            String domicilio, String giro, String sector, String telefono, String mision)
        {
            if (Session["tipo_usuario"] != null)
            {
                if (Session["tipo_usuario"].ToString() == "Administrador")
                {
                    DatosContacto datos = new DatosContacto();
                    datos.id_empresa = id_empresa;
                    datos.nombre = nombre;
                    datos.email = email;
                    datos.id_estado = int.Parse(id_estado);
                    datos.id_municipio = int.Parse(id_municipio);
                    datos.codigo_postal = int.Parse(codigo_postal);
                    datos.domicilio = domicilio;
                    datos.giro = giro;
                    datos.sector = sector;
                    datos.telefono = telefono;
                    datos.mision = mision;
                    bool resultado = new DatosContactoDao().update(datos);
                    return resultado;
                }
            }
            return false;
        }
        [WebMethod(EnableSession = true)]
        public bool updatePorEmail(String nombre, String email, String id_estado, String id_municipio, String codigo_postal,
            String domicilio, String giro, String sector, String telefono, String mision, String email_usuario)
        {
            if (Session["tipo_usuario"] != null)
            {
                if (Session["tipo_usuario"].ToString() == "Empresa")
                {
                    DatosContacto datos = new DatosContacto();
                    datos.nombre = nombre;
                    datos.email = email;
                    datos.id_estado = int.Parse(id_estado);
                    datos.id_municipio = int.Parse(id_municipio);
                    datos.codigo_postal = int.Parse(codigo_postal);
                    datos.domicilio = domicilio;
                    datos.giro = giro;
                    datos.sector = sector;
                    datos.telefono = telefono;
                    datos.mision = mision;
                    datos.email_usuario = email_usuario;
                    bool resultado = new DatosContactoDao().updatePorEmail(datos, email_usuario);
                    return resultado;
                }
            }
            return false;
        }


    }
}


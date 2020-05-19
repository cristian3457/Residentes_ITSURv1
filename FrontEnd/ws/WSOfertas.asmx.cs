using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using BackEnd.Datos;
using BackEnd.Modelo;
using System.Web.Script.Serialization;
namespace FrontEnd.ws
{
    /// <summary>
    /// Descripción breve de WSOfertas
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // Para permitir que se llame a este servicio web desde un script, usando ASP.NET AJAX, quite la marca de comentario de la línea siguiente. 
    [System.Web.Script.Services.ScriptService]
    public class WSOfertas : System.Web.Services.WebService
    {

        [WebMethod(EnableSession = true)]
        public int insert(String perfil, String carrera, String sueldo, String solicito, String requisitos, String actividades, String email)
        {
            if (Session["tipo_usuario"] != null)
            {
                if (Session["tipo_usuario"].ToString() == "Empresa")
                {
                    Ofertas datos = new Ofertas();
                    datos.perfil = perfil;
                    datos.carrera = carrera;
                    datos.sueldo = sueldo;
                    datos.solicito = solicito;
                    datos.requisitos = requisitos;
                    datos.actividades = actividades;
                    datos.email = email;
                    int resultado = new OfertasDao().insert(datos);
                    return resultado;
                }
            }
            return 0;
        }
        [WebMethod(EnableSession = true)]
        public bool update(int id_oferta, String perfil, String carrera, String sueldo,
                        String solicito, String requisitos, String actividades)
        {
            if (Session["tipo_usuario"] != null)
            {
                if (Session["tipo_usuario"].ToString() == "Empresa")
                {
                    Ofertas datos = new Ofertas();
                    datos.id_oferta = id_oferta;
                    datos.perfil = perfil;
                    datos.carrera = carrera;
                    datos.sueldo = sueldo;
                    datos.solicito = solicito;
                    datos.requisitos = requisitos;
                    datos.actividades = actividades;
                    bool resultado = new OfertasDao().update(datos);
                    return resultado;
                }
            }
            return false;
        }
        [WebMethod]
        public String getOne(int id_oferta)
        {
            JavaScriptSerializer jss = new JavaScriptSerializer();
            return jss.Serialize(new OfertasDao().getOne(id_oferta));
        }
        [WebMethod]
        public String getOfertas(string email_usuario)
        {
            JavaScriptSerializer jss = new JavaScriptSerializer();
            return jss.Serialize(new OfertasDao().getOfertas(email_usuario));
        }
        [WebMethod]
        public String buscarOfertasMunicipio(int id_municipio)
        {
            JavaScriptSerializer jss = new JavaScriptSerializer();
            return jss.Serialize(new OfertasDao().buscarOfertasMunicipio(id_municipio));
        }
        [WebMethod]
        public String buscarOfertasArea(String carrera)
        {
            JavaScriptSerializer jss = new JavaScriptSerializer();
            return jss.Serialize(new OfertasDao().buscarOfertasArea(carrera));
        }
        [WebMethod(EnableSession = true)]
        public String delete(int id_oferta)
        {
            if (Session["tipo_usuario"] != null)
            {
                if (Session["tipo_usuario"].ToString() == "Empresa")
                {
                    JavaScriptSerializer jss = new JavaScriptSerializer();
                    return jss.Serialize(new OfertasDao().delete(id_oferta));
                }
            }
            return "";
        }
    }
}


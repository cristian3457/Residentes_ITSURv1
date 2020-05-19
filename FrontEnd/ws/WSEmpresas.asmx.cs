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
    /// Descripción breve de WSEmpresas
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // Para permitir que se llame a este servicio web desde un script, usando ASP.NET AJAX, quite la marca de comentario de la línea siguiente. 
     [System.Web.Script.Services.ScriptService]
    public class WSEmpresas : System.Web.Services.WebService
    {

        [WebMethod(EnableSession = true)]
        public String getAll()
        {
            if (Session["tipo_usuario"] != null)
            {
                if (Session["tipo_usuario"].ToString() == "Administrador")
                {
                    JavaScriptSerializer jss = new JavaScriptSerializer();
                    return jss.Serialize(new DatosContactoDao().getAllEmpresas());
                }
            }
            return "";
        }
        public List<DatosContacto> getAllEmpresas()
        {
            return new DatosContactoDao().getAllEmpresas();
        }
        [WebMethod(EnableSession = true)]
        public String delete(int id)
        {
            if (Session["tipo_usuario"] != null)
            {
                if (Session["tipo_usuario"].ToString() == "Administrador")
                {
                    JavaScriptSerializer jss = new JavaScriptSerializer();
                    return jss.Serialize(new DatosContactoDao().delete(id));
                }
            }
            return "";
        }
        [WebMethod(EnableSession = true)]
        public String getOne(int id_empresa)
        {
            if (Session["tipo_usuario"] != null)
            {
                if (Session["tipo_usuario"].ToString() == "Administrador")
                {
                    JavaScriptSerializer jss = new JavaScriptSerializer();
                    return jss.Serialize(new DatosContactoDao().getOne(id_empresa));
                }
            }
            return "";
        }
        [WebMethod(EnableSession = true)]
        public String getOneEmail(string email)
        {
            if (Session["tipo_usuario"] != null)
            {
                if (Session["tipo_usuario"].ToString() == "Empresa")
                {
                    JavaScriptSerializer jss = new JavaScriptSerializer();
                    return jss.Serialize(new DatosContactoDao().getOneEmail(email));
                }
            }
            return "";
        }
        [WebMethod(EnableSession = true)]
        public int getDatos(String email)
        {
            if (Session["tipo_usuario"] != null)
            {
                if (Session["tipo_usuario"].ToString() == "Administrador" || Session["tipo_usuario"].ToString() == "Empresa")
                {
                    JavaScriptSerializer jss = new JavaScriptSerializer();
                    int resultado = new DatosContactoDao().getDatos(email);
                    return resultado;
                }
            }
            return 0;
        }
    }
}


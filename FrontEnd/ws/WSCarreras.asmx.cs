using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.Services;
using BackEnd.Datos;
using BackEnd.Modelo;
using System.Web.Script.Serialization;
namespace FrontEnd.ws
{
    /// <summary>
    /// Descripción breve de WSCarreras
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // Para permitir que se llame a este servicio web desde un script, usando ASP.NET AJAX, quite la marca de comentario de la línea siguiente. 
    [System.Web.Script.Services.ScriptService]
    public class WSCarreras : System.Web.Services.WebService
    {

        [WebMethod]
        public string HelloWorld()
        {
            return "Hola a todos";
        }
        [WebMethod]
        public String getCarreras()
        {
            JavaScriptSerializer jss = new JavaScriptSerializer();
            return jss.Serialize(new CarrerasDao().getAll());
        }
    }
}

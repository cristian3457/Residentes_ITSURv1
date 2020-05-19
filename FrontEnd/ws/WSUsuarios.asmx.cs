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
    /// Descripción breve de WSUsuarios
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // Para permitir que se llame a este servicio web desde un script, usando ASP.NET AJAX, quite la marca de comentario de la línea siguiente. 
    [System.Web.Script.Services.ScriptService]
    public class WSUsuarios : System.Web.Services.WebService
    {

        [WebMethod(EnableSession = true)]
        public bool updatePassword(String email, String password)
        {
            if (Session["tipo_usuario"] != null)
            {
                if (Session["tipo_usuario"].ToString() == "Administrador" || Session["tipo_usuario"].ToString() == "Empresa")
                {
                    Usuarios usuarios = new Usuarios();
                    usuarios.email = email;
                    usuarios.password = password;
                    bool resultado = new UsuariosDao().updatePassword(usuarios);
                    return resultado;
                }
            }
            return false;
        }
        [WebMethod(EnableSession = true)]
        public bool update(int id_usuario, String email, String password, String tipo_usuario)
        {
            if (Session["tipo_usuario"] != null)
            {
                if (Session["tipo_usuario"].ToString() == "Administrador" || Session["tipo_usuario"].ToString() == "Empresa")
                {
                    Usuarios datos = new Usuarios();
                    datos.id_usuario = id_usuario;
                    datos.email = email;
                    datos.password = password;
                    datos.tipo_usuario = tipo_usuario;
                    bool resultado = new UsuariosDao().updateUsuario(datos);
                    return resultado;
                }
            }
            return false;
        }
        [WebMethod(EnableSession = true)]
        public int insert(String email, String password, String tipo_usuario)
        {
            if (Session["tipo_usuario"] != null)
            {
                if (Session["tipo_usuario"].ToString() == "Administrador")
                {
                    Usuarios datos = new Usuarios();
                    datos.email = email;
                    datos.password = password;
                    datos.tipo_usuario = tipo_usuario;
                    int resultado = new UsuariosDao().insert(datos);
                    return resultado;
                }
            }
            return 0;
        }
        [WebMethod(EnableSession = true)]
        public String getAll()
        {
            if (Session["tipo_usuario"] != null)
            {
                if (Session["tipo_usuario"].ToString() == "Administrador")
                {
                    JavaScriptSerializer jss = new JavaScriptSerializer();
                    return jss.Serialize(new UsuariosDao().getAll());
                }
            }
            return "";
        }
        [WebMethod(EnableSession = true)]
        public String getOne(int id_usuario)
        {
            if (Session["tipo_usuario"] != null)
            {
                if (Session["tipo_usuario"].ToString() == "Administrador" || Session["tipo_usuario"].ToString() == "Empresa")
                {
                    JavaScriptSerializer jss = new JavaScriptSerializer();
                    return jss.Serialize(new UsuariosDao().getOne(id_usuario));
                }
            }
            return "";
        }
        [WebMethod(EnableSession = true)]
        public String delete(int id)
        {
            if (Session["tipo_usuario"] != null)
            {
                if (Session["tipo_usuario"].ToString() == "Administrador")
                {
                    JavaScriptSerializer jss = new JavaScriptSerializer();
                    return jss.Serialize(new UsuariosDao().delete(id));
                }
            }
            return "";
        }
    }

}

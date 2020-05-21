using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using BackEnd.Datos;
using BackEnd.Modelo;
using System.Web.Script.Serialization;
using System.Text.RegularExpressions;
using System.Configuration;
using System.Security;
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
        public bool updatePassword(String info)
        {
            if (Session["tipo_usuario"] != null)
            {
                if (Session["tipo_usuario"].ToString() == "Administrador" || Session["tipo_usuario"].ToString() == "Empresa")
                {
                    try
                    {
                        JavaScriptSerializer jss = new JavaScriptSerializer();
                        Usuarios u = jss.Deserialize<Usuarios>(info);
                        Regex validarEmail = new Regex("^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.([a-zA-Z]{2,4})+");
                        if (!validarEmail.IsMatch(u.email))
                        {
                            throw new Exception("Los datos proporcionados no son válidos, verifica la información");
                        }
                        Regex validarPassword = new Regex("(?=^.{8,16}$)((?=.*\\d)|(?=.*\\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$");
                        if (!validarPassword.IsMatch(u.password))
                        {
                            throw new Exception("Los datos proporcionados no son válidos, verifica la información");
                        }
                        bool resultado = new UsuariosDao().updatePassword(u);
                        return resultado;
                    }
                    catch (System.ArgumentNullException)
                    {
                        throw new Exception("Los datos proporcionados no son válidos, verifica la información");
                    }
                }
            }
            throw new SecurityException();
        }
        [WebMethod(EnableSession = true)]
        public bool update(String info)
        {
            if (Session["tipo_usuario"] != null)
            {
                if (Session["tipo_usuario"].ToString() == "Administrador" || Session["tipo_usuario"].ToString() == "Empresa")
                {
                    try
                    {
                        JavaScriptSerializer jss = new JavaScriptSerializer();
                        Usuarios u = jss.Deserialize<Usuarios>(info);
                        if (u.id_usuario.ToString().Length < 0)
                        {
                            throw new Exception("Los datos proporcionados no son válidos, verifica la información");
                        }
                        Regex validarEmail = new Regex("^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.([a-zA-Z]{2,4})+");
                        if (!validarEmail.IsMatch(u.email))
                        {
                            throw new Exception("Los datos proporcionados no son válidos, verifica la información");
                        }
                        Regex validarPassword = new Regex("(?=^.{8,16}$)((?=.*\\d)|(?=.*\\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$");
                        if (!validarPassword.IsMatch(u.password))
                        {
                            throw new Exception("Los datos proporcionados no son válidos, verifica la información");
                        }
                        if (u.tipo_usuario != "Empresa" && u.tipo_usuario != "Administrador")
                        {
                            throw new Exception("Los datos proporcionados no son válidos, verifica la información");
                        }

                        bool resultado = new UsuariosDao().updateUsuario(u);
                        return resultado;
                    }
                    catch (System.ArgumentNullException)
                    {
                        throw new Exception("Los datos proporcionados no son válidos, verifica la información");
                    }
                }
            }

            throw new SecurityException();
        }
        [WebMethod(EnableSession = true)]
        public int insert(String info)
        {
            if (Session["tipo_usuario"] != null)
            {
                if (Session["tipo_usuario"].ToString() == "Administrador")
                {
                    try
                    {
                        JavaScriptSerializer jss = new JavaScriptSerializer();
                        Usuarios u = jss.Deserialize<Usuarios>(info);
                        Regex validarEmail = new Regex("^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.([a-zA-Z]{2,4})+");
                        if (!validarEmail.IsMatch(u.email))
                        {
                            throw new Exception("Los datos proporcionados no son válidos, verifica la información");
                        }
                        Regex validarPassword = new Regex("(?=^.{8,16}$)((?=.*\\d)|(?=.*\\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$");
                        if (!validarPassword.IsMatch(u.password))
                        {
                            throw new Exception("Los datos proporcionados no son válidos, verifica la información");
                        }
                        if (u.tipo_usuario.ToString() != "Empresa" && u.tipo_usuario.ToString() != "Administrador")
                        {
                            throw new Exception("Los datos proporcionados no son válidos, verifica la información");
                        }
                       
                        int resultado = new UsuariosDao().insert(u);
                        return resultado;
                    }
                    catch (System.ArgumentNullException)
                    {
                        throw new Exception("Los datos proporcionados no son válidos, verifica la información");
                    }
                }
            }
            throw new SecurityException();
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
            throw new SecurityException();
        }
        [WebMethod(EnableSession = true)]
        public String getOne(int id_usuario)
        {
            if (Session["tipo_usuario"] != null)
            {

                if (Session["tipo_usuario"].ToString() == "Administrador" || Session["tipo_usuario"].ToString() == "Empresa")
                {
                    try
                    {
                        if (id_usuario.ToString().Length < 0)
                        {
                            throw new Exception("Los datos proporcionados no son válidos, verifica la información");
                        }
                        JavaScriptSerializer jss = new JavaScriptSerializer();
                        return jss.Serialize(new UsuariosDao().getOne(id_usuario));
                    }
                    catch (System.ArgumentNullException)
                    {
                        throw new Exception("Los datos proporcionados no son válidos, verifica la información");
                    }

                }
            }
            throw new SecurityException();
        }
        [WebMethod(EnableSession = true)]
        public String delete(int id)
        {
            if (Session["tipo_usuario"] != null)
            {
                if (Session["tipo_usuario"].ToString() == "Administrador")
                {
                    try
                    {
                        if (id.ToString().Length < 0)
                        {
                            throw new Exception("Los datos proporcionados no son válidos, verifica la información");
                        }
                        JavaScriptSerializer jss = new JavaScriptSerializer();
                        return jss.Serialize(new UsuariosDao().delete(id));
                    }
                    catch (System.ArgumentNullException)
                    {
                        throw new Exception("Los datos proporcionados no son válidos, verifica la información");
                    }
                }
            }
            throw new SecurityException();
        }
    }

}

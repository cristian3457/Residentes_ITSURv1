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
using System.ComponentModel.DataAnnotations;

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
        public void validar(DatosContacto d)
        {
            Regex validarNombre = new Regex("^[a-zA-Z\\s0-9]+$");
            if (!validarNombre.IsMatch(d.nombre) && d.nombre.ToString().Length < 5 || d.nombre.ToString().Length > 60)
            {
                throw new Exception("Los datos proporcionados no son válidos, verifica la información");
            }
            Regex validarEmail = new Regex("^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.([a-zA-Z]{2,4})+");
            if (!validarEmail.IsMatch(d.email))
            {
                throw new Exception("Los datos proporcionados no son válidos, verifica la información");
            }
            if (int.Parse(d.id_estado.ToString()) < 1 || int.Parse(d.id_estado.ToString()) > 32)
            {
                throw new Exception("Los datos proporcionados no son válidos, verifica la información");
            }
            if (int.Parse(d.id_municipio.ToString()) < 1 || int.Parse(d.id_municipio.ToString()) > 2278)
            {
                throw new Exception("Los datos proporcionados no son válidos, verifica la información");
            }
            Regex validarCP = new Regex("(^([0-9]{5,5})|^)$");
            if (!validarCP.IsMatch(d.codigo_postal.ToString()))
            {
                throw new Exception("Los datos proporcionados no son válidos, verifica la información");
            }
            Regex validarDomicilio = new Regex("^[a-zA-Z\\s]+([#]?[0-9\\s]{1,4})?([a-zA-Z\\s]{1,1})?$");
            if (!validarDomicilio.IsMatch(d.domicilio) && d.domicilio.ToString().Length < 5 || d.domicilio.ToString().Length > 80)
            {
                throw new Exception("Los datos proporcionados no son válidos, verifica la información");
            }
            if (d.giro.ToString().Length < 4 || d.giro.ToString().Length > 10)
            {
                throw new Exception("Los datos proporcionados no son válidos, verifica la información");
            }
            if (d.sector.ToString().Length < 7 || d.sector.ToString().Length > 10)
            {
                throw new Exception("Los datos proporcionados no son válidos, verifica la información");
            }
            if (d.telefono.ToString().Length < 10 || d.domicilio.ToString().Length > 18)
            {
                throw new Exception("Los datos proporcionados no son válidos, verifica la información");
            }
            Regex validarMision = new Regex("^[a-zA-Z\\s]+$");
            if (!validarMision.IsMatch(d.mision) && d.mision.ToString().Length < 5 || d.mision.ToString().Length > 100)
            {
                throw new Exception("Los datos proporcionados no son válidos, verifica la información");
            }
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
        public int insert(String info)
        {
            if (Session["tipo_usuario"] != null)
            {
                if (Session["tipo_usuario"].ToString() == "Administrador" || Session["tipo_usuario"].ToString() == "Empresa")
                {
                    try
                    {
                        JavaScriptSerializer jss = new JavaScriptSerializer();
                        DatosContacto d = jss.Deserialize<DatosContacto>(info);
                        validar(d);
                        int resultado = new DatosContactoDao().insert(d);
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
                if (Session["tipo_usuario"].ToString() == "Administrador")
                {
                    try
                    {
                        JavaScriptSerializer jss = new JavaScriptSerializer();
                        DatosContacto d = jss.Deserialize<DatosContacto>(info);
                        if (d.id_empresa.ToString().Length < 0)
                        {
                            throw new Exception("Los datos proporcionados no son válidos, verifica la información");
                        }
                        validar(d);
                        bool resultado = new DatosContactoDao().update(d);
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
        public bool updatePorEmail(String info)
        {
            if (Session["tipo_usuario"] != null)
            {
                if (Session["tipo_usuario"].ToString() == "Empresa")
                {
                    try
                    {
                        JavaScriptSerializer jss = new JavaScriptSerializer();
                        DatosContacto d = jss.Deserialize<DatosContacto>(info);
                        Regex validarEmail = new Regex("^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.([a-zA-Z]{2,4})+");
                        if (!validarEmail.IsMatch(d.email_usuario))
                        {
                            throw new Exception("Los datos proporcionados no son válidos, verifica la información");
                        }
                        validar(d);
                        DatosContacto datos = new DatosContacto();
                    bool resultado = new DatosContactoDao().updatePorEmail(d);
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


    }
}


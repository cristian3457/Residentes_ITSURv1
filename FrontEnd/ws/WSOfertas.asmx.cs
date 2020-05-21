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
    /// Descripción breve de WSOfertas
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // Para permitir que se llame a este servicio web desde un script, usando ASP.NET AJAX, quite la marca de comentario de la línea siguiente. 
    [System.Web.Script.Services.ScriptService]
    public class WSOfertas : System.Web.Services.WebService
    {
        public void validar(Ofertas o)
        {
            Regex validarPerfil = new Regex("^[a-zA-Z\\s]+$");
            if (!validarPerfil.IsMatch(o.perfil) && o.perfil.ToString().Length < 5 || o.perfil.ToString().Length > 50)
            {
                throw new Exception("Los datos proporcionados no son válidos, verifica la información");
            }
            if (o.sueldo.ToString().Length > 20)
            {
                throw new Exception("Los datos proporcionados no son válidos, verifica la información");
            }
            if (o.carrera.ToString().Length < 9 && o.carrera.ToString().Length > 27)
            {
                throw new Exception("Los datos proporcionados no son válidos, verifica la información");
            }
            Regex validarSolicito = new Regex("^[a-zA-Z0-9\\s\\-]+$");
            if (!validarSolicito.IsMatch(o.solicito) && o.solicito.ToString().Length < 10 || o.solicito.ToString().Length > 150)
            {
                throw new Exception("Los datos proporcionados no son válidos, verifica la información");
            }
            Regex validarRequisitos = new Regex("^[a-zA-Z0-9\\s\\-]+$");
            if (!validarRequisitos.IsMatch(o.requisitos) && o.requisitos.ToString().Length < 10 || o.requisitos.ToString().Length > 150)
            {
                throw new Exception("Los datos proporcionados no son válidos, verifica la información");
            }
            Regex validarActividades = new Regex("^[a-zA-Z\\s\\-]+$");
            if (!validarActividades.IsMatch(o.actividades) && o.actividades.ToString().Length < 10 || o.actividades.ToString().Length > 150)
            {
                throw new Exception("Los datos proporcionados no son válidos, verifica la información");
            }
        }

        [WebMethod(EnableSession = true)]
        public int insert(String info)
        {
            if (Session["tipo_usuario"] != null)
            {
                if (Session["tipo_usuario"].ToString() == "Empresa")
                {
                    try
                    {
                        JavaScriptSerializer jss = new JavaScriptSerializer();
                        Ofertas o = jss.Deserialize<Ofertas>(info);
                        validar(o);
                        Regex validarEmail = new Regex("^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.([a-zA-Z]{2,4})+");
                        if (!validarEmail.IsMatch(o.email))
                        {
                            throw new Exception("Los datos proporcionados no son válidos, verifica la información");
                        }
                        int resultado = new OfertasDao().insert(o);
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
                if (Session["tipo_usuario"].ToString() == "Empresa")
                {
                    try
                    {
                        JavaScriptSerializer jss = new JavaScriptSerializer();
                        Ofertas o = jss.Deserialize<Ofertas>(info);
                        if (o.id_oferta.ToString().Length < 0)
                        {
                            throw new Exception("Los datos proporcionados no son válidos, verifica la información");
                        }
                        validar(o);

                        bool resultado = new OfertasDao().update(o);
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
        public String getOne(int id_oferta)
        {
            if (Session["tipo_usuario"] != null)
            {
                if (Session["tipo_usuario"].ToString() == "Empresa")
                {
                    try
                    {
                        if (id_oferta.ToString().Length < 0)
                        {
                            throw new Exception("Los datos proporcionados no son válidos, verifica la información");
                        }
                        JavaScriptSerializer jss = new JavaScriptSerializer();
                        return jss.Serialize(new OfertasDao().getOne(id_oferta));
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
        public String getOfertas(string email_usuario)
        {
            if (Session["tipo_usuario"] != null)
            {
                if (Session["tipo_usuario"].ToString() == "Empresa")
                {
                    try
                    {
                        Regex validarEmail = new Regex("^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.([a-zA-Z]{2,4})+");
                        if (!validarEmail.IsMatch(email_usuario))
                        {
                            throw new Exception("Los datos proporcionados no son válidos, verifica la información");
                        }
                        JavaScriptSerializer jss = new JavaScriptSerializer();
                        return jss.Serialize(new OfertasDao().getOfertas(email_usuario));
                    }
                    catch (System.ArgumentNullException)
                    {
                        throw new Exception("Los datos proporcionados no son válidos, verifica la información");
                    }
                }
            }
            throw new SecurityException();
    }
        [WebMethod]
        public String buscarOfertasMunicipio(int id_municipio)
        {
            try
            {
                if (id_municipio.ToString().Length < 0)
                {
                    throw new Exception("Los datos proporcionados no son válidos, verifica la información");
                }
                JavaScriptSerializer jss = new JavaScriptSerializer();
                return jss.Serialize(new OfertasDao().buscarOfertasMunicipio(id_municipio));
            }
            catch (System.ArgumentNullException)
            {
                throw new Exception("Los datos proporcionados no son válidos, verifica la información");
            }

        }
        [WebMethod]
        public String buscarOfertasArea(String carrera)
        {
            try
            {
                if (carrera.ToString().Length < 7)
                {
                    throw new Exception("Los datos proporcionados no son válidos, verifica la información");
                }
                JavaScriptSerializer jss = new JavaScriptSerializer();
            return jss.Serialize(new OfertasDao().buscarOfertasArea(carrera));
            }
            catch (System.ArgumentNullException)
            {
                throw new Exception("Los datos proporcionados no son válidos, verifica la información");
            }
        }
        [WebMethod(EnableSession = true)]
        public String delete(int id_oferta)
        {
            if (Session["tipo_usuario"] != null)
            {
                if (Session["tipo_usuario"].ToString() == "Empresa")
                {
                    try
                    {
                        if (id_oferta.ToString().Length < 0)
                        {
                            throw new Exception("Los datos proporcionados no son válidos, verifica la información");
                        }
                        JavaScriptSerializer jss = new JavaScriptSerializer();
                        return jss.Serialize(new OfertasDao().delete(id_oferta));
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


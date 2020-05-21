using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BackEnd.Modelo;
using MySql.Data.MySqlClient;
using System.Data;
namespace BackEnd.Datos
{
    public class DatosContactoDao
    {
        public List<DatosContacto> getAll()
        {
            try
            {
                List<DatosContacto> lista = new List<DatosContacto>();

                MySqlCommand sentencia = new MySqlCommand();
                sentencia.CommandText =
                    "SELECT * FROM empresas;";

                DataTable tabla = Conexion.ejecutarConsulta(sentencia);

                foreach (DataRow fila in tabla.Rows)
                {
                    lista.Add(new DatosContacto(

                       Convert.ToInt32(fila["id_empresa"].ToString()),
                       fila["nombre"].ToString(),
                       fila["email"].ToString(),
                       Convert.ToInt32(fila["id_estado"].ToString()),
                       Convert.ToInt32(fila["id_municipio"].ToString()),
                       Convert.ToInt32(fila["codigo_postal"].ToString()),
                       fila["domicilio"].ToString(),
                       fila["giro"].ToString(),
                       fila["sector"].ToString(),
                       fila["telefono"].ToString(),
                       fila["mision"].ToString()
                        ));
                }
                return lista;
            }
            catch (Exception ex)
            {
                return null;
            }
            finally
            {
                Conexion.desconectar();
            }
        }
        public List<DatosContacto> getOne(int id_empresa)
        {
            try
            {
                List<DatosContacto> lista = new List<DatosContacto>();

                MySqlCommand sentencia = new MySqlCommand();
                sentencia.CommandText =
                    "SELECT * FROM empresas WHERE id_empresa = @id_empresa;";
                sentencia.Parameters.AddWithValue("@id_empresa", id_empresa);

                DataTable tabla = Conexion.ejecutarConsulta(sentencia);

                foreach (DataRow fila in tabla.Rows)
                {
                    lista.Add(new DatosContacto(

                       Convert.ToInt32(fila["id_empresa"].ToString()),
                       fila["nombre"].ToString(),
                       fila["email"].ToString(),
                       Convert.ToInt32(fila["id_estado"].ToString()),
                       Convert.ToInt32(fila["id_municipio"].ToString()),
                       Convert.ToInt32(fila["codigo_postal"].ToString()),
                       fila["domicilio"].ToString(),
                       fila["giro"].ToString(),
                       fila["sector"].ToString(),
                       fila["telefono"].ToString(),
                       fila["mision"].ToString()
                        ));
                }
                return lista;
            }
            catch (Exception ex)
            {
                return null;
            }
            finally
            {
                Conexion.desconectar();
            }
        }
        public List<DatosContacto> getOneEmail(String email)
        {
            try
            {
                List<DatosContacto> lista = new List<DatosContacto>();

                MySqlCommand sentencia = new MySqlCommand();
                sentencia.CommandText =
                    "SELECT * FROM empresas WHERE email = @email;";
                sentencia.Parameters.AddWithValue("@email", email);

                DataTable tabla = Conexion.ejecutarConsulta(sentencia);

                foreach (DataRow fila in tabla.Rows)
                {
                    lista.Add(new DatosContacto(

                       Convert.ToInt32(fila["id_empresa"].ToString()),
                       fila["nombre"].ToString(),
                       fila["email"].ToString(),
                       Convert.ToInt32(fila["id_estado"].ToString()),
                       Convert.ToInt32(fila["id_municipio"].ToString()),
                       Convert.ToInt32(fila["codigo_postal"].ToString()),
                       fila["domicilio"].ToString(),
                       fila["giro"].ToString(),
                       fila["sector"].ToString(),
                       fila["telefono"].ToString(),
                       fila["mision"].ToString()
                        ));
                }
                return lista;
            }
            catch (Exception ex)
            {
                return null;
            }
            finally
            {
                Conexion.desconectar();
            }
        }
        public int getDatos(String email)
        {
            try
            {
                MySqlCommand sentencia = new MySqlCommand();
                sentencia.CommandText = "SELECT count(*) FROM empresas WHERE email = @email;";
                sentencia.Parameters.AddWithValue("@email", email);
                int idGenerado = Conexion.ejecutarSelect(sentencia);
                return idGenerado;
            }
            catch (Exception ex)
            {
                return 0;
            }
            finally
            {
                Conexion.desconectar();
            }
        }
        public List<DatosContacto> getAllEmpresas()
        {
            try
            {
                List<DatosContacto> lista = new List<DatosContacto>();

                MySqlCommand sentencia = new MySqlCommand();
                sentencia.CommandText =
                    "SELECT em.id_empresa as id_empresa, em.nombre as nombre,em.email as email,es.estado as estado,m.municipio as municipio,em.domicilio as domicilio,em.codigo_postal as codigo_postal,em.telefono as telefono FROM empresas em,estados es,municipios m WHERE em.id_estado = es.id_estado AND em.id_municipio = m.id_municipio;";

                DataTable tabla = Conexion.ejecutarConsulta(sentencia);

                foreach (DataRow fila in tabla.Rows)
                {
                    lista.Add(new DatosContacto(
                       Convert.ToInt32(fila["id_empresa"].ToString()),
                       fila["nombre"].ToString(),
                       fila["email"].ToString(),
                       fila["estado"].ToString(),
                       fila["municipio"].ToString(),
                       fila["domicilio"].ToString(),
                       Convert.ToInt32(fila["codigo_postal"].ToString()),
                       fila["telefono"].ToString()
                        ));
                }
                return lista;
            }
            catch (Exception ex)
            {
                return null;
            }
            finally
            {
                Conexion.desconectar();
            }
        }
        public int insert(DatosContacto obj)
        {
            try
            {
                MySqlCommand sentencia = new MySqlCommand();
                sentencia.CommandText = "INSERT INTO empresas (nombre,email,id_estado,id_municipio,codigo_postal,domicilio,giro,sector,telefono,mision) " +
                    "VALUES(@nombre,@email,@id_estado,@id_municipio,@codigo_postal,@domicilio,@giro,@sector,@telefono,@mision); SELECT MAX(id_empresa) AS id FROM empresas;";

                sentencia.Parameters.AddWithValue("@nombre", obj.nombre);
                sentencia.Parameters.AddWithValue("@email", obj.email);
                sentencia.Parameters.AddWithValue("@id_estado", obj.id_estado);
                sentencia.Parameters.AddWithValue("@id_municipio", obj.id_municipio);
                sentencia.Parameters.AddWithValue("@codigo_postal", obj.codigo_postal);
                sentencia.Parameters.AddWithValue("@domicilio", obj.domicilio);
                sentencia.Parameters.AddWithValue("@giro", obj.giro);
                sentencia.Parameters.AddWithValue("@sector", obj.sector);
                sentencia.Parameters.AddWithValue("@telefono", obj.telefono);
                sentencia.Parameters.AddWithValue("@mision", obj.mision);
                int idGenerado = Conexion.ejecutarSentencia(sentencia, true);
                return idGenerado;

            }
            catch (Exception ex)
            {
                return 0;
            }
            finally
            {
                Conexion.desconectar();
            }
        }
        public bool update(DatosContacto obj)
        {
            try
            {
                MySqlCommand sentencia = new MySqlCommand();
                sentencia.CommandText = "UPDATE empresas SET nombre=@nombre,email=@email,id_estado=@id_estado," +
                    "id_municipio=@id_municipio,codigo_postal=@codigo_postal,domicilio=@domicilio,giro=@giro," +
                    "sector=@sector,telefono=@telefono,mision=@mision WHERE id_empresa=@id_empresa";

                sentencia.Parameters.AddWithValue("@id_empresa", obj.id_empresa);
                sentencia.Parameters.AddWithValue("@nombre", obj.nombre);
                sentencia.Parameters.AddWithValue("@email", obj.email);
                sentencia.Parameters.AddWithValue("@id_estado", obj.id_estado);
                sentencia.Parameters.AddWithValue("@id_municipio", obj.id_municipio);
                sentencia.Parameters.AddWithValue("@codigo_postal", obj.codigo_postal);
                sentencia.Parameters.AddWithValue("@domicilio", obj.domicilio);
                sentencia.Parameters.AddWithValue("@giro", obj.giro);
                sentencia.Parameters.AddWithValue("@sector", obj.sector);
                sentencia.Parameters.AddWithValue("@telefono", obj.telefono);
                sentencia.Parameters.AddWithValue("@mision", obj.mision);

                if (Conexion.ejecutarSentencia(sentencia, false) > 0)
                    return true;
                else
                    return false;
            }
            catch (Exception)
            {
                return false;
            }
            finally
            {
                Conexion.desconectar();
            }
        }
        public bool updatePorEmail(DatosContacto obj)
        {
            try
            {
                MySqlCommand sentencia = new MySqlCommand();
                sentencia.CommandText = "UPDATE empresas SET nombre=@nombre,email=@email,id_estado=@id_estado," +
                    "id_municipio=@id_municipio,codigo_postal=@codigo_postal,domicilio=@domicilio,giro=@giro," +
                    "sector=@sector,telefono=@telefono,mision=@mision WHERE email = @email_usuario;";

                sentencia.Parameters.AddWithValue("@nombre", obj.nombre);
                sentencia.Parameters.AddWithValue("@email", obj.email);
                sentencia.Parameters.AddWithValue("@email_usuario", obj.email_usuario);
                sentencia.Parameters.AddWithValue("@id_estado", obj.id_estado);
                sentencia.Parameters.AddWithValue("@id_municipio", obj.id_municipio);
                sentencia.Parameters.AddWithValue("@codigo_postal", obj.codigo_postal);
                sentencia.Parameters.AddWithValue("@domicilio", obj.domicilio);
                sentencia.Parameters.AddWithValue("@giro", obj.giro);
                sentencia.Parameters.AddWithValue("@sector", obj.sector);
                sentencia.Parameters.AddWithValue("@telefono", obj.telefono);
                sentencia.Parameters.AddWithValue("@mision", obj.mision);

                if (Conexion.ejecutarSentencia(sentencia, false) > 0)
                    return true;
                else
                    return false;
            }
            catch (Exception)
            {
                return false;
            }
            finally
            {
                Conexion.desconectar();
            }
        }
        public bool delete(int id)
        {
            try
            {
                MySqlCommand sentencia = new MySqlCommand();
                sentencia.CommandText = "DELETE FROM empresas WHERE id_empresa = @id_empresa";
                sentencia.Parameters.AddWithValue("@id_empresa", id);
                if (Conexion.ejecutarSentencia(sentencia, false) > 0)
                    return true;
                else
                    return false;

            }
            catch (Exception)
            {
                return false;
            }
            finally
            {
                Conexion.desconectar();
            }
        }
    }
}

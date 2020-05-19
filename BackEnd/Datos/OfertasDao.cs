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
    public class OfertasDao
    {
        public int insert(Ofertas obj)
        {
            try
            {
                MySqlCommand sentencia = new MySqlCommand();
                sentencia.CommandText = "INSERT INTO ofertas (perfil,carrera,sueldo,solicito,requisitos,actividades,email) VALUES (@perfil,@carrera,@sueldo,@solicito,@requisitos,@actividades,@email); SELECT MAX(id_oferta) AS id FROM ofertas;";

                sentencia.Parameters.AddWithValue("@perfil", obj.perfil);
                sentencia.Parameters.AddWithValue("@carrera", obj.carrera);
                sentencia.Parameters.AddWithValue("@sueldo", obj.sueldo);
                sentencia.Parameters.AddWithValue("@solicito", obj.solicito);
                sentencia.Parameters.AddWithValue("@requisitos", obj.requisitos);
                sentencia.Parameters.AddWithValue("@actividades", obj.actividades);
                sentencia.Parameters.AddWithValue("@email", obj.email);
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
        public bool update(Ofertas obj)
        {
            try
            {
                MySqlCommand sentencia = new MySqlCommand();
                sentencia.CommandText = "UPDATE ofertas SET perfil=@perfil,carrera=@carrera,sueldo=@sueldo," +
                    "solicito=@solicito,requisitos=@requisitos,actividades=@actividades WHERE id_oferta=@id_oferta; ";
                sentencia.Parameters.AddWithValue("@id_oferta", obj.id_oferta);
                sentencia.Parameters.AddWithValue("@perfil", obj.perfil);
                sentencia.Parameters.AddWithValue("@carrera", obj.carrera);
                sentencia.Parameters.AddWithValue("@sueldo", obj.sueldo);
                sentencia.Parameters.AddWithValue("@solicito", obj.solicito);
                sentencia.Parameters.AddWithValue("@requisitos", obj.requisitos);
                sentencia.Parameters.AddWithValue("@actividades", obj.actividades);

                if (Conexion.ejecutarSentencia(sentencia, false) > 0)
                    return true;
                else
                    return false;
            }
            catch (Exception ex)
            {
                return false;
            }
            finally
            {
                Conexion.desconectar();
            }
        }
        public List<Ofertas> getOne(int id_oferta)
        {
            try
            {
                List<Ofertas> lista = new List<Ofertas>();

                MySqlCommand sentencia = new MySqlCommand();
                sentencia.CommandText = "SELECT * FROM ofertas where id_oferta = @id_oferta;";

                sentencia.Parameters.AddWithValue("@id_oferta", id_oferta);
                DataTable tabla = Conexion.ejecutarConsulta(sentencia);

                foreach (DataRow fila in tabla.Rows)
                {
                    lista.Add(new Ofertas(
                       Convert.ToInt32(fila["id_oferta"].ToString()),
                       fila["perfil"].ToString(),
                       fila["carrera"].ToString(),
                       fila["sueldo"].ToString(),
                       fila["solicito"].ToString(),
                       fila["requisitos"].ToString(),
                       fila["actividades"].ToString(),
                       fila["email"].ToString()
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
        public List<Ofertas> getOfertas(String email_usuario)
        {
            try
            {
                List<Ofertas> lista = new List<Ofertas>();

                MySqlCommand sentencia = new MySqlCommand();
                sentencia.CommandText = "select o.id_oferta,e.nombre,e.domicilio,e.codigo_postal, e.email,e.telefono,m.municipio,es.estado," +
                        "o.perfil, o.sueldo,o.solicito,o.requisitos,o.actividades from empresas e, municipios m, estados es, ofertas o where " +
                        "e.id_estado = es.id_estado AND " +
                       "e.id_municipio = m.id_municipio AND o.email = @email_usuario AND e.email = @email_usuario";

                sentencia.Parameters.AddWithValue("@email_usuario", email_usuario);
                DataTable tabla = Conexion.ejecutarConsulta(sentencia);

                foreach (DataRow fila in tabla.Rows)
                {
                    lista.Add(new Ofertas(
                       Convert.ToInt32(fila["id_oferta"].ToString()),
                       fila["nombre"].ToString(),
                       fila["domicilio"].ToString(),
                       Convert.ToInt32(fila["codigo_postal"].ToString()),
                       fila["email"].ToString(),
                       fila["telefono"].ToString(),
                       fila["municipio"].ToString(),
                       fila["estado"].ToString(),
                       fila["perfil"].ToString(),
                       fila["sueldo"].ToString(),
                       fila["solicito"].ToString(),
                       fila["requisitos"].ToString(),
                       fila["actividades"].ToString()));
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
        public List<Ofertas> buscarOfertasMunicipio(int id_municipio)
        {
            try
            {
                List<Ofertas> lista = new List<Ofertas>();

                MySqlCommand sentencia = new MySqlCommand();
                sentencia.CommandText = "SELECT e.nombre,e.domicilio,e.codigo_postal, e.email,e.telefono,m.municipio,es.estado, o.perfil, o.sueldo,o.solicito," +
                                "o.requisitos,o.actividades FROM empresas e, municipios m, estados es, ofertas o, carreras c WHERE m.id_estado = es.id_estado AND " +
                                "e.id_municipio = m.id_municipio AND o.perfil = c.carrera AND m.id_municipio = @id_municipio;";
                sentencia.Parameters.AddWithValue("@id_municipio", id_municipio);
                DataTable tabla = Conexion.ejecutarConsulta(sentencia);

                foreach (DataRow fila in tabla.Rows)
                {
                    lista.Add(new Ofertas(
                       fila["nombre"].ToString(),
                       fila["domicilio"].ToString(),
                       Convert.ToInt32(fila["codigo_postal"].ToString()),
                       fila["email"].ToString(),
                       fila["telefono"].ToString(),
                       fila["municipio"].ToString(),
                       fila["estado"].ToString(),
                       fila["perfil"].ToString(),
                       fila["sueldo"].ToString(),
                       fila["solicito"].ToString(),
                       fila["requisitos"].ToString(),
                       fila["actividades"].ToString()
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
        public List<Ofertas> buscarOfertasArea(String carrera)
        {
            try
            {
                List<Ofertas> lista = new List<Ofertas>();

                MySqlCommand sentencia = new MySqlCommand();
                sentencia.CommandText = "SELECT e.nombre,e.domicilio,e.codigo_postal, e.email,e.telefono,m.municipio,es.estado, o.perfil, o.sueldo,o.solicito," +
                                "o.requisitos,o.actividades FROM empresas e, municipios m, estados es, ofertas o WHERE m.id_estado = es.id_estado AND " +
                                "e.id_municipio = m.id_municipio AND o.carrera = @carrera AND o.email = e.email;";
                sentencia.Parameters.AddWithValue("@carrera", carrera);
                DataTable tabla = Conexion.ejecutarConsulta(sentencia);

                foreach (DataRow fila in tabla.Rows)
                {
                    lista.Add(new Ofertas(
                       fila["nombre"].ToString(),
                       fila["domicilio"].ToString(),
                       Convert.ToInt32(fila["codigo_postal"].ToString()),
                       fila["email"].ToString(),
                       fila["telefono"].ToString(),
                       fila["municipio"].ToString(),
                       fila["estado"].ToString(),
                       fila["perfil"].ToString(),
                       fila["sueldo"].ToString(),
                       fila["solicito"].ToString(),
                       fila["requisitos"].ToString(),
                       fila["actividades"].ToString()
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
        public bool delete(int id_oferta)
        {
            try
            {
                MySqlCommand sentencia = new MySqlCommand();
                sentencia.CommandText = "DELETE FROM ofertas WHERE id_oferta = @id_oferta";
                sentencia.Parameters.AddWithValue("@id_oferta", id_oferta);
                if (Conexion.ejecutarSentencia(sentencia, false) > 0)
                    return true;
                else
                    return false;

            }
            catch (Exception ex)
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


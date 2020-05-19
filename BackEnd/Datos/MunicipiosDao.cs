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
    public class MunicipiosDao
    {
        public List<Municipios> getAll(string estado)
        {
            try
            {
                List<Municipios> lista = new List<Municipios>();

                MySqlCommand sentencia = new MySqlCommand();
                sentencia.CommandText =
                "SELECT m.id_municipio, m.municipio FROM municipios m, estados e where " +
                    "e.id_estado = m.id_estado and e.estado = '" + estado + "' ;";
                DataTable tabla = Conexion.ejecutarConsulta(sentencia);

                foreach (DataRow fila in tabla.Rows)
                {
                    lista.Add(new Municipios()
                    {
                        id_municipio = int.Parse(fila["id_municipio"].ToString()),
                        municipio = fila["municipio"].ToString()
                    });
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
        public List<Municipios> getAllMunicipios()
        {
            try
            {
                List<Municipios> lista = new List<Municipios>();

                MySqlCommand sentencia = new MySqlCommand();
                sentencia.CommandText =
                "SELECT id_municipio,municipio FROM municipios;";
                DataTable tabla = Conexion.ejecutarConsulta(sentencia);

                foreach (DataRow fila in tabla.Rows)
                {
                    lista.Add(new Municipios()
                    {
                        id_municipio = int.Parse(fila["id_municipio"].ToString()),
                        municipio = fila["municipio"].ToString()
                    });
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
        public List<Municipios> getOne(int id_municipio)
        {
            try
            {
                List<Municipios> lista = new List<Municipios>();

                MySqlCommand sentencia = new MySqlCommand();
                sentencia.CommandText =
                    "SELECT id_municipio,municipio WHERE id_municipio = @id_municipio;";
                sentencia.Parameters.AddWithValue("@id_municipio", id_municipio);

                DataTable tabla = Conexion.ejecutarConsulta(sentencia);

                foreach (DataRow fila in tabla.Rows)
                {
                    lista.Add(new Municipios()
                    {
                        id_municipio = int.Parse(fila["id_municipio"].ToString()),
                        municipio = fila["municipio"].ToString()
                    });
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

    }
}

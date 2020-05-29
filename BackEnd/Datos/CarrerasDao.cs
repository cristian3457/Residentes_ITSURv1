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
    public class CarrerasDao
    {
        public List<Carreras> getAll()
        {
            try
            {
                List<Carreras> lista = new List<Carreras>();

                MySqlCommand sentencia = new MySqlCommand();
                sentencia.CommandText =
                    "SELECT id_carrera, carrera" +
                    " FROM carreras" +
                    " ORDER BY carrera;";

                DataTable tabla = Conexion.ejecutarConsulta(sentencia);

                foreach (DataRow fila in tabla.Rows)
                {
                    lista.Add(new Carreras()
                    {
                        id_carrera = int.Parse(fila["id_carrera"].ToString()),
                        carrera = fila["carrera"].ToString()
                    });
                }

                return lista;
            }
            catch (MySqlException)
            {
                throw new Exception("Se ha presentado un problema al obtener los datos");
            }
            finally
            {
                Conexion.desconectar();
            }
        }
    }
}

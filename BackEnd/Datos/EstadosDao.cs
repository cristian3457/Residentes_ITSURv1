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
    public class EstadosDao
    {
        public List<Estados> getAll()
        {
            try
            {
                List<Estados> lista = new List<Estados>();

                MySqlCommand sentencia = new MySqlCommand();
                sentencia.CommandText =
                    "SELECT id_estado, estado" +
                    " FROM estados" +
                    " ORDER BY estado;";

                DataTable tabla = Conexion.ejecutarConsulta(sentencia);

                foreach (DataRow fila in tabla.Rows)
                {
                    lista.Add(new Estados()
                    {
                        id_estado = int.Parse(fila["id_estado"].ToString()),
                        estado = fila["estado"].ToString()
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

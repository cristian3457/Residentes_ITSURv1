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
   public class CiudadesDao { 
public List<Ciudades> getAll()
    {
        try
        {
            List<Ciudades> lista = new List<Ciudades>();

            MySqlCommand sentencia = new MySqlCommand();
            sentencia.CommandText =
                "SELECT id_ciudad, ciudad" +
                " FROM ciudades" +
                " ORDER BY ciudad;";

            DataTable tabla = Conexion.ejecutarConsulta(sentencia);

            foreach (DataRow fila in tabla.Rows)
            {
                lista.Add(new Ciudades()
                {
                    id_ciudad = int.Parse(fila["id_ciudad"].ToString()),
                    ciudad = fila["ciudad"].ToString()
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
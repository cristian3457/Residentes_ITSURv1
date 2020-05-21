using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using MySql.Data.MySqlClient;
namespace BackEnd.Datos
{
    public class Conexion
    {
        static MySqlConnection conexion;

        public static bool conectar()
        {
            try
            {

                if (conexion == null || conexion.State != ConnectionState.Open)
                {
                    conexion = new MySqlConnection();
                    conexion.ConnectionString = "Server=localhost;" +
                    "Database=residentes_itsur;" +
                    "uid=root;" +
                    "pwd=root;";// sslmode=none";

                    conexion.Open();
                }
                return true;
            }
            catch (MySqlException ex)
            {
                throw new Exception("No se puede establecer la conexión con el servidor");
            }
        }

        public static DataTable ejecutarConsulta(MySqlCommand consulta)
        {
            if (conectar())
            {
                consulta.Connection = conexion;
                MySqlDataAdapter adaptador = new MySqlDataAdapter(consulta);
                DataTable tabla = new DataTable();
                adaptador.Fill(tabla);
                return tabla;
            }
            return null;
        }

        public static int ejecutarSentencia(MySqlCommand sentencia, bool esInsertar)
        {
            int valor = 0;
            if (conectar())
            {
                sentencia.Connection = conexion;
                if (esInsertar)
                    valor = int.Parse(sentencia.ExecuteScalar().ToString());
                else
                    valor = sentencia.ExecuteNonQuery();
            }
            return valor;
        }
        public static int ejecutarSelect(MySqlCommand sentencia)
        {
            int valor = 0;
            if (conectar())
            {
                sentencia.Connection = conexion;
                valor = int.Parse(sentencia.ExecuteScalar().ToString());
            }
            return valor;
        }
        public static void desconectar()
        {
            if (conexion != null && conexion.State == ConnectionState.Open)
                conexion.Close();
        }
    }
}
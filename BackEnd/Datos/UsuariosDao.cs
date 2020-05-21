using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BackEnd.Modelo;
using MySql.Data.MySqlClient;
using System.Data;
using System.Security.Cryptography;
namespace BackEnd.Datos
{
    public class UsuariosDao
    {
        public Usuarios iniciarSesion(String email, String password)
        {
            try
            {
                UTF8Encoding enc = new UTF8Encoding();
                byte[] pass = enc.GetBytes(password);
                byte[] result;
                SHA1CryptoServiceProvider sha = new SHA1CryptoServiceProvider();
                result = sha.ComputeHash(pass);
                StringBuilder sb = new StringBuilder();
                for (int i = 0; i < result.Length; i++)
                {

                    // Convertimos los valores en hexadecimal
                    // cuando tiene una cifra hay que rellenarlo con cero
                    // para que siempre ocupen dos dígitos.
                    if (result[i] < 16)
                    {
                        sb.Append("0");
                    }
                    sb.Append(result[i].ToString("x"));
                }

                //Devolvemos la cadena con el hash en mayúsculas para que quede más chuli :)
                MySqlCommand sentencia = new MySqlCommand();
                sentencia.CommandText = "SELECT * FROM usuarios where email = @email AND _password = @password";
                sentencia.Parameters.AddWithValue("@email", email.ToLower());
                sentencia.Parameters.AddWithValue("@password", sb.ToString().ToLower());
                DataTable tabla = Conexion.ejecutarConsulta(sentencia);
                Usuarios us = null;
                if (tabla != null && tabla.Rows.Count > 0)
                {
                    DataRow fila = tabla.Rows[0];
                    us = new Usuarios(
                   Convert.ToInt32(fila["id_usuario"].ToString()),
                   fila["email"].ToString(),
                   fila["_password"].ToString(),
                   fila["tipo_usuario"].ToString()
                    );
                }
                return us;
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
        public bool updatePassword(Usuarios obj)
        {
            try
            {
                MySqlCommand sentencia = new MySqlCommand();
                sentencia.CommandText = "UPDATE usuarios SET _password=SHA(@password) WHERE email=@email";
                sentencia.Parameters.AddWithValue("@email", obj.email);
                sentencia.Parameters.AddWithValue("@password", obj.password);
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
        public bool updateUsuario(Usuarios obj)
        {
            try
            {
                MySqlCommand sentencia = new MySqlCommand();
                sentencia.CommandText = "UPDATE usuarios SET email=@email, _password=SHA(@password),tipo_usuario=@tipo_usuario WHERE id_usuario=@id_usuario";
                sentencia.Parameters.AddWithValue("@id_usuario", obj.id_usuario);
                sentencia.Parameters.AddWithValue("@email", obj.email);
                sentencia.Parameters.AddWithValue("@password", obj.password);
                sentencia.Parameters.AddWithValue("@tipo_usuario", obj.tipo_usuario);
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
        public int insert(Usuarios obj)
        {
            try
            {
                MySqlCommand sentencia = new MySqlCommand();
                sentencia.CommandText = "INSERT INTO usuarios(email, _password, tipo_usuario) VALUES(@email, sha(@password), @tipo_usuario); SELECT MAX(id_usuario) AS id FROM usuarios;";
                sentencia.Parameters.AddWithValue("@email", obj.email);
                sentencia.Parameters.AddWithValue("@password", obj.password);
                sentencia.Parameters.AddWithValue("@tipo_usuario", obj.tipo_usuario);
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
        public List<Usuarios> getAll()
        {
            try
            {
                List<Usuarios> lista = new List<Usuarios>();

                MySqlCommand sentencia = new MySqlCommand();
                sentencia.CommandText = "SELECT * FROM usuarios WHERE tipo_usuario != 'Administrador';";

                DataTable tabla = Conexion.ejecutarConsulta(sentencia);

                foreach (DataRow fila in tabla.Rows)
                {
                    lista.Add(new Usuarios(
                       Convert.ToInt32(fila["id_usuario"].ToString()),
                       fila["email"].ToString(),
                       fila["_password"].ToString(),
                       fila["tipo_usuario"].ToString()
                        ));
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
        public List<Usuarios> getOne(int id_usuario)
        {
            try
            {
                List<Usuarios> lista = new List<Usuarios>();

                MySqlCommand sentencia = new MySqlCommand();
                sentencia.CommandText = "SELECT * FROM usuarios WHERE id_usuario = @id_usuario;";
                sentencia.Parameters.AddWithValue("@id_usuario", id_usuario);
                DataTable tabla = Conexion.ejecutarConsulta(sentencia);

                foreach (DataRow fila in tabla.Rows)
                {
                    lista.Add(new Usuarios(
                       Convert.ToInt32(fila["id_usuario"].ToString()),
                       fila["email"].ToString(),
                       fila["_password"].ToString(),
                       fila["tipo_usuario"].ToString()
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
        public bool delete(int id)
        {
            try
            {
                MySqlCommand sentencia = new MySqlCommand();
                sentencia.CommandText = "DELETE FROM usuarios WHERE id_usuario = @id_usuario";
                sentencia.Parameters.AddWithValue("@id_usuario", id);
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

